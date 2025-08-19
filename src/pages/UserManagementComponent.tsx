import { FormEvent, useEffect, useState } from "react";
import { User } from "../models/User";
import { useDispatch, useSelector } from "react-redux";
import { AdminRequest } from "../app/types/admin.type";
import { UserRole } from "../enums/UserRole";
import { UserStatus } from "../enums/UserStatus";
import { RootState } from "../app/store";
import { actionUser, getUsers, resetMessage } from "../app/slices/admin.slice";
import { Badge, Button, Card, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";

const UserManagementComponent: React.FC = () => {
    const [show, setShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User>();
    const dispatch = useDispatch();
    const [param, setParam] = useState<AdminRequest>({
        page: 1,
        limit: 10,
        role: UserRole.CANDIDATE,
        status: UserStatus.ACTIVE,
        sortBy: 'createdAt',
        sortOrder: 'DESC'
    })

    const data = useSelector((state: RootState) => state.admin.data)
    console.log('data user manage', data)
    const users = data?.data;
    const meta = data?.meta;
    const message = useSelector((state: RootState) => state.admin.message);
    console.log('message user manage', message)

    const handleFilterUsers = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(getUsers(param));
    }

    const onFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        setParam((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleActivateUser = (user: User) => {
        setShow(true);
        setSelectedUser(user);
    }

    const handleDeactivateUser = (user: User) => {
        setShow(true)
        setSelectedUser(user)
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleActionUser = () => {
        if (selectedUser) {
            dispatch(actionUser(selectedUser));
        }
        setShow(false);
    }
    
    useEffect(() => {
        dispatch(getUsers(param));
    }, [])

    useEffect(() => {
        if (message) {
            toast.success(message.message);

            // Reset message 
            dispatch(resetMessage());
        }
    }, [message, dispatch])

    return (
        <Container fluid className="py-4">
            <Card>
                <Card.Body>
                    <Row className="mb-4 align-items-center">
                        <Col>
                            <h1 className="mb-0">User Management</h1>
                        </Col>
                    </Row>

                    <Form onSubmit={handleFilterUsers}>
                        <Row className="g-3 mb-4">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select
                                        name="role"
                                        value={param.role || ''}
                                        onChange={onFilterChange}
                                    >
                                        <option value="">Select Role</option>
                                        {Object.values(UserRole).map(role => (
                                            <option key={role} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select
                                        name="status"
                                        value={param.status || ''}
                                        onChange={onFilterChange}
                                    >
                                        <option value="">Select Status</option>
                                        {Object.values(UserStatus).map(status => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={4} className="d-flex align-items-end">
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

                    <Table hover bordered responsive className="shadow-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Full Name</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.length > 0 ? (
                                users.map(user => (
                                    <tr key={`user-${user.id}`}>
                                        <td>{user.id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.fullName}</td>
                                        <td>
                                            <Badge bg={getRoleBadgeVariant(user.role)}>
                                                {user.role}
                                            </Badge>
                                        </td>
                                        <td>
                                            <Badge bg={getStatusBadgeVariant(user.status)}>
                                                {user.status}
                                            </Badge>
                                        </td>
                                        <td>
                                            {user.status !== UserStatus.ACTIVE ? (
                                                <Button 
                                                    variant="outline-success" 
                                                    size="sm"
                                                    onClick={() => handleActivateUser(user)}
                                                >
                                                    Activate
                                                </Button>
                                            ) : (
                                                <Button 
                                                    variant="outline-danger" 
                                                    size="sm"
                                                    onClick={() => handleDeactivateUser(user)}
                                                >
                                                    Deactivate
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {selectedUser?.status === UserStatus.ACTIVE ? 'deactivate' : 'activate'} user <strong>{selectedUser?.fullName}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button 
                        variant={selectedUser?.status === UserStatus.ACTIVE ? 'danger' : 'success'} 
                        onClick={handleActionUser}
                    >
                        {selectedUser?.status === UserStatus.ACTIVE ? 'Deactivate' : 'Activate'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
};

// Helper functions for badge colors
const getRoleBadgeVariant = (role: UserRole): string => {
    switch (role) {
        case UserRole.ADMIN:
            return 'primary';
        case UserRole.RRECRUITER:
            return 'info';
        case UserRole.CANDIDATE:
            return 'secondary';
        default:
            return 'light';
    }
};

const getStatusBadgeVariant = (status: UserStatus): string => {
    switch (status) {
        case UserStatus.ACTIVE:
            return 'success';
        case UserStatus.PENDING:
            return 'warning';
        case UserStatus.DEACTIVATED:
            return 'danger'; 
        default:
            return 'secondary';
    }
};

export default UserManagementComponent;