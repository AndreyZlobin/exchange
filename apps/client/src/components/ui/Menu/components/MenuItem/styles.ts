import { styled } from '@astral/ui';
import { ArrowIcon } from '@components/common/Icons';
import { NavLink } from 'react-router-dom';

export const MenuItemWrapper = styled.div`
  position: relative;
`;

export const MenuLinkLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MenuLinkIcon = styled.div<{ indent: number }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  min-width: 24px;
  margin-right: ${({ indent, theme }) => theme.spacing(indent)};
`;

export const MenuLinkArrow = styled(ArrowIcon, {
  shouldForwardProp: (prop) => prop !== 'collapsed',
})<{ collapsed: boolean }>`
  transform: rotate(${({ collapsed }) => (collapsed ? '180deg' : '0deg')});
  cursor: pointer;

  transition: all 0.25s linear;
`;

export const MenuLink = styled(NavLink, {
  shouldForwardProp: (prop) => prop !== 'isOpen' && prop !== 'active',
})<{
  isOpen: boolean;
  active: boolean;
}>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 40px;
  padding: ${({ theme }) => theme.spacing(2)};

  overflow: hidden;

  color: ${({ theme }) => theme.palette.grey[900]};
  white-space: nowrap;
  text-decoration: none;
  text-overflow: ellipsis;

  border-radius: 4px;

  cursor: pointer;

  transition: all 0.25s linear;

  &:hover {
    color: ${({ theme }) => theme.palette.primary[800]};

    background: ${({ theme }) => theme.palette.grey[100]};

    svg {
      fill: ${({ theme }) => theme.palette.primary[800]};
    }
  }

  &.active {
    color: ${({ theme, active }) => active && theme.palette.primary[800]};

    background: ${({ theme, active }) => active && theme.palette.grey[100]};

    svg {
      fill: ${({ theme, active }) => active && theme.palette.primary[800]};
    }
  }
`;
