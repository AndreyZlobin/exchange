import { PropsWithChildren } from 'react';

import { DoubleSideContainerWrapper } from './styles';

export const DoubleSideContainer = ({ children }: PropsWithChildren<object>) => (
  <DoubleSideContainerWrapper>{children}</DoubleSideContainerWrapper>
);
