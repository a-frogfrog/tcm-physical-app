import { SidebarProvider } from '#/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import AppSidebar from './sidebar';
import AppHeader from './Header';
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
    <div className=' h-full p-4 transition-all transition-discrete duration-300'>
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
        <AppSidebar />
        <Layout className='bg-[#F4F5FA]'>
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
      </SidebarProvider>
    </LayoutProvider>
  );
}
