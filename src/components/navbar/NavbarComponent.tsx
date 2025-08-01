import { Container, Nav, Navbar} from "react-bootstrap";
import styles from "./NavbarComponent.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFire } from "@fortawesome/free-solid-svg-icons"


const NavbarComponent: React.FC = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return (
       <Navbar bg="light" expand="lg">
        <Container>
            <Nav className="me-auto">
                <Nav.Link as={Link} className={styles.navLink} style={{ color: ' rgb(221, 63, 36)' }} to='/jobs'>
                    <FontAwesomeIcon style={{ paddingRight: '5px' }} className={styles.icon} icon={faFire} />
                    Jobs
                </Nav.Link>
                {token && user && <Nav.Link as={Link} className={styles.navLink} to="/applications">
                    Applications
                </Nav.Link>}
            </Nav>
        </Container>
       </Navbar>
    )
}

export default NavbarComponent;