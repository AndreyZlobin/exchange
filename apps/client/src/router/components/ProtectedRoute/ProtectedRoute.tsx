import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

import { Forbidden } from '../../../pages/Forbidden';
import { Unauthorized } from '../../../pages/Unauthorized';

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
