import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logInUser } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../redux/hooks';

interface TestingProps {
  onUsernameChange?: (username: string) => void;
  onPasswordChange?: (password: string) => void;
  onRoleChange?: (role: string) => void;
  onEmailChange?: (email: string) => void;
  onSubmit?: (email: string, username: string, password: string, role: string) => void;
}

export interface Props extends TestingProps {
  isNew: boolean;
}

export default function Login({
  isNew,
  onUsernameChange,
  onPasswordChange,
  onRoleChange,
  onEmailChange,
  onSubmit,
}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const sumbitUser = async () => {
    if (isNew) {
      try {
        const success = await axios.post('/user', {
          email,
          password,
          username,
          role: role || 'customer',
        });
        if (success) alert('User Added! Signing you in.');
      } catch (error) {
        alert('Error: User already exists!');
      }
      const { data } = await axios.get(`/user?email=${email}`);

      dispatch(logInUser(data));

      if (data.role === 'customer') navigate('/');
      if (data.role === 'owner') navigate('/admin/manage');
      if (data.role === 'chef') navigate('/admin/manage');
    }
    if (!isNew) {
      try {
        // TODO: Authenticate User w/ Auth0
        const success = await axios.post(`/user/auth`, {
          email,
          password,
        });
        if (success) {
          const { data } = await axios.get(`/user?email=${email}`);
          dispatch(logInUser(data));

          if (data.role === 'customer') navigate('/');
          if (data.role === 'owner') navigate('/admin/manage');
          if (data.role === 'chef') navigate('/admin/manage');
        }
      } catch (error) {
        alert('Error: Invalid login info!');
      }
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUsername(value);
    onUsernameChange!(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    onEmailChange!(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
    onPasswordChange!(value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setRole(value);
    onRoleChange!(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sumbitUser();
    onSubmit!(email, username, password, role || 'customer');
  };

  return (
    <div>
      <h1 data-testid="login-header" className="login-header">
        {isNew ? 'Signup!' : 'Login to your account!'}
      </h1>

      <div className="login-form">
        <Form
          // onSubmit={(e) => sumbitUser(e)}
          onSubmit={handleSubmit}
          id="login-form"
          data-testid="login-form"
        >
          <FloatingLabel className="mb-3" controlId="floatingEmail" label="Email">
            <Form.Control
              data-testid="email"
              placeholder="Email"
              type="text"
              className="login-input"
              onChange={handleEmailChange}
              // onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
          {isNew && (
            <>
              <FloatingLabel className="mb-3" controlId="floatingUserName" label="Username">
                <Form.Control
                  data-testid="username"
                  type="text"
                  placeholder="Username"
                  className="login-input"
                  onChange={handleUsernameChange}
                  // onChange={(e) => setUsername(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel className="mb-3" controlId="floatingRole" label="Role">
                <Form.Select
                  data-testid="role"
                  id="user-role"
                  onChange={handleRoleChange}
                  // onChange={(e) => setRole(e.target.value)}
                >
                  {['customer', 'chef', 'owner'].map((n, i) => (
                    <option defaultValue="customer" key={i} value={n}>
                      {n}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </>
          )}
          <FloatingLabel className="mb-3" controlId="floatingPassword" label="Password">
            <Form.Control
              placeholder="Password"
              data-testid="password"
              type="password"
              className="login-input"
              onChange={handlePasswordChange}
              // onChange={(e) => setPassword(e.target.value)}
            />
          </FloatingLabel>
        </Form>
      </div>

      <br />
      <br />

      <div className="login-buttons">
        {!isNew && (
          <LinkContainer className="mb2" style={{ marginBottom: '10px' }} to="redirect2">
            <Button variant="secondary" size="sm">
              Create an account
            </Button>
          </LinkContainer>
        )}
        <Button data-testid="submit" type="submit" variant="primary" form="login-form">
          Login
        </Button>
      </div>
    </div>
  );
}

Login.defaultProps = {
  onUsernameChange: (username: string) => username,
  onPasswordChange: (password: string) => password,
  onRoleChange: (role: string) => role,
  onEmailChange: (email: string) => email,
  onSubmit: (email: string, username: string, password: string, role: string) =>
    `${email}${username}${password}${role}`,
};
