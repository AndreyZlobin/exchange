import { ContentState } from '@components/ui/ContentState';
import { PageLoader } from '@components/ui/PageLoader';
import { Suspense } from 'react';

import { useRouts } from '../../../router';
import { FORBIDDEN_ROUTES } from '../../../router/roles/constants';

export const RouterView = () => {
  const Routes = useRouts(FORBIDDEN_ROUTES, true, []);

  return (
    <ContentState isLoading={false}>
      <Suspense fallback={<PageLoader />}>{Routes}</Suspense>
    </ContentState>
  );
};
