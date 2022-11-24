import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layout from './pages/Header';
import Home from './pages/Home/Home';
import Login from './pages/Login';
import Order from './pages/Order';
import NoPage from './pages/NoPage';
import ErrorPage from './pages/ErrorPage';
import Manage from './pages/Manage/Manage';
import { store } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login isNew={false} />} />
              <Route path="signup" element={<Login isNew />} />
              <Route path="order" element={<Order />} />
              <Route path="error" element={<ErrorPage />} />
              <Route path="/login/redirect" element={<Navigate to="/admin/login" />} />
              <Route path="/login/redirect2" element={<Navigate to="/signup" />} />
              <Route path="admin/login" element={<Login isNew={false} />} />
              <Route path="/admin/login/redirect" element={<Navigate to="/admin/manage" />} />
              <Route path="admin/manage" element={<Manage />} />
              <Route path="/*" element={<NoPage />} />
            </Route>
          </Routes>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

const app = createRoot(document.getElementById('app') as Element);
app.render(<App />);
