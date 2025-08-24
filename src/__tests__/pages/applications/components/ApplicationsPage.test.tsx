/* eslint-disable testing-library/no-multiple-assertions-wait-for */

import React from "react";
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ApplicationsPage from "../../../../pages/ApplicationsPage/ApplicationsPage";
import * as applicationService from '../../../../services/applicationService';
import { ApplicationStatus } from "../../../../enums/ApplicationStatus";

// Mock the application service
jest.mock('../../../../services/applicationService');
const mockedFetchApplications = applicationService.fetchApplications as jest.Mock;
const mockedDeleteApplication = applicationService.deleteApplication as jest.Mock;
const mockedDeleteMultipleApplications = applicationService.deleteMultipleApplications as jest.Mock;
const mockedUpdatedApplicationStatus = applicationService.updateApplicationStatus as jest.Mock;

// Mock child component to simplify tests
jest.mock('../../../../components/shared/LoadingSpinner', () => ({
    __esModule: true,
    default: () => <div data-testid="loading-spinner">Loading...</div>
}));

jest.mock('../../../../components/shared/ErrorMessage', () => ({
    __esModule: true,
    default: ({message} : {message: string}) => <div data-testid="error-message">{message}</div>
}));

jest.mock('../../../../components/shared/SuccessMessage', () => ({
    __esModule: true,
    default: ({message} : {message: string}) => <div data-testid="success-message">{message}</div>
}));

jest.mock('../../../../components/shared/ConfirmationModal', () => ({
    __esModule: true,
    default: ({isOpen, title, message, onConfirm, onCancel}: any) =>
        isOpen ? (
            <div data-testid="confirmation-modal">
                <div>{title}</div>
                <div>{message}</div>
                <button onClick={onConfirm} data-testid="confirm-button">Confirm</button>
                <button onClick={onCancel} data-testid="cancel-button">Cancel</button>
            </div>
        ) : null
}));

jest.mock('../../../../pages/ApplicationsPage/components/StatusChangeModal', () => ({
    __esModule: true,
    default: ({isOpen, applicationId, onSubmit, onCancel}: any) =>
        isOpen ? (
            <div data-testid="status-change-modal">
                <div>Change status for application #{applicationId}</div>
                <button onClick={() => onSubmit({status: ApplicationStatus.SHORTLISTED, recruiterNotes: 'Test note'})} data-testid="submit-status-button">
                    Submit
                </button>
                <button onClick={onCancel} data-testid="cancel-status-button">Cancel</button>
            </div>
        ): null
}));

jest.mock('../../../../pages/ApplicationsPage/components/ApplicationDetailModal', () => ({
    __esModule: true,
    default: ({show, applicationId, onHine}: any) =>
        show ? (
            <div data-testid="application-detail-modal">
                <div>Application #{applicationId} Details</div>
                <button onClick={onHine} data-testid="close-detail-modal">Close</button>
            </div>
        ): null
}));

// Sample mock data
const mockApplications = {
  data: [
    { id: 1, jobId: 101, jobTitle: 'Frontend Developer', userId: 201, candidateName: 'John Doe', status: ApplicationStatus.PENDING, createdAt: '2023-01-01', updatedAt: '2023-01-01' },
    { id: 2, jobId: 102, jobTitle: 'Backend Developer', userId: 202, candidateName: 'Jane Smith', status: ApplicationStatus.REVIEWING, createdAt: '2023-01-02', updatedAt: '2023-01-02' },
    { id: 3, jobId: 103, jobTitle: 'UX Designer', userId: 203, candidateName: 'Bob Johnson', status: ApplicationStatus.SHORTLISTED, createdAt: '2023-01-03', updatedAt: '2023-01-03' },
  ],
  meta: {
    totalItems: 3,
    itemsPerPage: 10,
    totalPages: 1,
    currentPage: 1
  }
};

describe('ApplicationsPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Default implementation for fetchApplications
        mockedFetchApplications.mockResolvedValue(mockApplications);
    });

    it('renders loading spinner initially', async () => {
        render(
            <BrowserRouter>
                <ApplicationsPage />
            </BrowserRouter>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        // Wait for the applications to load
        await waitFor(() => {
            expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
        });
    });
});

it('displays error message when fetch fails', async () => {
    const errorMessage  = 'Failed to fetch applications';
    mockedFetchApplications.mockRejectedValueOnce(new Error(errorMessage ));

    render(
        <BrowserRouter>
            <ApplicationsPage />
        </BrowserRouter>
    );

    // chỉ check có element trong waitFor
    const errorNode = await screen.findByTestId('error-message');

    // các assert khác viết ngoài
    expect(errorNode).toBeInTheDocument();
    expect(errorNode).toHaveTextContent(errorMessage);
});

/* eslint-disable testing-library/no-multiple-assertions-wait-for */
it('displays applications data when fetch success', async () => {
    render(
        <BrowserRouter>
            <ApplicationsPage />
        </BrowserRouter>
    );

    await waitFor(() => {
        // Check for application data in the table
        // expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
        // expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        // expect(screen.getByText('UX Designer')).toBeInTheDocument();
        const haveAll = ['Frontend Developer', 'Jane Smith', 'UX Designer']
        .every(text => Boolean(screen.queryByText(text)));
        expect(haveAll).toBe(true); // chỉ 1 assertion
    })
});
/* eslint-enable testing-library/no-multiple-assertions-wait-for */

it('open application detail modal when clicking on an application', async () => {
    render(
        <BrowserRouter>
            <ApplicationsPage />
        </BrowserRouter>
    );

    // Wait for applications to load
    await waitFor(() => {
        expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    });

    // Find and click the first application row
    const applicationRows = screen.getAllByTestId('application-row');
    fireEvent.click(applicationRows[0]);

    // Check if detail modal is displayed
    expect(screen.getByTestId('application-detail-modal')).toBeInTheDocument();
    expect(screen.getByText('Application #1 Details')).toBeInTheDocument();

    // Close the modal
    fireEvent.click(screen.getByTestId('close-detail-modal'));

    // Check if modal is closed
    await waitFor(() => {
        expect(screen.queryByTestId('application-detail-modal')).not.toBeInTheDocument();
    });
});

it('handles single application deletion', async () => {
    mockedDeleteApplication.mockResolvedValueOnce(undefined);

    render(
        <BrowserRouter>
            <ApplicationsPage />
        </BrowserRouter>
    );

    // Wait for applications to load
    await waitFor(() => {
        expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    });

    // Find and click delete button for first application
    const deleteButtons = screen.getAllByTestId('delete-application-button')
    fireEvent.click(deleteButtons[0]);

    // Check if confirmation modal is displayed
    expect(screen.getByTestId('confirmation-modal')).toBeInTheDocument();
    expect(screen.getByText('Delete Application')).toBeInTheDocument();

    // Confirm deletion
    fireEvent.click(screen.getByTestId('confirm-button'));

    // Check if loading spinner is displayed
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    // wait for success message
    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument();
      expect(screen.getByTestId('success-message').textContent).toContain('Application #1 was successfully deleted');
    });

    // Verify service was called
    expect(mockedDeleteApplication).toHaveBeenCalledWith(1);
    expect(mockedDeleteApplication).toHaveBeenCalledTimes(2); // Initial + after deletion

});



