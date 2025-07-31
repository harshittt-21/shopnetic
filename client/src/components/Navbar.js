import React, { useContext, useState, useEffect } from 'react';
import { Navbar as BNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.body.className = dark ? 'bg-dark text-light' : '';
  }, [dark]);

  const logout = () => { localStorage.clear(); window.location = '/'; };
return (
  <BNavbar
    bg={dark ? 'dark' : 'light'}
    variant={dark ? 'dark' : 'light'}
    style={{ backgroundColor: dark ? '#212529' : '#f8f9fa' }}
    className="shadow-sm"
  >
    <Container>
      <BNavbar.Brand as={Link} to="/">
        Shopnetic
      </BNavbar.Brand>

      <Nav className="ms-auto align-items-center">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/cart">Cart ({cart.length})</Nav.Link>
        {!token && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
        {token && role === 'admin' && (
          <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
        )}

        <Button
          variant="outline-secondary"
          size="sm"
          className="ms-2"
          onClick={() => setDark(!dark)}
        >
          {dark ? <FiSun /> : <FiMoon />}
        </Button>

        {token && (
          <Button
            variant="outline-danger"
            size="sm"
            className="ms-2"
            onClick={logout}
          >
            Logout
          </Button>
        )}
      </Nav>
    </Container>
  </BNavbar>
);
};

export default Navbar;