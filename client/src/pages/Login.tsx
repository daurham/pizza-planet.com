import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

type Props = {
  isAdmin: boolean;
};

const fetchUser = async () => {
  const res = await fetch('/user/login');
  return res.json();
};

export default function Login({ isAdmin }: Props) {
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const { data, status } = useQuery('user', fetchUser);
  const navigate = useNavigate();
  return (
    <div>
      <label>
        Email
        <input type="text" onChange={(e) => setUserEmail(e.target.value)} />
      </label>
      <label>
        Password
        <input type="text" onChange={(e) => setUserPass(e.target.value)} />
      </label>
      {isAdmin ? null : (
        <LinkContainer to="redirect">
          <Nav.Link>Admin?</Nav.Link>
        </LinkContainer>
      )}
      {isAdmin && (
        <LinkContainer to="redirect">
          <Nav.Link onClick={() => navigate('/other-page', { state: { id: 7, color: 'green' } })}>
            *Signs in*
          </Nav.Link>
        </LinkContainer>
      )}
    </div>
  );
}
