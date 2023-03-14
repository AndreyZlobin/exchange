import { BackIcon } from '@components/common/Icons';
import { useNavigate } from 'react-router-dom';

import { PageHeaderActions, PageHeaderBackBtn, PageHeaderTitle, PageHeaderWrapper } from './styles';
import { PageHeaderProps } from './types';

const PageHeader = ({ title, backTo, actions }: PageHeaderProps) => {
  const navigate = useNavigate();

  const handlerBack = () => backTo && navigate(backTo);

  return (
    <PageHeaderWrapper>
      {backTo && (
        <PageHeaderBackBtn variant="light" onClick={handlerBack}>
          <BackIcon width={16} height={16} />
        </PageHeaderBackBtn>
      )}
      {title && <PageHeaderTitle variant="h3">{title}</PageHeaderTitle>}
      {actions && <PageHeaderActions>{actions}</PageHeaderActions>}
    </PageHeaderWrapper>
  );
};

export { PageHeader };
