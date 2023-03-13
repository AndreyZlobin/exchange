import { RouteData } from '@utils/router/createRoute';
import { RouteObject } from 'react-router-dom';

import { ProtectedRoute } from '../../components/ProtectedRoute';
import { ForbiddenRoutes } from '../../roles/constants';
import { Role } from '../../roles/types';
import { checkIsRouteAllowed } from '../checkIsRouteAllowed';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const createProtectedRoutes = (
  routes: RouteData[],
  forbiddenRoutes: ForbiddenRoutes,
  isAuthorized: boolean,
  currentUserRoles: readonly Role[],
) => {
  return routes.reduce((acc, { name, ...item }) => {
    const isAllowed = checkIsRouteAllowed(forbiddenRoutes, currentUserRoles, name);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const children = item.children?.length
      ? createProtectedRoutes(item.children, forbiddenRoutes, isAuthorized, currentUserRoles)
      : undefined;

    const privateRoute: RouteObject = {
      ...item,
      path: item.path,
      element: (
        <ProtectedRoute isAuthorized={isAuthorized} isAllowed={isAllowed}>
          {item.element}
        </ProtectedRoute>
      ),
      children,
    };

    return [...acc, privateRoute];
  }, [] as RouteObject[]);
};
