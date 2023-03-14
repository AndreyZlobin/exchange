import { RouterView } from '@components/common/RouterView';
import { NotificationContainer } from '@components/ui/NotificationContainer';

export const App = () => {
  return (
    <>
      <NotificationContainer />
      <RouterView />
    </>
  );
};
