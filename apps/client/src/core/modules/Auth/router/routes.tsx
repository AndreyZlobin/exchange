import { createRoute } from '@utils/router/createRoute';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import { AUTH_ROUTES_NAMES, AUTH_ROUTES_PATHS } from './constants';

const { authBasePath } = AUTH_ROUTES_PATHS;

const AuthLayout = lazy(() => import('@modules/Auth/components/AuthLayout'));
const AuthLogin = lazy(() => import('@modules/Auth/pages/AuthLogin'));

export const AUTH_ROUTES = (isLoggedIn: boolean) =>
  createRoute(AUTH_ROUTES_NAMES.auth, {
    path: authBasePath,
    element: <AuthLayout />,
    children: [
      createRoute(AUTH_ROUTES_NAMES.login, {
        index: true,
        element: <AuthLogin />,
      }),
    ],
  });
