import { Sidebar } from '@components/common/Sidebar';
import { Header } from '@components/Header';
import { Layout } from '@components/Layout';
import { Outlet } from 'react-router-dom';

export const CommonLayout = () => {
  return (
    <Layout>
      <Layout.header>
        <Header />
      </Layout.header>
      <Layout.wrapper>
        <Layout.sidebar>
          <Sidebar />
        </Layout.sidebar>
        <Layout.content>
          <Outlet />
        </Layout.content>
      </Layout.wrapper>
    </Layout>
  );
};
