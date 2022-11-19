import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
// import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css';

const queryClient = new QueryClient();

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Order from './pages/Order';
import NoPage from './pages/NoPage';
import ErrorPage from './pages/ErrorPage';
import Manage from './pages/Manage';
// import { Switch } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login isAdmin={false} />} />
            <Route path="order" element={<Order />} />
            <Route path="error" element={<ErrorPage />} />
            <Route path="/login/redirect" element={<Navigate to="/admin/login" />} />
            <Route path="admin/login" element={<Login isAdmin={true} />} />
            <Route path="/admin/login/redirect" element={<Navigate to="/admin/manage" />} />
            <Route path="admin/manage" element={<Manage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

const app = createRoot(document.getElementById('app') as Element);
app.render(<App />);
