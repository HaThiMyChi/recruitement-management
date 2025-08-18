import React, { FormEvent } from "react";
import { FetchJobLogsParams } from "../../../app/types/jobLogTypes"
import { JobLogAction } from "../../../enums/JobLogAction";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

interface JobLogsHeaderProps {
    filters: FetchJobLogsParams;
    onFilterChange: (e: React.ChangeEvent<HTMLElement>) => void;
    onFilterSubmit: (e: FormEvent) => void
}

const JobLogsHeader: React.FC<JobLogsHeaderProps> = ({
    filters,
    onFilterChange,
    onFilterSubmit
}) => {
    return (
        <Container>
            <h1 className="mb-4">Job Logs</h1>

            <Form onSubmit={onFilterSubmit} className="mb-4">
                <Row className="g-3 align-items-end">
                    <Col md={3} sm={6}>
                        <Form.Group controlId="jobId">
                            <Form.Label>Job ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="jobId"
                                placeholder="Filter by Job ID"
                                value={filters.jobId || ''}
                                onChange={onFilterChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={3} sm={6}>
                        <Form.Group controlId="userId">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="userId"
                                placeholder="Filter by User ID"
                                value={filters.userId || ''}
                                onChange={onFilterChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={3} sm={6}>
                        <Form.Group controlId="action">
                            <Form.Label>Action</Form.Label>
                            <Form.Select
                                name="action"
                                value={filters.action || ''}
                                onChange={onFilterChange}
                            >
                                <option value="">All Actions</option>
                                {Object.values(JobLogAction).map(actionValue => (
                                <option key={actionValue} value={actionValue}>
                                    {actionValue.replace(/_/g, ' ').toUpperCase()}
                                </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md={3} sm={6}>
                        <Button 
                            type="submit" 
                            variant="primary"
                            className="w-100"
                        >
                            Apply Filters
                        </Button>
                    </Col>
          
                </Row>
            </Form>
        </Container>
    )
}

export default JobLogsHeader;