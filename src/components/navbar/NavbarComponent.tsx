import { Container, Nav, Navbar} from "react-bootstrap";
import styles from "./NavbarComponent.module.css";
import { Link } from "react-router-dom";

const NavbarComponent: React.FC = () => {
    return (
       <Navbar bg="light" expand="lg">
        <Container>
            <Nav className="me-auto">
                <Nav.Link as={Link} className={styles.navLink} to='/jobs'>Jobs</Nav.Link>
            </Nav>
        </Container>
       </Navbar>
    )
}

export default NavbarComponent;