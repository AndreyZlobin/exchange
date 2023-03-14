import { ContentState } from '@components/ui/ContentState';
import { PageLoader } from '@components/ui/PageLoader';
import { AuthContext } from '@modules/Auth/components/AuthContext';
import { useRouts } from '@src/router';
import { FORBIDDEN_ROUTES } from '@src/router/roles/constants';
import { Suspense, useContext } from 'react';

export const RouterView = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const Routes = useRouts(FORBIDDEN_ROUTES, isLoggedIn, []);

  return (
    <ContentState isLoading={false}>
      <Suspense fallback={<PageLoader />}>{Routes}</Suspense>
    </ContentState>
  );
};
