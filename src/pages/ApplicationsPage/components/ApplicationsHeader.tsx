import React, { FormEvent } from "react";
import { FetchApplicationsParams } from "../../../types/applicationTypes";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { ApplicationStatus } from "../../../enums/ApplicationStatus";

interface ApplicationsHeaderProps {
    filters: FetchApplicationsParams;
    onFilterChange: (e: React.ChangeEvent<HTMLElement>) => void;
    onFilterSubmit: (e: FormEvent) => void;
}

const ApplicationsHeader: React.FC<ApplicationsHeaderProps> = ({
    filters,
    onFilterChange,
    onFilterSubmit
}) => {
    return (
        <>
            <Row className="mb-4">
                <Col>
                    <h1>Application Management</h1>
                </Col>
            </Row>

            <Card className="mb-4">
                <Card.Header>Filter Applications</Card.Header>
                <Card.Body>
                    <Form onSubmit={onFilterSubmit} data-testid="filter-form">
                        <Row>
                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Job ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="jobId"
                                        placeholder="Enter Job ID"
                                        value={filters.jobId || ''}
                                        onChange={onFilterChange}
                                        data-testid="job-id-filter"
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label>User ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="userId"
                                        placeholder="Enter user ID"
                                        value={filters.userId || ''}
                                        onChange={onFilterChange}
                                        data-testid="user-id-filter"
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select
                                        name="status"
                                        value={filters.status || ''}
                                        onChange={onFilterChange}
                                        data-testid="status-filter"
                                    >
                                        <option value="">All Statuses</option>
                                        {Object.values(ApplicationStatus).map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={3}>
                                <Form.Group className="mb-3">
                                <Form.Label>From Date</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    name="fromDate" 
                                    value={filters.fromDate || ''} 
                                    onChange={onFilterChange}
                                    data-testid="from-date-filter"
                                />
                                </Form.Group>
                            </Col>

                            <Col md={3}>
                                <Form.Group className="mb-3">
                                <Form.Label>To Date</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    name="toDate" 
                                    value={filters.toDate || ''} 
                                    onChange={onFilterChange}
                                    data-testid="to-date-filter"
                                />
                                </Form.Group>
                            </Col>
                            <Col md={3} className="d-flex align-items-end">
                                <Button type="submit" variant="primary" className="mb-3 w-100">Apply Filters</Button> 
                            </Col>         
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default ApplicationsHeader;