import { Outlet } from 'react-router-dom';
import TabBar from './components/TabBar';
import { tabs } from './constants';
import { useApplication } from '#/hooks';

export default function Layout() {
  const { name } = useApplication();
  return (
    <>
      <header>
        <h1 className='p-2 px-4 font-sans text-xl font-bold text-[#008236]'>
          {name}
        </h1>
      </header>
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
