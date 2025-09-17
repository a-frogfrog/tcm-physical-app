import { SidebarProvider } from '#/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import AppSidebar, { AppSidebarError } from './sidebar';
import AppHeader from './Header';
import { GridBackground } from '#/components/common';
import {
  LayoutFooter,
  LayoutHeader,
  LayoutMain,
  LayoutProvider,
  Layout,
} from './Layout';
import { FOOTER } from '#/constants';

const AppMain = () => {
  return (
    <div className='transition-discrete h-full p-4 transition-all duration-300'>
      <Outlet />
    </div>
  );
};

const AppFooter = () => {
  return <>{FOOTER.copyright}</>;
};

export default function AppLayout() {
  return (
    <LayoutProvider>
      <SidebarProvider>
        <AppSidebarError>
          <AppSidebar className='shadow-md' />
        </AppSidebarError>
        <Layout className='relative z-10'>
          <LayoutHeader>
            <AppHeader />
          </LayoutHeader>
          <LayoutMain>
            <AppMain />
          </LayoutMain>
          <LayoutFooter>
            <AppFooter />
          </LayoutFooter>
        </Layout>
        <GridBackground className='fixed inset-0 z-0' />
      </SidebarProvider>
    </LayoutProvider>
  );
}
