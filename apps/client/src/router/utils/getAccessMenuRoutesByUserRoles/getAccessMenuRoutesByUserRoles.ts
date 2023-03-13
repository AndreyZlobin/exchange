import { ReactNode } from 'react';
import { ForbiddenRoutes } from 'src/router/roles/constants';
import { Role } from 'src/router/roles/types';

import { checkIsRouteAllowed } from '../checkIsRouteAllowed';
export interface NavItem {
  icon?: ReactNode;
  id: string;
  title: string;
  path: string;
  name: string;
  children?: NavItem[];
}
export const getAccessMenuRoutesByUserRoles = (
  menu: NavItem[],
  roles: readonly Role[],
  forbiddenRoutes: ForbiddenRoutes,
): NavItem[] => {
  return menu.reduce((acc, item) => {
    const isAllowed = checkIsRouteAllowed(forbiddenRoutes, roles, item.name);

    if (!isAllowed) {
      return acc;
    }

    const children = item.children?.length
      ? getAccessMenuRoutesByUserRoles(item.children, roles, forbiddenRoutes)
      : undefined;

    const accessMenuItem = { ...item, children };

    return [...acc, accessMenuItem];
  }, [] as NavItem[]);
};
