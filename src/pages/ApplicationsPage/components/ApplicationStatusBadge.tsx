import React from "react";
import { ApplicationStatus } from "../../../enums/ApplicationStatus";
import { Badge } from "react-bootstrap";

interface ApplicationStatusBadgeProps {
    status: ApplicationStatus;
}

const ApplicationStatusBadge: React.FC<ApplicationStatusBadgeProps> = ({ status }) => {
    let variant: string;

    switch (status) {
        case ApplicationStatus.PENDING:
            variant = "warning";
            break;
        case ApplicationStatus.REVIEWING:
            variant = 'info';
            break;
        case ApplicationStatus.SHORTLISTED:
            variant = 'primary';
            break;
        case ApplicationStatus.INTERVIEWING:
            variant = "secondary";
            break;
        case ApplicationStatus.HIRED:
            variant = 'success';
            break;
        case ApplicationStatus.REJECTED:
            variant = 'danger';
            break;
        case ApplicationStatus.WITHDRAWN:
            variant = 'dark';
            break;
        default:
            variant = 'light';
    }
    return (
        <Badge bg={variant}>
            {status}
        </Badge>
    );
};

export default ApplicationStatusBadge;