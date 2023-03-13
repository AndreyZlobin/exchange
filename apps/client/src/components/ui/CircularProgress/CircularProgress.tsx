import { CircularProgressProps as CircularProgressPropsUI } from '@astral/ui';

import { CircularProgressWrapper } from './styles';

export type CircularProgressProps = Omit<CircularProgressPropsUI, 'ref'> & {
  sideGap?: number;
};

export const CircularProgress = (props: CircularProgressProps) => (
  <CircularProgressWrapper color="primary" size="medium" {...props} />
);
