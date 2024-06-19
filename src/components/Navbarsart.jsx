import React, { useContext, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../Assetes/popcornlogo.png';
import './Css/Navbarsart.css';

function NavbarComponent() {
    const { user, logout, setUser: setAuthUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        if (storedUser) {
            setAuthUser(storedUser);
        }
    }, [setAuthUser]);

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container className="custom-container">
                <img src={logo} alt="Login Icon" style={{ width: '50px', height: '50px', marginRight: '8px' }} />
                <Navbar.Brand as={Link} to="/" className='navbar-brand-tittle'>MovieRating</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav">
                <FontAwesomeIcon icon={faBars} size="lg" />
                </Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
                    <Nav className="me-auto ms-auto">
                        <Nav.Link as={Link} to="/" className='navbar-text'><h1>HOME</h1></Nav.Link>
                        <Nav.Link as={Link} to="/movies" className='navbar-text'><h1>MOVIES</h1></Nav.Link>
                        <Nav.Link as={Link} to="/news" className='navbar-text'><h1>NEWS</h1></Nav.Link>
                    </Nav>
                    <Nav>
                        {user ? (
                            <>
                                <Nav.Link as={Link} to="/profile" className='navbar-text'><h2>MyProfile</h2></Nav.Link>
                                <Nav.Link onClick={handleLogout} className='navbar-text'><h2>Sign out</h2></Nav.Link>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/login" className='navbar-text'><h2>Login</h2></Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
