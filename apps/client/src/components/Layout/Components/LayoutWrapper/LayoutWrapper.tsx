import { PropsWithChildren } from 'react';

import { LayoutWrapperStyled } from '../../styles';

export const LayoutWrapper = ({ children }: PropsWithChildren<object>) => (
  <LayoutWrapperStyled container templateColumns="auto 1fr">
    {children}
  </LayoutWrapperStyled>
);
