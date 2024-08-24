import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../components/style/navbar.css";
import AuthService from "../services/auth.service";

const NavbarComponent = () => {
  const userData = AuthService.getCurrentUser();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        {userData ? (
          <Navbar.Brand className="d-flex align-items-center">
            <img
              src={require("../img/defaultprofilepic.jpg")}
              alt="Profile"
              className="profile-picture"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <h1 style={{ fontSize: "18px", margin: 0, color: "white" }}>
              Welcome, {userData.username}
            </h1>
          </Navbar.Brand>
        ) : (
          <>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </Nav>
          </>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/add-transaction">
              Add Transaction
            </Nav.Link>
            <Nav.Link as={Link} to="/transactions">
              Transaction List
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            {userData && (
              <>
                <Nav.Link as={Link} to="/settings">
                  Settings
                </Nav.Link>
                <Nav.Link as={Link} to="/logout">
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
