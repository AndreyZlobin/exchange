import { Layout } from '@components/Layout';
import { PageLoader } from '@components/ui/PageLoader';
import { Box } from '@mui/material';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => (
  <Layout>
    <Layout.content>
      <Box sx={{ width: '100vw', height: '90vh' }}>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </Box>
    </Layout.content>
  </Layout>
);
