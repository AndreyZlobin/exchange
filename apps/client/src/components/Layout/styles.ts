import { Grid, styled } from '@astral/ui';

export const LayoutStyled = styled.div``;

export const LayoutHeaderStyled = styled.div``;

export const LayoutSidebarStyled = styled.div``;

export const LayoutWrapperStyled = styled(Grid)`
  height: calc(100vh - var(--header-height));

  overflow: hidden;
`;

export const LayoutContentStyled = styled.main`
  position: relative;

  overflow-y: auto;
`;
