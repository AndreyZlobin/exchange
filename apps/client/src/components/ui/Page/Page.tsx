import { PropsWithChildren } from 'react';

import { DoubleSideContainer, PageContent, PageLeft, PageRight } from './components';
import { PageContainer, SecondStretchedPageContainer } from './styles';

type PageProps = {
  isSecondElementStretched?: boolean;
};

const Page = ({ isSecondElementStretched, ...props }: PropsWithChildren<PageProps>) =>
  isSecondElementStretched ? (
    <SecondStretchedPageContainer {...props} />
  ) : (
    <PageContainer {...props} />
  );

Page.content = PageContent;
Page.right = PageRight;
Page.left = PageLeft;
Page.doubleSideContainer = DoubleSideContainer;

export { Page };
