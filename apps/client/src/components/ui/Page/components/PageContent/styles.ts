import { styled } from '@astral/ui';

import { PageContentProps } from '../index';

export const GeneralWrapper = styled.div<PageContentProps>`
  flex: 1;
  padding: ${({ theme, withoutPadding }) => (withoutPadding ? 0 : theme.spacing(0, 6, 6, 6))};
  overflow-y: auto;
`;
