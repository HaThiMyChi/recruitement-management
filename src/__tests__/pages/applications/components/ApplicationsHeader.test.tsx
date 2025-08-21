import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ApplicationsHeader from '../../../../pages/ApplicationsPage/components/ApplicationsHeader';

describe('ApplicationsHeader', () => {
    const mockFilters = {
        page: 1,
        limit: 10,
        jobId: '',
        userId: '',
        status: '',
        fromDate: '',
        toDate: ''
    };

    const mockOnFilterChange = jest.fn();
    const mockOnFilterSubmit = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('render the header with title', () => {
        render(
            <ApplicationsHeader
                filters={mockFilters}
                onFilterChange={mockOnFilterChange}
                onFilterSubmit={mockOnFilterSubmit}
            />
        );
        expect(screen.getByText('Application Management')).toBeInTheDocument();
    });

    it('contains filter form with correct fields', () => {
        render(
            <ApplicationsHeader
                filters={mockFilters}
                onFilterChange={mockOnFilterChange}
                onFilterSubmit={mockOnFilterSubmit}
            />
        );

        // Check for form elements
        expect(screen.getByTestId('filter-form')).toBeInTheDocument();
        expect(screen.getByTestId('job-id-filter')).toBeInTheDocument();
        expect(screen.getByTestId('user-id-filter')).toBeInTheDocument();
        expect(screen.getByTestId('status-filter')).toBeInTheDocument();
        expect(screen.getByTestId('from-date-filter')).toBeInTheDocument();
        expect(screen.getByTestId('to-date-filter')).toBeInTheDocument();
    });

    it('calls onFilterSubmit when form is submitted', () => {
        render(
            <ApplicationsHeader
                filters={mockFilters}
                onFilterChange={mockOnFilterChange}
                onFilterSubmit={mockOnFilterSubmit}
            />
        );

        // Submit the form
        const filterForm = screen.getByTestId('filter-form');
        fireEvent.submit(filterForm);

        expect(mockOnFilterSubmit).toHaveBeenCalled();
    });
});