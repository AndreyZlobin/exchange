import { BaseButtonProps, IconButton, Tooltip } from '@astral/ui';
import { debounce } from '@utils/debounce';
import { MouseEvent, ReactNode } from 'react';

import { CircularProgress } from '../CircularProgress';

export interface ActionButtonProps extends BaseButtonProps {
  tooltipContent?: NonNullable<ReactNode>;
  icon?: JSX.Element;
  disableInteractiveInTooltip?: boolean;
  isLoading?: boolean;
  delay?: number;
}

const DEFAULT_DELAY = 200;

export const ActionButton = ({
  tooltipContent,
  icon,
  isLoading,
  disabled,
  disableInteractiveInTooltip = true,
  onClick,
  delay = DEFAULT_DELAY,
  ...props
}: ActionButtonProps) => {
  const handleClick = debounce((event: MouseEvent<HTMLButtonElement>) => onClick?.(event), delay);

  return (
    <Tooltip
      title={(!disabled && tooltipContent) || ''}
      disableInteractive={disableInteractiveInTooltip}
    >
      <IconButton
        color="primary"
        variant="text"
        {...props}
        disabled={disabled}
        onClick={handleClick}
      >
        {isLoading ? <CircularProgress size="small" /> : icon}
      </IconButton>
    </Tooltip>
  );
};
