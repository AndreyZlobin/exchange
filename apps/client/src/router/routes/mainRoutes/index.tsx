import { CommonLayout } from '@components/CommonLayout';
import { USER_ROUTES } from '@modules/Users/router';
import { Home } from '@src/pages/Home';
import { createRoute } from '@utils/router/createRoute';
import { Navigate } from 'react-router-dom';

export const mainRoutes = createRoute('main', {
  path: '/',
  element: <CommonLayout />,
  children: [
    createRoute('root', {
      index: true,
      element: <Navigate to={'/orders'} replace />,
    }),
    createRoute('order', {
      path: 'orders',
      element: <Home />,
    }),
    USER_ROUTES,
  ],
});
