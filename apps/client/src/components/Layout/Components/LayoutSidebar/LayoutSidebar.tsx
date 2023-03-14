import { PropsWithChildren } from 'react';

import { LayoutSidebarStyled } from '../../styles';

export const LayoutSidebar = ({ children }: PropsWithChildren<object>) => (
  <LayoutSidebarStyled>{children}</LayoutSidebarStyled>
);
