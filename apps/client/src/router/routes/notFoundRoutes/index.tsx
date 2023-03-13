import { createRoute } from '@utils/router/createRoute';
import { lazy } from 'react';

const NotFoundPage = lazy(() => import('../../../pages/NotFound'));

export const notFoundRoutes = createRoute('not-found', {
  path: '*',
  element: <NotFoundPage />,
});
