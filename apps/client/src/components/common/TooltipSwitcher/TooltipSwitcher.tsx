import { Tooltip, TooltipProps } from '@astral/ui';
import { PropsWithChildren } from 'react';

export interface TooltipSwitcherProps extends TooltipProps {
  isActive: boolean;
}

export const TooltipSwitcher = ({
  isActive,
  children,
  ...props
}: PropsWithChildren<TooltipSwitcherProps>) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  isActive ? <Tooltip {...props}>{children}</Tooltip> : children;
