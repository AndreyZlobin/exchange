import { Button, Placeholder, Typography } from '@astral/ui';
import { ActionsStack } from '@components/ui/ActionsStack';
import { Page } from '@components/ui/Page';
import { useNavigate } from 'react-router-dom';

import ForbiddenIcon from '../Forbidden.svg?url';
export const Forbidden = () => {
  const navigate = useNavigate();
  const handleToMainPage = () => navigate('/', { replace: true });
  const handleBack = () => navigate(-1);

  return (
    <Page>
      <Page.content>
        <Placeholder
          title="Доступ запрещен"
          description={<Typography>Недостаточно прав для просмотра данной страницы</Typography>}
          imgSrc={ForbiddenIcon}
          imgAlt="Доступ запрещен"
          Actions={
            <ActionsStack>
              <Button onClick={handleBack}>Назад</Button>
              <Button onClick={handleToMainPage}>На главную</Button>
            </ActionsStack>
          }
        />
      </Page.content>
    </Page>
  );
};
