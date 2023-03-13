import { Button, Placeholder, Typography } from '@astral/ui';
import { ActionsStack } from '@components/ui/ActionsStack';
import { Page } from '@components/ui/Page';

import ForbiddenIcon from '../Forbidden.svg?url';

export const Unauthorized = () => {
  return (
    <Page>
      <Page.content>
        <Placeholder
          title="Ошибка авторизации"
          description={
            <>
              <Typography>Не удалось распознать пользователя в системе</Typography>
            </>
          }
          imgSrc={ForbiddenIcon}
          imgAlt="Доступ запрещен"
          Actions={
            <ActionsStack>
              {/*<Button onClick={handleLogout}>Выход</Button>*/}
              <Button onClick={() => {}}>Обновить страницу</Button>
            </ActionsStack>
          }
        />
      </Page.content>
    </Page>
  );
};
