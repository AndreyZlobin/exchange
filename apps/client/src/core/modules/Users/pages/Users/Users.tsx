import { Page } from '@components/ui/Page';
import { UsersTable } from '@modules/Users/components/UsersTable/UsersTable';

export const Users = () => {
  return (
    <Page isSecondElementStretched>
      <Page.header title="Список пользователей" />
      <Page.content withTableContent>
        <UsersTable />
      </Page.content>
    </Page>
  );
};
