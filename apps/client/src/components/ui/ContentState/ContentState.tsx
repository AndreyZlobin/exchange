import { ErrorBoundary } from '@components/ErrorFallback/Boundary';
import { Box } from '@mui/material';
import { Children, memo, PropsWithChildren, ReactNode, useMemo } from 'react';

import { CircularProgress } from '../CircularProgress';

export interface ContentViewerProps {
  isLoading: boolean;
  loadingContent?: ReactNode;
  noData?: ReactNode;
  isError?: boolean;
  errorContent?: ReactNode;
}

const ContentState = memo(
  ({
    isLoading,
    noData,
    loadingContent,
    children,
    isError,
    errorContent = 'Что-то сломалось',
  }: PropsWithChildren<ContentViewerProps>) => {
    const isNoData = !Boolean(Children.count(children));

    const Wrapper = ({ children: wrapperChildren }: PropsWithChildren<object>) => {
      return (
        <Box display="flex" alignItems="center" justifyContent="center" height="100%" width="100%">
          {wrapperChildren}
        </Box>
      );
    };

    const Content = useMemo(() => {
      if (isLoading) {
        return (
          <Wrapper>{loadingContent ? loadingContent : <CircularProgress value={200} />}</Wrapper>
        );
      }

      if (!isLoading && isError && errorContent) {
        return <Wrapper>{errorContent || null}</Wrapper>;
      }

      if (!isLoading && isNoData && noData) {
        return <Wrapper>{noData}</Wrapper>;
      }

      if (!isLoading && !isNoData && !isError) {
        return children;
      }

      return null;
    }, [children, errorContent, isError, isLoading, isNoData, loadingContent, noData]);

    return <ErrorBoundary>{Content}</ErrorBoundary>;
  },
);

ContentState.displayName = 'ContentViewer';

export { ContentState };
