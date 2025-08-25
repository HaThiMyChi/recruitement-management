import { Button, Form, Table } from "react-bootstrap";
import { ApplicationSummary } from "../../../types/applicationTypes"
import React from "react";
import { formatDate } from "../../../utils/dateUtils";
import ApplicationStatusBadge from "./ApplicationStatusBadge";

interface ApplicationsTableProps {
    applications: ApplicationSummary[];
    selectedApplicationIds: number[];
    onSelectApplication: (applicationId: number) => void;
    onCheckboxChange: (applicationId: number, checked: boolean) => void;
    onDeleteApplication: (applicationId: number) => void;
    onChangeStatus: (applicationId: number) => void;
}

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
    applications,
    selectedApplicationIds,
    onSelectApplication,
    onCheckboxChange,
    onDeleteApplication,
    onChangeStatus
}) => {

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, applicationId: number) => {
        onCheckboxChange(applicationId, e.target.checked);
    };

    const allSelected = applications.length > 0 && applications.every(app => selectedApplicationIds.includes(app.id));
    
    const handleSelectAll  = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            // Select all applications by calling onCheckboxChange for each unselected application
            const unselectedAppIds = applications
                .filter(app => !selectedApplicationIds.includes(app.id))
                .map(app => app.id);

            // Select all at once using the special case
            if (unselectedAppIds.length > 0) {
                onCheckboxChange(-1, true);
            }
        } else {
            // Deselect all
            onCheckboxChange(-1, false);
        }

    };
    
    return (
        <div className="table-responsive mb-4">
            <Table hover bordered>
                <thead className="bg-bg-light">
                    <tr>
                        <th style={{width: '40px'}}>
                            <Form.Check
                                data-testid="application-checkbox"
                                type="checkbox"
                                onChange={handleSelectAll}
                                checked={allSelected}
                                disabled={applications.length === 0}
                            />
                        </th>
                        <th>ID</th>
                        <th>Job Title</th>
                        <th>Candidate</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="text-center py-4">
                                No applications found matching your criteria
                            </td>
                        </tr>
                    ) : (
                        applications.map(application => (
                            <tr key={application.id} data-testid="application-row"> 
                                <td>
                                    <Form.Check
                                        data-testid=""
                                        type="checkbox"
                                        checked={selectedApplicationIds.includes(application.id)}
                                        onChange={(e) => handleCheckboxChange(e, application.id)}
                                    />
                                </td>
                                <td>{application.id}</td>
                                <td>{application.jobTitle}</td>
                                <td>{application.candidateName}</td>
                                <td>
                                    <ApplicationStatusBadge status={application.status} />
                                </td>
                                <td>{formatDate(application.createdAt)}</td>
                                <td>{formatDate(application.updatedAt)}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <Button variant="outline-primary" size="sm" onClick={() => onSelectApplication(application.id)}>
                                            View
                                        </Button>

                                        <Button
                                            data-testid="change-status-button"
                                            variant="outline-secondary" 
                                            size="sm"
                                            onClick={() => onChangeStatus(application.id)}
                                        >
                                            Change Status
                                        </Button>

                                        <Button
                                            data-testid="delete-application-button"
                                            variant="outline-danger" 
                                            size="sm"
                                            onClick={() => onDeleteApplication(application.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    )

}

export default ApplicationsTable;