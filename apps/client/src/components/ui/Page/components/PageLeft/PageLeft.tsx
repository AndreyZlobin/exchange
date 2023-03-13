import { PropsWithChildren } from 'react';

import { PageLeftWrapper } from './styles';

export const PageLeft = ({ children }: PropsWithChildren<object>) => (
  <PageLeftWrapper>{children}</PageLeftWrapper>
);
