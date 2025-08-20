import { Button, Card, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import React, { useState } from "react";
import { RequestFilter } from "../../../app/types/job.type";
import { ClearFilters, GetListJobs } from "../../../app/slices/jobs.slice";
import { getListJobs } from "../../../app/sagas/jobs.saga";

const JobFilters: React.FC = () => {
    const dispatch = useDispatch();
    const currentFilters = useSelector((state: RootState) => state.jobs.filters);

    const [filters, setFilters] = useState<RequestFilter>({
        jobType: currentFilters.jobType || '',
        location: currentFilters.location || '',
        status: currentFilters.status || '',
        minSalary: currentFilters.minSalary || undefined,
        maxSalary: currentFilters.maxSalary || undefined,
    });

    const handleClear = () => {
        setFilters({
            jobType: '',
            location: '',
            status: '',
            minSalary: undefined,
            maxSalary: undefined,
        });
        dispatch(ClearFilters());
        dispatch(GetListJobs({page: 1}));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value === '' ? undefined : name.includes('Salary') ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(GetListJobs({...filters, page: 1}));
    }
    
    return (
        <Card className="mb-4">
            <Card.Header>
                <strong>Filter Jobs</strong>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Job Type</Form.Label>
                        <Form.Select
                            name="jobType"
                            value={filters.jobType || ''}
                            onChange={handleChange}
                        >
                            <option value="">All Types</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Intership">Internship</option>

                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control 
                            type="text"
                            name="location"
                            placeholder="Enter location"
                            value={filters.location || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            name="status"
                            value={filters.status || ''}
                            onChange={handleChange}
                        >
                            <option value="">All Statuses</option>
                            <option value="ACTIVE">Active</option>
                            <option value="PENDING">Pending</option>
                            <option value="EXPIRED">Expired</option>
                            <option value="CLOSED">Closed</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Minimum Salary</Form.Label>
                        <Form.Control 
                            type="number"
                            name="minSalary"
                            placeholder="Min salary"
                            value={filters.minSalary || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Maximum Salary</Form.Label>
                        <Form.Control 
                            type="number"
                            name="maxSalary"
                            placeholder="Max salary"
                            value={filters.maxSalary || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit">
                            Apply Filters
                        </Button>
                        <Button variant="outline-secondary" type="button" onClick={handleClear}>
                            Clear Filters
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default JobFilters;