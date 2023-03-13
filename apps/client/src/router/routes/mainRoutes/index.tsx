import { createRoute } from '@utils/router/createRoute';
import { Outlet } from 'react-router-dom';

import { Home } from '../../../pages/Home';

export const mainRoutes = createRoute('main', {
  path: '/',
  element: <Outlet />,
  children: [
    createRoute('root', {
      index: true,
      element: <Home />,
    }),
  ],
});
