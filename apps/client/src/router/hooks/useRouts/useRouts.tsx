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
  const routes: RouteData[] = useMemo(() => [mainRoutes, notFoundRoutes], []);

  const protectedRoutes = useMemo(
    () => createProtectedRoutes(routes, forbiddenRoutes, isAuthorized, currentUserRoles),
    [currentUserRoles, forbiddenRoutes, isAuthorized, routes],
  );

  return useRoutes(protectedRoutes);
};
