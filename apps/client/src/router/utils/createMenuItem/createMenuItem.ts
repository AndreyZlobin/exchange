import { uuid } from '@utils/string';

import { NavItem } from '../getAccessMenuRoutesByUserRoles';

export const createMenuItem = (params: Omit<NavItem, 'id'>) => ({
  ...params,
  id: uuid(),
});
