import React from "react";
import {render, screen, fireEvent} from '@testing-library/react';
import BulkActions from "../../../../pages/ApplicationsPage/components/BulkActions";

describe('BulkActions', () =>  {
    const mockProps = {
        selectedCount: 0,
        onDeleteSelected: jest.fn(),
        onClearSelection: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it ('does not render when no items are selected', () => {
        render(<BulkActions {...mockProps} />);
        expect(screen.queryByTestId('bulk-actions')).not.toBeInTheDocument();
    });

    it('renders when items are selected', () => {
        render(<BulkActions {...mockProps} selectedCount={3} />);
        expect(screen.getByTestId('bulk-actions')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('calls onDeleteSelected when delete button is clicked', () => {
        render(<BulkActions {...mockProps} selectedCount={3} />);
        fireEvent.click(screen.getByTestId('bulk-delete-button'));
        expect(mockProps.onDeleteSelected).toHaveBeenCalled();
    });

    it('calls onClearSelection when clear button is clicked', () => {
        render(<BulkActions {...mockProps} selectedCount={3} />);

        fireEvent.click(screen.getByTestId('clear-selection-button'));
        expect(mockProps.onClearSelection).toHaveBeenCalled();
    })
})