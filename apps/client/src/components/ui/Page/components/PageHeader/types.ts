import { BoxProps } from '@mui/material';
import { ReactNode } from 'react';

export interface PageHeaderProps extends BoxProps {
  children?: ReactNode;
  actions?: ReactNode;
  title?: string;
  backTo?: string;
  withSeparator?: boolean;
}
