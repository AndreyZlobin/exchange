import { PropsWithChildren } from 'react';

import { LayoutHeaderStyled } from '../../styles';

export const LayoutHeader = ({ children }: PropsWithChildren<object>) => (
  <LayoutHeaderStyled>{children}</LayoutHeaderStyled>
);
