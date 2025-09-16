import { Outlet } from 'react-router-dom';
import TabBar from './components/TabBar';
import { tabs } from './constants';
export default function Layout() {
  return (
    <>
      <header>
        <h1 className='p-2 text-xl'>TCM Physical Mobile</h1>
      </header>
      <main className='h-[calc(100vh-50px)]'>
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
