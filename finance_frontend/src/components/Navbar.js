import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "../components/style/navbar.css";
import AuthService from "../services/auth.service";

const NavbarComponent = () => {
  const userData = AuthService.getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <>
      <Navbar
        bg="primary"
        variant="dark"
        expand="lg"
        className="navbar-custom"
        sticky="top"
      >
        <Container>
          <Navbar.Brand as={Link} to="/dashboard">
            FNCE.
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Navbar sticky="top" />
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/transactions">
                Transactions
              </Nav.Link>
              <Nav.Link as={Link} to="/about-us">
                About Us
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {!userData ? (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    Register
                  </Nav.Link>
                </>
              ) : (
                <NavDropdown
                  title={
                    <div className="profile-container">
                      <img
                        src={require("../img/defaultprofilepic.jpg")}
                        alt="Profile"
                        className="profile-picture"
                      />
                      <span>{userData.username}</span>
                    </div>
                  }
                  id="basic-nav-dropdown"
                  align="end"
                >
                  {/* <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item> */}
                  {/* <NavDropdown.Divider /> */}
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
