import React, { useState } from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { setUser, getUser } from '../redux/slices/usersSlice';
import { useAppDispatch } from '../redux/hooks';
// import { Redirect } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

type Props = {
  isAdmin: boolean;
  isNew: boolean;
};

// const fetchUser = async () => {
//   const res = await fetch('/user/login');
//   return res.json();
// };




type LoggedInType = {
  role: '' | 'chef' | 'owner' | 'customer';
};



export default function Login({ isAdmin, isNew }: Props) {
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [loggedIn, setLoggedIn] = useState<LoggedInType>({ role: '' });
  const [showSignUp, setShowSignUp] = useState(false);
  // const { data, status } = useQuery('user', fetchUser);
  const useDispatch = useAppDispatch();
  const navigate = useNavigate();
  const sumbitUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isNew) {
      // post
      await axios.post('/user/add', {
        password: userPass,
        username: userName,
        email: userEmail,
        role: userRole,
      });
      // get
      const { data } = await axios.get(`/user?email=${userEmail}`);
      console.log('Ensure that this is USER obj:', data);
      // setState
      setLoggedIn((p) => ({
        role: data.role,
      }));
      useDispatch(setUser(data));
      // Redirect
      return;
    }
    if (!isNew) {
      try {
        // Get user data
        const { data } = await axios.get(`/user?email=${userEmail}`);
        console.log('Ensure that this is USER obj:', data);
        // Set state
        useDispatch(setUser(data));
        // redirect home if not admin, else manager
      } catch (error) {
        alert('Wrong Login Info!');
      }
    }
  };

  if (loggedIn && loggedIn.role === 'customer') navigate('/')
  // if (loggedIn && loggedIn.role === 'customer') return  <Redirect to='/' />
  if (loggedIn && loggedIn.role === 'owner') {
    navigate('/admin/manage')
    return <div></div>
  } 
  if (loggedIn && loggedIn.role === 'chef') navigate('/admin/manage')
  // if (loggedIn && loggedIn.role === 'owner') return  <Redirect to='/redirect' />

  return (
    <div>
      {isNew ? <h1>Signup!</h1> : <h1>Login to your account!</h1>}

      <form onSubmit={(e) => sumbitUser(e)}>
        <label>
          Email
          <input type="text" onChange={(e) => setUserEmail(e.target.value)} />
        </label>
        {isNew && (
          <>
            <label>
              username
              <input type="text" onChange={(e) => setUserName(e.target.value)} />
            </label>
            <label>
              role
              <select onChange={(e) => setUserRole(e.target.value)}>
                <option value={'customer'}>customer</option>
                <option value={'chef'}>chef</option>
                <option value={'owner'}>owner</option>
              </select>
              {/* <input type="text" onChange={(e) => setUserRole(e.target.value)} /> */}
            </label>
          </>
        )}
        <label>
          Password
          <input type="text" onChange={(e) => setUserPass(e.target.value)} />
        </label>
      </form>

      <br />
      <br />

      {!isNew && (
        <>
          New User?
          <LinkContainer to="redirect2">
            <Button>Create an account</Button>
            {/* <Nav.Link>Create an account</Nav.Link> */}
          </LinkContainer>
        </>
      )}
      {!isAdmin && (
        <LinkContainer to="redirect">
          <Nav.Link>Admin?</Nav.Link>
        </LinkContainer>
      )}
      {isAdmin && (
        <LinkContainer to="redirect">
          <Nav.Link onClick={() => console.log('admin logging in')}>*Signs in*</Nav.Link>
        </LinkContainer>
      )}
    <Button onClick={() => setLoggedIn(() => ({role: 'chef'}))}>login as chef</Button>
    <Button onClick={() => setLoggedIn(() => ({role: 'owner'}))}>login as owner</Button>
    <Button onClick={() => setLoggedIn(() => ({role: 'customer'}))}>login as customer</Button>
    </div>
  );
}
