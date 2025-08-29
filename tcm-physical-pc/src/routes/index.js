import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from '../pages/login';       // 登录页路径
import Home from '../pages/home';         // 首页路径
import Error from '../pages/error';       // 404页面路径
import Loading from '../components/Loading';  // 加载组件

// 路由切换加载效果
const LoadingRoute = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return isLoading ? <Loading /> : null;
};

// 受保护路由
const ProtectedRoute = ({ children }) => {
  const isLogin = localStorage.getItem('isLogin') === 'true';
  
  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AddRoutes = () => {
  return (
    <BrowserRouter>
      <LoadingRoute />
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/"  
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AddRoutes;
