import { PropsWithChildren } from 'react';

import { ActionsStackWrapper } from './styles';

type ActionsStackProps = {
  gap?: number;
};

export const ActionsStack = (props: PropsWithChildren<ActionsStackProps>) => (
  <ActionsStackWrapper {...props} />
);
