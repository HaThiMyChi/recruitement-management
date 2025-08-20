import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../app/store";
import { useEffect } from "react";
import { GetJobById } from "../../app/slices/jobs.slice";
import { Alert, Badge, Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBriefcase, faCalendarAlt, faMapMarkedAlt, faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import { JobStatus } from "../../enums/JobStatus";

const JobDetailPage: React.FC = ()  => {
    const {id} = useParams<{id: undefined | string}>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // use the jobByIdSlice selectors
    const {data, loading, error} = useSelector((state: RootState) => state.jobById);
    console.log('data======', data)

    useEffect(() => {
        if (id) {
            dispatch(GetJobById(Number(id)));
        }

        // Clean up function (optional)
        return () => {
            // You can dispatch a reset action here if needed
        }

    }, [dispatch, id]);

    const handleBack = () => {
        navigate('/jobs');
    }

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const getStatusBadge = (status: string | JobStatus) => {
        switch (status) {
            case 'ACTIVE':
                return <Badge bg="success">Active</Badge>;
            case 'EXPIRED':
                return <Badge bg="warning">Expired</Badge>;
            case 'CLOSED':
                return <Badge bg="danger">Closed</Badge>;
            case 'PENDING':
                return <Badge bg="info">Pending</Badge>;
            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };

    const canUserViewJob = () => {
        if (!data) return false;

        return ['ACTIVE', 'EXPIRED', 'CLOSED'].includes(data?.status);
    }

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading job details...</span>
                </Spinner>
            </Container>
        )
    }

    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger">
                    {error || "An error occurred while loading the job details."}
                </Alert>
                <Button variant="secondary" onClick={handleBack}>
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                    Back to Jobs
                </Button>
            </Container>
        );
    }

    if (!data) {
        return (
            <Container className="py-5">
                <Alert variant="warning">Job not found</Alert>
                <Button variant="secondary" onClick={handleBack}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Back to Jobs
                </Button>
            </Container>
        )
    }

    if (!canUserViewJob) {
        return (
            <Container className="py-5">
                <Alert variant="warning">
                    You don't have permission to view this data?.
                </Alert>
                <Button variant="secondary" onClick={handleBack}>
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                    Back to Jobs
                </Button>
            </Container>
        )
    }

    return (
        <Container className="py-4">
            <Button  variant="outline-secondary" className="mb-4" onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Back to Jobs
            </Button>

            <Card className="mb-4 shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h1 className="h2 mb-0">{data?.title}</h1>
                    {getStatusBadge(data?.status)}
                </Card.Header>

                <Card.Body>
                    <Row className="mb-4">
                        <Col md={3} sm={6} className="mb-3 mb-md-0">
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faMapMarkedAlt} className="me-2 text-secondary" />
                                <span>{data?.location || 'Remote'}</span>
                            </div>
                        </Col>

                        <Col md={3} sm={6} className="mb-3 mb-md-0">
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faBriefcase} className="me-2 text-secondary" />
                                <span>{data?.jobType}</span>
                            </div>
                        </Col>
                        <Col md={3} sm={6} className="mb-3 mb-md-0">
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faMoneyBill1Wave} className="me-2 text-secondary" />
                                <span>
                                    {data?.minSalary && data?.maxSalary ? `$${data?.minSalary.toLocaleString()} - $${data?.maxSalary.toLocaleString()}` : 'Salary not specified'}
                                </span>
                            </div>
                        </Col>
                        <Col md={3} sm={6}>
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faCalendarAlt} className="me-2 text-secondary" />
                                <span>Posted: {formatDate(data?.publishedAt ||  data?.createdAt)}</span>
                            </div>
                        </Col>

                        <hr className="my-4" />

                        <div className="mb-4">
                            <h2 className="h5 mb-3">Description</h2>
                            <p className="white-space-pre-line">{data?.description}</p>
                        </div>

                        {data?.requirements && (
                            <div className="mb-4">
                                <h2 className="h5 mb-3">Requirements</h2>
                                <p className="white-space-pre-line">{data?.requirements}</p>
                            </div>
                        )}

                        {data?.benefits && (
                            <div className="mb-4">
                                <h2 className="h5 mb-3">Benefits</h2>
                                <p className="white-space-pre-line">{data?.benefits}</p>
                            </div>
                        )}
                    </Row>
                </Card.Body>

                <Card.Footer className="text-muted">
                    <small>
                        {data?.expiredAt && (
                            <div>Expires: {formatDate(data?.expiredAt)}</div>
                        )}
                        <div>Last updated: {formatDate(data?.updatedAt)}</div>
                    </small>
                </Card.Footer>
            </Card>
        </Container>
    )
}

export default JobDetailPage;