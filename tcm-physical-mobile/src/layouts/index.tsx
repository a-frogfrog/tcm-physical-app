import { Outlet } from 'react-router-dom';
import TabBar from './components/TabBar';
import { tabs } from './constants';

export default function Layout() {
  return (
    <>
      <main className='scroll-bar-hide h-[calc(100vh-80px)] overflow-auto'>
        <Outlet />
      </main>
      <footer className='fixed right-0 -bottom-1 left-0 py-2'>
        <AppTabBar />
      </footer>
    </>
  );
}

const AppTabBar = () => {
  return <TabBar tabs={tabs} />;
};
