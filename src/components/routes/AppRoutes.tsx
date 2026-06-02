import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '../layout/Layout';
import ProtectedRoutes from './ProtectedRoutes';
import {
  Home,
  About,
  Services,
  Contact,
  Login,
  Registration,
  Dashboard,
} from './LazyLoadingComponents';

/** Replace with your real auth state (context, Redux, etc.) */
const useAuth = () => {
  const token = localStorage.getItem('token');
  return { isAuthenticated: Boolean(token) };
};

const PageLoader: React.FC = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
    Loading…
  </div>
);

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public routes inside the shared Layout */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />

          {/* Protected routes — wrap additional pages here */}
          <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;