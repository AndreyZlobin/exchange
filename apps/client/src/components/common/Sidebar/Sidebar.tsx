import { SidebarMenu } from '@components/common/Sidebar/SidebarMenu';
import { SidebarToggler } from '@components/common/Sidebar/SidebarToggler';
import { storageService } from '@services/storage';
import React, { useLayoutEffect, useState } from 'react';

import { SidebarWrapper } from './styles';
export enum StorageItems {
  MENU_COLLAPSED = 'collapsed',
}
const { MENU_COLLAPSED } = StorageItems;

export const Sidebar = () => {
  const [isOpen, toggleSidebar] = useState(true);

  useLayoutEffect(() => {
    const collapsedValue = storageService.getItemSync(MENU_COLLAPSED);

    if (collapsedValue !== null) {
      toggleSidebar(JSON.parse(collapsedValue));
    }
  }, []);

  const handlerToggleSidebar = () => {
    toggleSidebar((prev) => {
      storageService.setItemSync(MENU_COLLAPSED, JSON.stringify(!prev));

      return !prev;
    });
  };

  return (
    <SidebarWrapper isOpen={isOpen}>
      <div>
        <SidebarMenu isOpen={isOpen} />
      </div>
      <SidebarToggler toggleHandler={handlerToggleSidebar} isOpen={isOpen} />
    </SidebarWrapper>
  );
};
