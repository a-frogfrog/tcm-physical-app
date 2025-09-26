import { Outlet } from 'react-router-dom';

import TabBar from './components/TabBar';

import { tabs } from './constants';

import { useApplication } from '#/hooks';

export default function Layout() {
  return (
    <div className='scroll-bar-hide v h-[calc(100vh-50px)] overflow-auto'>
      <main role='main' aria-label='Main content'>
        <Outlet />
      </main>
      <footer className=''>
        <AppFooter />
        <AppTabBar />
      </footer>
    </div>
  );
}

const AppTabBar = () => {
  return <TabBar tabs={tabs} />;
};

const AppFooter = () => {
  const { name } = useApplication();
  return (
    <div className='mt-8 bg-blue-50 py-4'>
      <div className='container mx-auto px-4 text-center text-sm text-gray-600'>
        <p>
          © {new Date().getFullYear()} {name}. 保留所有权利
        </p>
        <p className='mt-1'>客服电话：400-123-4567</p>
      </div>
    </div>
  );
};
