import { PropsWithChildren } from 'react';

import { GeneralWrapper } from './styles';

export interface PageContentProps {
  withoutPadding?: boolean;
  withTableContent?: boolean;
}

const PageContent = ({
  withTableContent,
  children,
  withoutPadding,
}: PropsWithChildren<PageContentProps>) =>
  withTableContent ? (
    <>{children}</>
  ) : (
    <GeneralWrapper withoutPadding={withoutPadding}>{children}</GeneralWrapper>
  );

export { PageContent };
