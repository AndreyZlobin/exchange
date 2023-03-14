import { AUTH_ROUTES } from '@modules/Auth/router';
import { RouteData } from '@utils/router/createRoute';
import { useMemo } from 'react';
import { useRoutes } from 'react-router-dom';

import { ForbiddenRoutes } from '../../roles/constants';
import { Role } from '../../roles/types';
import { mainRoutes, notFoundRoutes } from '../../routes';
import { createProtectedRoutes } from '../../utils/createProtectedRoutes';

export const useRouts = (
  forbiddenRoutes: ForbiddenRoutes,
  isAuthorized: boolean,
  currentUserRoles: readonly Role[],
) => {
  const routes: RouteData[] = useMemo(
    () => [mainRoutes, AUTH_ROUTES(isAuthorized), notFoundRoutes],
    [],
  );

  const protectedRoutes = useMemo(
    () => createProtectedRoutes(routes, forbiddenRoutes, true, currentUserRoles),
    [currentUserRoles, forbiddenRoutes, isAuthorized, routes],
  );

  return useRoutes(protectedRoutes);
};
