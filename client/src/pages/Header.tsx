import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
// import Button from 'react-bootstrap/Button';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { capFirstChar } from '../utils';
import { logOutUser } from '../redux/slices/userSlice';

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  const logoutUser = () => {
    dispatch(logOutUser());
    navigate('/');
  };

  const { pathname } = useLocation();
  const atHome = () => pathname === '/';
  // const atManage = () => pathname === '/admin/manage';
  const atLogin = () => pathname === '/login';
  // const atAdminLogin = () => pathname === '/admin/login';
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Pizza Planet</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          {atHome() && (
            <LinkContainer to="/order">
              <Nav.Link className="justify-content-center">Order Now</Nav.Link>
            </LinkContainer>
          )}
          <Navbar.Collapse className="justify-content-end">
            {user ? (
              <>
                <Navbar.Text>{`Signed in as: ${capFirstChar(user.role)} ${capFirstChar(
                  user.username
                )}`}</Navbar.Text>{' '}
                <Button
                  className="logout"
                  size="sm"
                  onClick={logoutUser}
                  style={{ marginLeft: '10px' }}
                >
                  Logout
                </Button>
              </>
            ) : (
              !atLogin() && (
                <LinkContainer to="/login">
                  <Button className="login" size="sm">
                    Login
                  </Button>
                </LinkContainer>
              )
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}
