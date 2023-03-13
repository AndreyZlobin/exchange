import { styled } from '@astral/ui';

export const PageRightWrapper = styled.section`
  width: 321px;
  padding: ${({ theme }) => theme.spacing(0, 6, 0, 4)};

  overflow-y: auto;
  max-height: 100%;

  & > *:first-of-type {
    padding-top: ${({ theme }) => theme.spacing(6)};
  }
`;
