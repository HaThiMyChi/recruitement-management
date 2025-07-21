import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { login } from "../app/slices/auth.slice";
import { toast } from "react-toastify";
import { UserRole } from "../enums/UserRole";

const LoginComponent: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.login.data?.token);
    const user = useSelector((state: RootState) => state.login.data?.user);

    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password,setPassword] = useState('');
    
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ emailOrPhone, password }));
    }

    useEffect(() => {
        if (token && user) {
            toast.success('Login have ben successfully!!!');
            if (user.role === UserRole.ADMIN) navigate('/admin');
            else navigate('/')
        }
    }, [token, user, navigate]) 

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card style={{width: '400px', padding: '20px'}}>
                <Card.Body>
                    <h3 className="text-center mb-4">Log in</h3>
                    
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="emal"
                                placeholder="Enter mail"
                                value={emailOrPhone}
                                onChange={(e) => setEmailOrPhone(e.target.value)}
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

                        <div className="d-grid">
                            <Button variant="primary" type="submit">Submit</Button>
                        </div>
                    </Form>
                    <div style={{display: 'flex', justifyContent: 'center', padding: '16px 0'}}>
                        Don't have an account? 
                        <Link style={{color: 'rgba(254, 44, 85, 1)', marginLeft: '5px', fontWeight: '600'}} to={'/register'}>Sign up</Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default LoginComponent;