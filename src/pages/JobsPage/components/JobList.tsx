import { Badge, Card, Spinner } from "react-bootstrap";
import { Job } from "../../../models/Job";
import { Link } from "react-router-dom";
import { formatSalary } from "../../../utils/formatUtils";
import { formatDate } from "../../../utils/dateUtils";

interface JobListProps {
    jobs: Job[];
    isLoading: boolean;
}

const JobList: React.FC<JobListProps> = ({jobs, isLoading}) => {
    if (isLoading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (jobs.length === 0) {
        return (
            <div className="text-center my-5">
                <p className="text-muted">No jobs found matching your criteria.</p>
            </div>
        )
    }

    const getJobTypeBadgeVariant = (jobType: string) => {
        switch (jobType) {
            case 'Full-time': return 'primary';
            case 'Part-time': return 'info';
            case 'Contract': return 'warning';
            case 'Internship': return 'dark';
            default: return 'secondary';

        };
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'ACTIVE': return 'success';
            case 'DRAFT': return 'secondary';
            case 'EXPIRED': return 'danger';
            default: return 'primary';
        }
    }

    return (
        <div className="job-list">
            {jobs.map(job => (
                <Card key={job.id} className="mb-3 job-card">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <Link to={`/jobs/${job.id}`} className="text-decoration-none">
                                    <Card.Title>{job.title}</Card.Title>
                                </Link>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {job.location}
                                </Card.Subtitle>
                                <div className="mb-2">
                                    <Badge bg={getJobTypeBadgeVariant(job.jobType)} className="me-2">
                                        {job.jobType.replace('-', ' ')}
                                    </Badge>
                                    <Badge bg={getStatusBadgeVariant(job.status)}>
                                        {job.status}
                                    </Badge>
                                </div>
                                <Card.Text>
                                    {formatSalary(job.minSalary)} - {formatSalary(job.maxSalary)}
                                </Card.Text>
                            </div>
                            <div className="text-end">
                                <small className="text-muted">
                                    Posted: {formatDate(job.createdAt)}
                                </small>
                                <br />
                                <small className="text-muted">
                                    Expires: {formatDate(job.expiredAt)}
                                </small>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            ))}

        </div>
    )
    
}

export default JobList;