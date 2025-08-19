import { Button, Card, Form } from "react-bootstrap"

const JobFilters: React.FC = () => {
    return (
        <Card className="mb-4">
            <Card.Header>
                <strong>Filter Jobs</strong>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Job Type</Form.Label>
                        <Form.Select
                            name="jobType"
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
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            name="status"
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
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Maximum Salary</Form.Label>
                        <Form.Control 
                            type="number"
                            name="maxSalary"
                            placeholder="Max salary"
                        />
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit">
                            Apply Filters
                        </Button>
                        <Button variant="outline-secondary" type="button">
                            Clear Filters
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default JobFilters;