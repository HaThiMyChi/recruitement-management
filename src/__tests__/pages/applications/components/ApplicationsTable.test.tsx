import React from "react";
import {render, screen, fireEvent} from '@testing-library/react';
import ApplicationsTable from "../../../../pages/ApplicationsPage/components/ApplicationsTable";
import { ApplicationStatus } from "../../../../enums/ApplicationStatus";

describe('ApplicationsTable', () => {
    const mockApplications = [
        { id: 1, jobId: 101, jobTitle: 'Frontend Developer', userId: 201, candidateName: 'John Doe', status: ApplicationStatus.PENDING, createdAt: '2023-01-01', updatedAt: '2023-01-01' },
        { id: 2, jobId: 102, jobTitle: 'Backend Developer', userId: 202, candidateName: 'Jane Smith', status: ApplicationStatus.REVIEWING, createdAt: '2023-01-02', updatedAt: '2023-01-02' },
    ];

    const mockProps = {
        applications: mockApplications,
        selectedApplicationIds: [],
        onSelectApplication: jest.fn(),
        onCheckboxChange: jest.fn(),
        onDeleteApplication: jest.fn(),
        onChangeStatus: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders table with correct headers', () => {
        render(<ApplicationsTable {...mockProps} />);
        expect(screen.getByText("ID")).toBeInTheDocument();
        expect(screen.getByText('Job Title')).toBeInTheDocument();
        expect(screen.getByText('Candidate')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
        expect(screen.getByText('Created At')).toBeInTheDocument();
         expect(screen.getByText('Updated At')).toBeInTheDocument();
        expect(screen.getByText('Actions')).toBeInTheDocument();

    });
    
    it('displays application data in table rows', () => {
        render(<ApplicationsTable {...mockProps} />);

        expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Backend Developer')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();

        // Check for status badges
        expect(screen.getByText('PENDING')).toBeInTheDocument();
        expect(screen.getByText('REVIEWING')).toBeInTheDocument();
    });

    it('calls onDeleteApplication when delete button is clicked', () => {
        render(<ApplicationsTable {...mockProps} />);

        const deleteButtons = screen.getAllByTestId('delete-application-button');
        fireEvent.click(deleteButtons[0]);
    });

    it('calls onChangeStatus when changes status button is clicked', () => {
        render(<ApplicationsTable {...mockProps} />);

        const statusButtons = screen.getAllByTestId('change-status-button');
        fireEvent.click(statusButtons[0]);
    });

    it('renders empty state when no applications are available', () => {
        render(
            <ApplicationsTable {...mockProps} applications={[]}/>
        );

        expect(screen.getByText('No applications found matching your criteria')).toBeInTheDocument();
    })
    
});