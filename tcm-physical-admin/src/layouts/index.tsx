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
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
