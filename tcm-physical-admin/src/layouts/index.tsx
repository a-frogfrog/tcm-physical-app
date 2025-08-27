import { SidebarProvider } from '#/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import AppSidebar from './sidebar';
import AppHeader from './Header';

const AppMain = () => {
  return (
    <main className='flex-1 transition-all transition-discrete duration-300'>
      <AppHeader />
      <div className='px-4 py-2 h-screen overflow-auto bg-[#F9F6F0]'>
        <Outlet />
      </div>
    </main>
  );
};

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <AppMain />
    </SidebarProvider>
  );
}
