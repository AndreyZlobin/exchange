import { styled } from '@astral/ui';

export const ActionsStackWrapper = styled.div<{ gap?: number }>`
  display: flex;
  align-items: center;

  & button:not(:last-child) {
    margin-right: ${({ theme, gap = 1 }) => theme.spacing(gap)};
  }
`;
