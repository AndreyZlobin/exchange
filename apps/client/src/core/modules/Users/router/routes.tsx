import { createRoute } from '@utils/router/createRoute';
import { lazy } from 'react';

import { USERS_ROUTES_NAMES, USERS_ROUTES_PATHS } from './constants';

const { usersBasePath } = USERS_ROUTES_PATHS;

const UsersPage = lazy(() => import('@modules/Users/pages/Users'));

export const USER_ROUTES = createRoute(USERS_ROUTES_NAMES.users, {
  path: usersBasePath,
  index: true,
  element: <UsersPage />,
});
