import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';

export default function Header() {
  const [user, setUser] = useState({}); // TODO: Assign the user to the login
  const loggedIn = null;
  // const loggedIn = { user: 'daurham95@gmail.com' };

  return (
    <div>
      <Navbar>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Pizza Planet</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Nav.Link className="justify-content-center">Order Now</Nav.Link>
          <Navbar.Collapse className="justify-content-end">
            {loggedIn ? (
              <Navbar.Text>{`Signed in as: ${loggedIn}`}</Navbar.Text>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}
