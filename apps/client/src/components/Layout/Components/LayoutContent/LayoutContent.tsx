import { PropsWithChildren } from 'react';

import { LayoutContentStyled } from '../../styles';

export const LayoutContent = ({ children }: PropsWithChildren<object>) => (
  <LayoutContentStyled>{children}</LayoutContentStyled>
);
