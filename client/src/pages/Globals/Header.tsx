import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { capFirstChar } from '../../utils';
import { logOutUser } from '../../redux/slices/userSlice';
import { setList } from '../../redux/slices/siteSlice';

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  const logoutUser = () => {
    dispatch(logOutUser());
    dispatch(setList('pizza'));
    navigate('/');
  };

  const { pathname } = useLocation();
  const atHome = () => pathname === '/';
  const atLogin = () => pathname === '/login';
  const atSignin = () => pathname === '/signin';
  return (
    <div className="">
      <div className="header-container">
        {/* <Navbar bg="bg-" variant="outline-primary"> */}
        {/* <Navbar bg="dark" variant="dark" fixed="top" /* style={{ backgroundColor: '#e3cec1' }} */}
        <Navbar bg="dark" variant="dark" style={{ backgroundColor: '#e3cec1' }}>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Pizza Planet</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle />
            {atHome() && (
              // <LinkContainer to="/order">
              <LinkContainer style={{ color: 'white' }} to="/order">
                <Nav.Link style={{ color: 'white' }} className="justify-content-center">
                  Order Now
                </Nav.Link>
              </LinkContainer>
            )}
            {atHome() && user && (user.role === 'owner' || user.role === 'chef') && (
              <LinkContainer style={{ marginLeft: '17px', color: 'white' }} to="/admin/manage">
                <Nav.Link style={{ color: 'white' }} className="justify-content-center">
                  Pizza Manager
                </Nav.Link>
              </LinkContainer>
            )}

            <Navbar.Collapse className="justify-content-end">
              {user ? (
                <>
                  <Navbar.Text style={{ color: 'white' }}>{`Signed in as: ${capFirstChar(
                    user.role
                  )} ${capFirstChar(user.username)}`}</Navbar.Text>{' '}
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
                !atLogin() &&
                !atSignin() && (
                  <LinkContainer style={{ color: 'white' }} to="/login">
                    <Button className="login" size="sm">
                      Login
                    </Button>
                  </LinkContainer>
                )
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <Outlet />
    </div>
  );
}
