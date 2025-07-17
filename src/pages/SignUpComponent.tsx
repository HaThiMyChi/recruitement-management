import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { Button, Card, Container, Form } from "react-bootstrap";
import { UserRole } from "../enums/UserRole";
import { register } from "../app/slices/register.slice";
import { toast } from "react-toastify";

const SignUpComponent: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmal] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');

    const response = useSelector((state: RootState) => state.register)
    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Sign up with user(', email, ', ', password, ', ', phone, ', ', fullName, ', ', role, ')')
        dispatch(register({email, password, phone, fullName, role}));
    }

    useEffect(() => {
        if (response.status === 201) {
            toast.success('The user have been sign up successful!');
            navigate('/login');
        }
    }, [response.status, response.error]);

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{minHeight: '100vh'}}>
            <Card style={{ width: '400px', padding: '20px' }}>
                <Card.Body>
                    <h3 className="text-center mb-4">Sign up</h3>

                    <Form onSubmit={handleSignUp}>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmal(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPhone" className="mb-3">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formFullName" className="mb-3">
                            <Form.Label>Full name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter full name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formRole" className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value=''>Please select role</option>
                                <option value={UserRole.RRECRUITER}>{UserRole.RRECRUITER}</option>
                                <option value={UserRole.CANDIDATE}>{UserRole.CANDIDATE}</option>
                            </Form.Select>
                        </Form.Group>

                        <div className="d-grid">
                            <Button variant="primary" type="submit">Submit</Button>
                        </div>
                    </Form>

                    <div style={{display: 'flex', justifyContent: 'center', padding: '14px 0'}}>
                        <Link style={{ color: 'rgba(254, 44, 85, 1)', marginLeft: '5px', fontWeight: '600' }} to={'/login'}>Sign in</Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default SignUpComponent;