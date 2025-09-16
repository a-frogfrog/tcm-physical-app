import { Outlet } from 'react-router-dom';
import TabBar from './components/TabBar';
import { tabs } from './constants';
export default function Layout() {
  return (
    <>
      <header>
        <h1 className='p-2 px-4 font-sans text-xl font-bold text-[#008236]'>
          御合堂
        </h1>
      </header>
      <main className='scroll-bar-hide h-[calc(100vh-80px)] overflow-auto'>
        <Outlet />
      </main>
      <footer className='fixed -bottom-1 left-0 right-0 py-2'>
        <AppTabBar />
      </footer>
    </>
  );
}

const AppTabBar = () => {
  return <TabBar tabs={tabs} />;
};
