import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logInUser } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../redux/hooks';

type Props = {
  isNew: boolean;
};

export default function Login({ isNew }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sumbitUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isNew) {
      try {
        const success = await axios.post('/user', {
          email,
          password,
          username,
          role,
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
        // TODO: Authenticate User
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

  return (
    <div>
      {isNew ? (
        <h1 className="login-header">Signup!</h1>
      ) : (
        <h1 className="login-header">Login to your account!</h1>
      )}

      <div className="login-form">
        <Form onSubmit={(e) => sumbitUser(e)} id="login-form">
          <FloatingLabel className="mb-3" controlId="floatingEmail" label="Email">
            <Form.Control
              placeholder="Email"
              type="text"
              className="login-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
          {isNew && (
            <>
              <FloatingLabel className="mb-3" controlId="floatingUserName" label="Username">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  className="login-input"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel className="mb-3" controlId="floatingRole" label="Role">
                <Form.Select id="user-role" onChange={(e) => setRole(e.target.value)}>
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
              type="password"
              className="login-input"
              onChange={(e) => setPassword(e.target.value)}
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
        <Button type="submit" variant="primary" form="login-form">
          Login
        </Button>
      </div>
    </div>
  );
}
