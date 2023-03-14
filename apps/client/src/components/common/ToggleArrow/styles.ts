import { styled } from '@astral/ui';
import { ArrowIcon } from '@components/common/Icons';

interface ToggleArrowProps {
  collapsed: boolean;
}

export const ToggleArrow = styled(ArrowIcon, {
  shouldForwardProp: (prop) => prop !== 'collapsed',
})<ToggleArrowProps>`
  width: 24px;

  height: 24px;

  transform: rotate(${({ collapsed }) => (collapsed ? '180deg' : '0deg')});
  cursor: pointer;

  transition: all 0.25s linear;
`;
