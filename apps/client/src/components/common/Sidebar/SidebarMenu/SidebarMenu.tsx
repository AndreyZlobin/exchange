import { Menu } from '@components/ui/Menu';
import { FORBIDDEN_ROUTES } from '@src/router/roles/constants';
import { getAccessMenuRoutesByUserRoles } from '@src/router/utils/getAccessMenuRoutesByUserRoles';

import { MENU } from './SideBarMenuItems';

type SidebarMenuProps = {
  isOpen: boolean;
};

export const SidebarMenu = ({ isOpen }: SidebarMenuProps) => {
  const privateMenuItems = getAccessMenuRoutesByUserRoles(MENU, [], FORBIDDEN_ROUTES);

  return <Menu menu={privateMenuItems} isOpen={isOpen} />;
};
