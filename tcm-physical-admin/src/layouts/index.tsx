import { SidebarProvider } from '#/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import AppSidebar from './sidebar';
import Header from './Header';

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='flex-1'>
        <Header />
        <div className='px-4 py-2 h-screen overflow-auto bg-[#F9F6F0]'>
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
