import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  shouldRedirect, 
  getRedirectTarget,
} from '../config/appConfig';

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Handle redirects
    const currentPath = location.pathname;
    
    if (shouldRedirect(currentPath)) {
      const redirectTarget = getRedirectTarget(currentPath);
      if (redirectTarget) {
        navigate(redirectTarget, { replace: true });
        return;
      }
    }
  }, [location.pathname, navigate]);

  return <>{children}</>;
};

export default AppWrapper; 