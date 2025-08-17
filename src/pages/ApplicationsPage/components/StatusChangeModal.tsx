import { useState } from "react";
import { UpdateApplicationStatusParams } from "../../../types/applicationTypes";
import { ApplicationStatus } from "../../../enums/ApplicationStatus";
import { Modal, Form, Button} from "react-bootstrap";

interface StatusChangeModalProps {
    isOpen: boolean;
    applicationId: number | null;
    onSubmit: (data: UpdateApplicationStatusParams) => void;
    onCancel: () => void;
}

const StatusChangeModal: React.FC<StatusChangeModalProps> = ({
    isOpen,
    applicationId,
    onSubmit,
    onCancel
}) => {
    const [status, setStatus] = useState<ApplicationStatus>(ApplicationStatus.PENDING);
    const [notes, setNotes] = useState<string>('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            status,
            recruiterNotes: notes
        });
    };

    return (
        <Modal show={isOpen} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Change Application Status</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Application ID</Form.Label>
                        <Form.Control type="text" value={applicationId || ''} disabled />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select 
                            value={status}
                            onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                            >
                            {Object.values(ApplicationStatus).map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Recruiter Notes</Form.Label>
                        <Form.Control 
                            as="textarea"
                            rows={4}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add notes about this status change (optional)"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                    <Button variant="primary" type="submit">Update Status</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default StatusChangeModal;