import { Alert, Badge, Col, Modal, Row, Spinner, Table } from "react-bootstrap";
import { ApplicationStatus } from "../../../enums/ApplicationStatus";
import { useEffect, useState } from "react";
import { getCurrentUserId, getCurrentUserRole } from "../../../services/authService";
import { fetchApplicationById } from "../../../services/applicationService";
import { ApplicationDetail } from "../../../types/applicationTypes";
import { formatDate } from "../../../utils/dateUtils";
import { UserRole } from "../../../enums/UserRole";

interface ApplicationDetailModalProps { 
    show: boolean;
    applicationId?: number | null;
    onHide: () => void;
}

// Helper function to get status badge color;
const getStatusBadgeVariant = (status: ApplicationStatus | undefined): string => {
    const statusMap: Record<ApplicationStatus, string> = {
        'PENDING': 'warning',
        'REVIEWING': 'info',
        'SHORTLISTED': 'primary',
        'INTERVIEWING': 'secondary',
        'HIRED': 'success',
        'REJECTED': 'danger',
        'WITHDRAWN': 'dark'
    };
    return status ? statusMap[status] : 'light';
};


const ApplicationDetailModal: React.FC<ApplicationDetailModalProps> = ({ show, applicationId, onHide }) => {
    const [application, setApplication] = useState<ApplicationDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const userRole = getCurrentUserRole();


    useEffect(() => {
        if (show && applicationId) {
            setLoading(true);
            setError(null);

            fetchApplicationById(applicationId)
                .then((data: ApplicationDetail) => {
                    setApplication(data);
                    setLoading(false)
                })
                .catch(error => {
                    console.log('Error fetching application:', error);
                    setError(error.message || 'Failed to load application details');
                    setLoading(false);
                })
        }
    }, [show, applicationId]);

    const handleClose = () => {
        setApplication(null);
        setError(null);
        onHide();
    }

    const canViewResume = application?.resumeUrl &&
        (userRole === UserRole.ADMIN ||
            userRole === UserRole.RRECRUITER || 
            (userRole === UserRole.CANDIDATE && application.userId === getCurrentUserId())
        );


    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Application Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {loading ? (
                    <div className="text-center p-4">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : error ? (
                    <Alert variant="danger">{error}</Alert>
                ) : application ? (
                    <>
                        <Row className="mb-4">
                            <Col md={8}>
                                <h4>{application.jobTitle}</h4>
                                <p className="text-muted mb-0">Application ID: {application.id}</p>
                                <p className="text-muted">
                                    Submitted on {formatDate(application.createdAt)}
                                </p>
                            </Col>
                            <Col md={4} className="text-md-end">
                                <Badge bg={getStatusBadgeVariant(application.status)} className="fs-6 p-2">
                                    {application.status}
                                </Badge>
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col md={12}>
                                <h5>Candidate Information</h5>
                                <div className="border-top pt-2">
                                    <Row>
                                        <Col md={4} className="text-muted">Name:</Col>
                                        <Col md={8}>{application.candidateName}</Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col md={4} className="text-muted">User ID:</Col>
                                        <Col md={8}>{application.userId}</Col>
                                    </Row>

                                    {canViewResume && (
                                        <Row className="mt-2">
                                            <Col md={4} className="text-muted">Resume:</Col>
                                            <Col md={8}>
                                                <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
                                                    View Resume
                                                </a>
                                            </Col>
                                        </Row>
                                    )}
                                </div>
                            </Col>
                        </Row>

                        {application.coverLetter && (
                            <Row className="mb-4">
                                <Col md={12}>
                                    <h5>Cover Letter</h5>
                                    <div className="border-top pt-2">
                                        <div className="application-cover-letter">
                                            {application.coverLetter}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        )}

                        {application.answers && application.answers.length > 0 && (
                            <Row className="mb-4">
                                <Col md={12}>
                                    <h5>Screeting Questions</h5>
                                    <div className="border-top mt-2">
                                        <Table responsive borderless>
                                            <tbody>
                                                {application.answers.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="fw-bold" style={{width: "40%"}}>
                                                            {item.question}
                                                        </td>
                                                        <td>{item.answer}</td>
                                                    </tr>
                                                )
                                                )}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                            </Row>
                        )}

                        {application.candidateNote && (
                            <Row className="mb-4">
                                <Col md={12}>
                                    <h5>Candidate Note</h5>
                                    <div className="border-top pt-2">
                                        <p>{application.candidateNote}</p>
                                    </div>
                                </Col>
                            </Row>
                        )}

                        {(userRole === UserRole.ADMIN || userRole === UserRole.RRECRUITER) && application.recruiterNotes && (
                            <Row className="mb-4">
                                <Col md={12}>
                                    <h5>Recruiter Notes</h5>
                                    <div className="border-top pt-2">
                                        <p>{application.recruiterNotes}</p>
                                    </div>
                                </Col>
                            </Row>
                        )}

                        <Row>
                            <Col md={12}>
                                <h5>Application TimeLine</h5>
                                <div className="border-top pt-2">
                                    <Row>
                                        <Col md={4} className="text-muted">Created:</Col>
                                        <Col md={8}>{formatDate(application.createdAt)}</Col>
                                    </Row>
                                    {application.updatedAt !== application.createdAt && (
                                        <Row className="mt-2">
                                            <Col md={4} className="text-muted">Last Updated:</Col>
                                            <Col md={8}>{formatDate(application.updatedAt)}</Col>
                                        </Row>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <Alert variant="info">No application data available</Alert>
                )}
            </Modal.Body>
        </Modal>
    )
}

export default ApplicationDetailModal;