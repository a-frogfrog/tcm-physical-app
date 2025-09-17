import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from '../pages/login';
import HomePage from '../pages/home';
import MainLayout from '../pages/layout';
import AppointmentPage from '../pages/appointment';
import OrderPage from '../pages/order';
import SchedulePage from '../pages/schedule';
import CustomerPage from '../pages/customer';

// 私有路由组件，需要登录才能访问
const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('userInfo');

  if (!isAuthenticated) {
    // 未登录则重定向到登录页
    return <Navigate to='/login' replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* 登录页 */}
        <Route path='/login' element={<LoginPage />} />

        {/* 首页 */}
        <Route
          path='/home'
          element={
            <PrivateRoute>
              <MainLayout>
                <HomePage />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* 预约页 */}
        <Route
          path='/appointment'
          element={
            <PrivateRoute>
              <MainLayout>
                <AppointmentPage />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* 订单页 */}
        <Route
          path='/order'
          element={
            <PrivateRoute>
              <MainLayout>
                <OrderPage />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* 排班页 */}
        <Route
          path='/schedule'
          element={
            <PrivateRoute>
              <MainLayout>
                <SchedulePage />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* 客户页 */}
        <Route
          path='/customer'
          element={
            <PrivateRoute>
              <MainLayout>
                <CustomerPage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        {/* 根路径重定向到登录页或主页 */}
        <Route
          path='/'
          element={
            <Navigate
              to={localStorage.getItem('userInfo') ? '/home' : '/login'}
              replace
            />
          }
        />

        {/* 404页面 */}
        <Route path='*' element={<Navigate to='/home' replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
