import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const Logout = () => {
  let location = useLocation();

  React.useEffect(() => {
    localStorage.removeItem('user');
    // dispatch(logout());
  }, []);

  return <Navigate to="/login" state={{ from: location }} replace />;
};
