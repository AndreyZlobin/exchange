import { PropsWithChildren } from 'react';

import { LayoutContent, LayoutHeader, LayoutSidebar, LayoutWrapper } from './Components';
import { LayoutStyled } from './styles';

const Layout = ({ children }: PropsWithChildren<object>) => <LayoutStyled>{children}</LayoutStyled>;

Layout.header = LayoutHeader;
Layout.sidebar = LayoutSidebar;
Layout.wrapper = LayoutWrapper;
Layout.content = LayoutContent;

export { Layout };
