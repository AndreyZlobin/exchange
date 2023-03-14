import { ToggleArrow } from '@components/common/ToggleArrow';
import { TooltipSwitcher } from '@components/common/TooltipSwitcher';
import { MenuItemProps } from '@components/ui/Menu/MenuProp';
import { Collapse } from '@mui/material';
import { useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { MenuItemWrapper, MenuLink, MenuLinkIcon, MenuLinkLeft } from './styles';

export const MenuItem = ({ menuItem, isOpen, indent }: MenuItemProps) => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  /*
   * Расчет отступа в зависимости от глубины вложенности элемента навигации
   * */
  const indentMargin = !isOpen ? 0 : (indent || 1) * 4;

  const active =
    (pathname.endsWith(menuItem.path) && !menuItem.children?.length) ||
    Boolean(menuItem.children?.some((item) => pathname.endsWith(item.path)) && !collapsed);

  useLayoutEffect(() => {
    if (active) {
      setCollapsed(true);
    }
  }, []);

  const handlerToggleCollapse = () => {
    setCollapsed((prevCollapse) => !prevCollapse);
  };

  return (
    <>
      <TooltipSwitcher
        isActive={!isOpen}
        title={menuItem.title}
        disableInteractive
        placement="top-start"
      >
        <MenuItemWrapper onClick={handlerToggleCollapse}>
          <MenuLink active={active} isOpen={isOpen} to={menuItem.path}>
            <MenuLinkLeft>
              {menuItem.icon && <MenuLinkIcon indent={indentMargin}>{menuItem.icon}</MenuLinkIcon>}
              {isOpen && menuItem.title}
            </MenuLinkLeft>
            {isOpen && menuItem?.children?.length && (
              <ToggleArrow collapsed={collapsed} onClick={handlerToggleCollapse} />
            )}
          </MenuLink>
        </MenuItemWrapper>
      </TooltipSwitcher>
      {menuItem.children && menuItem.children?.length > 0 && (
        <Collapse in={collapsed}>
          {menuItem.children?.map((child) => (
            <MenuItem indent={indent + 1} isOpen={isOpen} menuItem={child} key={child.id} />
          ))}
        </Collapse>
      )}
    </>
  );
};
