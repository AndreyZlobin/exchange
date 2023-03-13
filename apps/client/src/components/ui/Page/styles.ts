import { styled } from '@astral/ui';

export const PageContainer = styled.section`
  --page-size: calc(100vh - var(--subpage-reduce, var(--header-height)));
  height: var(--page-size);
  max-height: var(--page-size);
`;

export const SecondStretchedPageContainer = styled(PageContainer)`
  display: grid;
  grid-template-rows: auto 1fr auto;
`;
