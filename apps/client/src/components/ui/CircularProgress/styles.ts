import { CircularProgress, styled } from '@astral/ui';

import { CircularProgressProps } from './CircularProgress';

export const CircularProgressWrapper = styled(CircularProgress, {
  shouldForwardProp: (name) => name !== 'sideGap',
})<CircularProgressProps>`
  * + &,
  & + * {
    margin-left: ${({ theme, sideGap }) => theme.spacing(sideGap || 0)};
  }
`;
