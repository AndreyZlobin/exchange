import { styled } from '@astral/ui';
import { MenuProps } from '@components/ui/Menu/MenuProp';

export const SidebarWrapper = styled.div<Pick<MenuProps, 'isOpen'>>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: ${({ isOpen }) => (isOpen ? '240px' : '56px')};
  height: 100%;
  padding: ${({ isOpen, theme }) => (isOpen ? theme.spacing(4, 5, 4, 4) : theme.spacing(4, 2))};

  background-color: ${({ theme }) => theme.palette.background.element};
  border-right: 1px solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: 0 0 0 10px;

  transition: ${({ theme }) =>
    theme.transitions.create(['width'], {
      easing: theme.transitions.easing.easeOut,
    })};
`;
