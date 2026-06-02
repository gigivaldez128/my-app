import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRoutesProps {
  /** Replace with your real auth check (context, store, cookie, etc.) */
  isAuthenticated: boolean;
  /** Where to redirect when not authenticated. Defaults to /login */
  redirectTo?: string;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
  isAuthenticated,
  redirectTo = '/login',
}) => {
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoutes;