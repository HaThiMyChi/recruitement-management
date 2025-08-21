import React from "react";
import { Button, Container, NavDropdown, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faTachometerAlt,
  faBriefcase,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { logout } from "../../app/slices/auth.slice";
import "./HeaderComponent.module.css"; // Still import for any global styles
import logo from "../../logo.png"

const HeaderComponent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-2">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img 
            src={logo}
            alt="React Logo"
            height="40"
            className="d-inline-block align-top me-2"
            style={{ animation: 'logoSpin 10s linear infinite' }}
          />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/jobs" className="text-light mx-2">
              Jobs
            </Nav.Link>
            <Nav.Link as={Link} to="/applications" className="text-light mx-2">
              Applications
            </Nav.Link>
          </Nav>
          
          <Nav>
            {token && user ? (
              <NavDropdown 
                title={
                  <div className="d-inline-flex align-items-center text-light">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    <span>{user.email}</span>
                  </div>
                } 
                id="user-dropdown"
                align="end"
                className="custom-dropdown"
              >
                <NavDropdown.Item as={Link} to="/me">
                  <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                  Dashboard
                </NavDropdown.Item>
                {/* <NavDropdown.Item as={Link} to="/jobs/manage">
                  <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                  Job Management
                </NavDropdown.Item> */}
                <NavDropdown.Item as={Link} to="/applications">
                  <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                  Applied Jobs
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button 
                variant="outline-light" 
                onClick={() => navigate("/login")}
                style={{ backgroundColor: '#61DAFB', color: '#20232a', border: 'none' }}
              >
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderComponent;