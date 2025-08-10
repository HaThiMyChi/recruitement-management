import { FormEvent, useEffect, useState } from "react";
import { User } from "../models/User";
import { useDispatch, useSelector } from "react-redux";
import { AdminRequest } from "../app/types/admin.type";
import { UserRole } from "../enums/UserRole";
import { UserStatus } from "../enums/UserStatus";
import { RootState } from "../app/store";
import { actionUser, getUsers } from "../app/slices/admin.slice";
import { Button, Modal } from "react-bootstrap";
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

    const handleFilterUsers = (e: FormEvent) => {
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
        }
    }, [message])

    return (
        <>
            <div className="main_content">
                <div>
                    <span style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                    }}>User Management</span>

                    <form style={{
                        marginBottom: '20px',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}>
                        <select name="role"
                        value={param.role || ''}
                        onChange={onFilterChange}
                        style={{
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            minWidth: '200px'
                        }}
                        >
                            <option value="">Select Role</option>
                            {Object.values(UserRole).map(role  => (
                                <option key={role } value={role }>
                                    {role }
                                </option>
                            ))}
                        </select>
                        <select 
                            name="status"
                            value={param.status || ''}
                            onChange={onFilterChange}
                            style={{
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                minWidth: '200px'
                            }}
                        >
                            <option value="">Select Status</option>
                            {Object.values(UserStatus).map(status => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={(e) => handleFilterUsers(e)}
                            style={{
                                padding: '8px 15px',
                                borderRadius: '4px',
                                border: 'none',
                                backgroundColor: '#007bff',
                                color: 'white',
                                cursor: 'pointer'
                            }}>
                            Apply Filters
                        </button>
                    </form>
                </div>
                <div className="job_manage_component">
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Full name</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users !== undefined && users.length > 0 ? (
                                    users.map(user => (
                                        <tr key={`user-${user.id}`}>
                                            <th scope="row">{user.id}</th>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.fullName}</td>
                                            <td>{user.role}</td>
                                            <td>{user.status}</td>
                                            <td className="btn-col">
                                                {
                                                    user.status !== UserStatus.ACTIVE ? (
                                                        <button className="btn btn-primary" onClick={() => handleActivateUser(user)}>Activate</button>
                                                    ) : (
                                                        <button className="btn btn-danger" onClick={() => handleDeactivateUser(user)}>Deactive</button>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td>No data</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to {selectedUser?.status === UserStatus.ACTIVE || selectedUser?.status === UserStatus.PENDING ? 'deactivate' : 'activate'} user {selectedUser?.fullName}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleActionUser}>
                        {(selectedUser?.status === UserStatus.ACTIVE || selectedUser?.status === UserStatus.PENDING) ? 'Deactivate' : 'Activate'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UserManagementComponent;