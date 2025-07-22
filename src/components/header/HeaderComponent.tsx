import { Button, Container, NavDropdown, Row } from "react-bootstrap";
import styles from "./HeaderComponent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { logout } from "../../app/slices/auth.slice";
import { toast } from "react-toastify";

const HeaderComponent: React.FC = () => {
    // const user = useSelector((state: RootState) => state.login.user);
    // const token = useSelector((state: RootState) => state.login.token);
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;  // ! báo cho TypeScript: “Cái này chắc chắn không null đâu, cứ parse đi.”
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(logout())
        toast.success('Logout successfully')
        navigate('/')
    }

    return (
        <Container>
            <Row>
                <div className={styles.headerContainer}>
                    <Link to={'/'}>
                        <img src="https://c.topdevvn.com/v4/assets/images/td-logo.png"></img>
                    </Link>

                    <div>
                        {
                            token && user ? (
                                <Button variant="danger" className={styles.button}>
                                    <NavDropdown title={
                                        <>
                                            <FontAwesomeIcon className={styles.icon} icon={faUser} /> {user?.email}
                                        </>
                                    } id="collapsible-nav-dropdown">
                                        <NavDropdown.Item as={Link} to={'/me'}>
                                            Dashboard
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">
                                            Job Management
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">
                                            Applied Jobs
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleLogout}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Button>
                            ) : (
                                <Button className={styles.button} variant="danger">
                                    <Link className={styles.link} to={'/login'}>Login</Link>
                                </Button>
                            )
                        }
                    </div>
                </div>
            </Row>
        </Container>    )
}

export default HeaderComponent;