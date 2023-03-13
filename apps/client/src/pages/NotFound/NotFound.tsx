import { Button, Placeholder } from '@astral/ui';
import { ActionsStack } from '@components/ui/ActionsStack';
import { Page } from '@components/ui/Page';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Warning from '../Warning.svg';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleToMainPage = () => navigate('/', { replace: true });
  const handleBack = () => navigate(-1);

  return (
    <Page>
      <Page.content>
        <Placeholder
          title="404"
          description={<Typography variant="h2">Страница не найдена</Typography>}
          imgSrc={Warning}
          imgAlt="Страница не найдена"
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
