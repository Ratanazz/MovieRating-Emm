import React from 'react';
import { Container, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa'; // Importing the user icon from React Icons
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';

function NavbarComponent({ isAuthenticated }) {
  return (
    <Navbar expand="lg" className="navbar bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">MovieRating</Navbar.Brand> 
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link as={Link} to="/">Home</Nav.Link> 
            <Nav.Link as={Link} to = "/movies">Movie</Nav.Link>
            <Nav.Link as={Link} to="/news">News</Nav.Link> 
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav>
            {isAuthenticated ? (
              <Nav.Link as={Link} to="/profile" className="btn btn-primary">
                <FaUser className="profile-icon" /> 
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="mx-2"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
                <span className="ms-1 align-texttop">Profile</span>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
