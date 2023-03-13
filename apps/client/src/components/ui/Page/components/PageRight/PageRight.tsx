import { PropsWithChildren } from 'react';

import { PageRightWrapper } from './styles';

export const PageRight = ({ children }: PropsWithChildren<object>) => (
  <PageRightWrapper>{children}</PageRightWrapper>
);
