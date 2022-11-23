import React, { useState } from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logInUser } from '../redux/slices/userSlice';
import { useAppDispatch } from '../redux/hooks';
// import { Redirect } from 'react-router-dom';

type Props = {
  isAdmin: boolean;
  isNew: boolean;
};

// const fetchUser = async () => {
//   const res = await fetch('/user/login');
//   return res.json();
// };

// type LoggedInType = {
//   role: '' | 'chef' | 'owner' | 'customer';
// };

export default function Login({ isAdmin, isNew }: Props) {
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  // const [loggedIn, setLoggedIn] = useState<LoggedInType>({ role: '' });
  // const [showSignUp, setShowSignUp] = useState(false);
  // const { data, status } = useQuery('user', fetchUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sumbitUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isNew) {
      try {
        // post
        const success = await axios.post('/user', {
          email: userEmail,
          password: userPass,
          username: userName,
          role: userRole,
        });
        if (success) alert('User Added! Signing you in.');
      } catch (error) {
        console.error(error);
        alert('User Already exists!');
      }
      // get
      const { data } = await axios.get(`/user?email=${userEmail}`);
      console.log('Ensure that this is USER obj:', data); // TODO Remove once verified
      // setState
      // setLoggedIn((p) => ({
      //   // TODO: Remove after I get the user login finished
      //   role: data.role,
      // }));
      dispatch(logInUser(data));
      // Redirect
      if (data.role === 'customer') navigate('/');
      if (data.role === 'owner') navigate('/admin/manage');
      if (data.role === 'chef') navigate('/admin/manage');
      // return;
    }
    if (!isNew) {
      try {
        // Get user data
        // Authenticate User
        const success = await axios.post(`/user/auth`, {
          email: userEmail,
          password: userPass,
        });
        // IF SUCCESSFUL
        if (success) {
          // Get user data
          const { data } = await axios.get(`/user?email=${userEmail}`);
          console.log('Ensure that this is USER obj:', data);
          // Set state
          dispatch(logInUser(data));
          // redirect home if not admin, else manager
          if (data.role === 'customer') navigate('/');
          if (data.role === 'owner') navigate('/admin/manage');
          if (data.role === 'chef') navigate('/admin/manage');
        }
      } catch (error) {
        alert('Wrong Login Info!');
      }
    }
  };

  // if (loggedIn && loggedIn.role === 'customer') navigate('/');
  // // if (loggedIn && loggedIn.role === 'customer') return  <Redirect to='/' />
  // if (loggedIn && loggedIn.role === 'owner') {
  //   navigate('/admin/manage');
  //   return <div></div>;
  // }
  // if (loggedIn && loggedIn.role === 'chef') navigate('/admin/manage');
  // // if (loggedIn && loggedIn.role === 'owner') return  <Redirect to='/redirect' />

  return (
    <div>
      {isNew ? <h1>Signup!</h1> : <h1>Login to your account!</h1>}

      <form onSubmit={(e) => sumbitUser(e)}>
        <label htmlFor="user-email">
          Email
          <input id="user-email" type="text" onChange={(e) => setUserEmail(e.target.value)} />
        </label>
        {isNew && (
          <>
            <label htmlFor="user-role">
              username
              <input type="text" onChange={(e) => setUserName(e.target.value)} />
            </label>
            <label htmlFor="user-role">
              role
              <select id="user-role" onChange={(e) => setUserRole(e.target.value)}>
                <option value="customer">customer</option>
                <option value="chef">chef</option>
                <option value="owner">owner</option>
              </select>
              {/* <input type="text" onChange={(e) => setUserRole(e.target.value)} /> */}
            </label>
          </>
        )}
        <label htmlFor="user-password">
          Password
          <input id="user-password" type="text" onChange={(e) => setUserPass(e.target.value)} />
        </label>
        <Button type="submit">Login</Button>
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
      {/* <Button onClick={() => setLoggedIn(() => ({ role: 'chef' }))}>login as chef</Button>
      <Button onClick={() => setLoggedIn(() => ({ role: 'owner' }))}>login as owner</Button>
      <Button onClick={() => setLoggedIn(() => ({ role: 'customer' }))}>login as customer</Button> */}
    </div>
  );
}
