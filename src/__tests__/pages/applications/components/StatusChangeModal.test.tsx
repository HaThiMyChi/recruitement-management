import React from "react";
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import StatusChangeModal from "../../../../pages/ApplicationsPage/components/StatusChangeModal";
import { ApplicationStatus } from "../../../../enums/ApplicationStatus";

describe('StatusChangeModal', () => {
    const mockProps = {
        isOpen: true,
        applicationId: 1,
        onSubmit: jest.fn(),
        onCancel: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('does not render when isOpen is false', () => {
        render(<StatusChangeModal {...mockProps} isOpen={false} />);
        expect(screen.queryByText('Change Application Status')).not.toBeInTheDocument();
    });

    it('renders when isOpen is true', () => {
        render(<StatusChangeModal {...mockProps} />);
        expect(screen.getByText('Change Application Status')).toBeInTheDocument();
        expect(screen.getByText('Application ID')).toBeInTheDocument();
    });

    it('calls onCancel when cancel button is clicked', () => {
        render(<StatusChangeModal {...mockProps} />);
        fireEvent.click(screen.getByText('Cancel'));
        expect(mockProps.onCancel).toHaveBeenCalled();
    })


})
