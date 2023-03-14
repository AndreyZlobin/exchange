import { styled } from '@astral/ui';

export const StyledSidebarToggler = styled.div`
  display: flex;
  align-items: center;

  padding: ${({ theme }) => theme.spacing(2)};

  cursor: pointer;
`;

export const StyledSidebarTogglerWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 24px;

  min-width: 24px;
`;
