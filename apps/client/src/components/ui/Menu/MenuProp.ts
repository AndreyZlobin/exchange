import { ReactNode } from 'react';

export interface NavItem {
  icon?: ReactNode;
  id: string;
  title: string;
  path: string;
  name: string;
  children?: NavItem[];
}

export interface MenuProps {
  menu: NavItem[];
  isOpen: boolean;
}

export interface MenuItemProps {
  menuItem: NavItem;
  isOpen: boolean;
  indent: number;
}
