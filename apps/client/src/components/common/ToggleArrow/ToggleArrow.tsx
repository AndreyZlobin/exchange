import React, { VFC } from 'react';

import { ToggleArrow as StyledToggleArrow } from './styles';

export interface ToggleArrowProps {
  collapsed: boolean;
  onClick?: () => void;
}

export const ToggleArrow: VFC<ToggleArrowProps> = ({ collapsed, onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!onClick) {
      return;
    }

    e.stopPropagation();
    e.preventDefault();
    onClick();
  };

  return <StyledToggleArrow collapsed={collapsed} onClick={handleClick} />;
};
