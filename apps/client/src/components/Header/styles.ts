import { styled } from '@astral/ui';

export const HeaderWrapper = styled.header`
  position: relative;
  z-index: 10;

  width: 100%;

  background: ${({ theme }) => theme.palette.background.default};
  box-shadow: ${({ theme }) => theme.elevation[200]};
`;

export const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  height: var(--header-height);
  padding: ${({ theme }) => theme.spacing(2, 4)};
`;

export const HeaderRightWrapper = styled.div`
  display: flex;
`;
