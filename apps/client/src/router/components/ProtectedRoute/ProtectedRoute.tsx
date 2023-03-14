import { Forbidden } from '@src/pages/Forbidden';
import { Unauthorized } from '@src/pages/Unauthorized';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  isAllowed: boolean;
  isAuthorized: boolean;
  redirectPath?: string;
}

export const ProtectedRoute = ({
  isAllowed,
  isAuthorized,
  children,
}: PropsWithChildren<ProtectedRouteProps>) => {
  if (!isAuthorized) {
    return <Unauthorized />;
  }

  if (!isAllowed) {
    return <Forbidden />;
  }

  return <>{children ? children : <Outlet />}</>;
};
