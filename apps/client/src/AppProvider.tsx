import { ThemeProvider } from '@astral/ui';
import { ErrorBoundary } from '@components/ErrorFallback/Boundary';
import { QueryProvider } from '@services/query';
import { PropsWithChildren } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { theme } from './config/theme';
export const AppProvider = ({ children }: PropsWithChildren<object>) => {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <QueryProvider>
          <Router>{children}</Router>
        </QueryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
