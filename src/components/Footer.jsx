import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTelegram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer bg-light" style={{ borderTop: "2px solid #d3d3d3" }}>
      <Container>
        <Row>
          <Col>
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li>Address: 123  Street, ITE</li>
              <li>Email: info@movierating.com</li>
              
            </ul>
          </Col>
          <Col>
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook size={24} /> Facebook
                </a>
              </li>
              {/* <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={24} /> Instagram
                </a>
              </li> */}
              <li>
                <a href="https://t.me/movierating" target="_blank" rel="noopener noreferrer">
                  <FaTelegram size={24} />  Telegram
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
