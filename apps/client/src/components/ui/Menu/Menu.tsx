import { MenuItem } from '@components/ui/Menu/components/MenuItem';
import { MenuProps } from '@components/ui/Menu/MenuProp';

export const Menu = ({ menu, isOpen }: MenuProps) => (
  <>
    {menu.map((menuItem) => (
      <MenuItem key={menuItem.id} menuItem={menuItem} isOpen={isOpen} indent={0} />
    ))}
  </>
);
