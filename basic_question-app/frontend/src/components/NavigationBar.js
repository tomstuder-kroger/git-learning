import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

function NavigationBar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          🎉 Icebreaker
        </Navbar.Brand>
        <Nav className="ms-auto">
          {!isHome && (
            <Nav.Link as={Link} to="/" className="btn btn-outline-light btn-sm me-2">
              Home
            </Nav.Link>
          )}
          <Nav.Link as={Link} to="/favorites" className="btn btn-outline-light btn-sm">
            ❤️ Favorites
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
