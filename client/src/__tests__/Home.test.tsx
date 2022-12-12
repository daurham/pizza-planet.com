import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home, { Props } from '../pages/Home/Home';
import { MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { store } from '../redux/store';

// Inspired from: https://www.pluralsight.com/guides/how-to-test-react-components-in-typescript

const queryClient = new QueryClient();

describe('<Home />', () => {
  test('should display a blank Home page', async () => {});
  function renderLogin(props: Partial<Props> = {}) {
    const defaultProps: Props = {
      onDataFetch() {
        return;
      },
    };
    
    return render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/login']}>
            <Home {...defaultProps} {...props} />
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>
    );
  }

  test('should render a login component, with the header reading "Login to your account!"', async () => {
    const { findByTestId } = renderLogin();
    const header = await findByTestId('login-header');

    expect(header).toHaveTextContent('Login to your account!');
  });

  // test('should not render a login component, with the header reading "Signup!"', async () => {
  //   const { findByTestId } = renderLogin();
  //   const header = await findByTestId('login-header');

  //   expect(header).not.toHaveTextContent('Signup!');
  // });

  // test('should display a blank login form, with the header reading "Signup!"', async () => {
  //   const { findByTestId } = renderLogin({ isNew: true });
  //   const header = await findByTestId('login-header');

  //   expect(header).toHaveTextContent('Signup!');
  // });

  // test('should fetch data on the home page', async () => {
  //   const onDataFetch = jest.fn();
  //   const { findByTestId } = renderLogin({ onDataFetch });
  //   const email = await findByTestId('email');

  //   fireEvent.change(email, { target: { value: 'test@gmail.com' } });

  //   expect(onDataFetch).toHaveBeenCalledWith('test@gmail.com');
  //   expect(onDataFetch).to('test@gmail.com');
  // });

  // test('should login by submitting the form with email and password', async () => {
  //   const onSubmit = jest.fn();
  //   const { findByTestId } = renderLogin({
  //     onSubmit,
  //   });
  //   const email = await findByTestId('email');
  //   const password = await findByTestId('password');
  //   const submit = await findByTestId('submit');

  //   fireEvent.change(email, { target: { value: 'bob@gmail.com' } });
  //   fireEvent.change(password, { target: { value: '1234' } });
  //   fireEvent.click(submit);

  //   expect(onSubmit).toHaveBeenCalledWith('bob@gmail.com', '', '1234', 'customer');
  // });

  // test('should signup by submitting the form with email, username, password, and role', async () => {
  //   const onSubmit = jest.fn();
  //   const { findByTestId } = renderLogin({
  //     onSubmit,
  //     isNew: true,
  //   });
  //   const email = await findByTestId('email');
  //   const username = await findByTestId('username');
  //   const password = await findByTestId('password');
  //   const role = await findByTestId('role');
  //   const submit = await findByTestId('submit');

  //   fireEvent.change(email, { target: { value: 'bob@gmail.com' } });
  //   fireEvent.change(password, { target: { value: '1234' } });
  //   fireEvent.change(username, { target: { value: 'Bob' } });
  //   fireEvent.change(role, { target: { value: 'chef' } });
  //   fireEvent.click(submit);

  //   expect(onSubmit).toHaveBeenCalledWith('bob@gmail.com', 'Bob', '1234', 'chef');
  // });
});
