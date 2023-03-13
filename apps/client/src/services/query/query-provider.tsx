import { QueryClientProvider as Provider } from '@tanstack/react-query';
import React, { PropsWithChildren } from 'react';

import { queryClient } from './client';

export const QueryProvider = ({ children, ...props }: PropsWithChildren<object>) => (
  <Provider {...props} client={queryClient}>
    {children}
  </Provider>
);
