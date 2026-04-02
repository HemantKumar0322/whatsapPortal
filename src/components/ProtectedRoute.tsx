import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { ProtectedRouteProps } from '../interface/interface';
import { isAuthenticated } from '../services/service';

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {

  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 