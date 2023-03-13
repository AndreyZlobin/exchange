import { ReactNode } from 'react';

export interface ContentViewerProps {
  isLoading: boolean;
  loadingContent?: ReactNode;
  noData?: ReactNode;
  isError?: boolean;
  errorContent?: ReactNode;
}
