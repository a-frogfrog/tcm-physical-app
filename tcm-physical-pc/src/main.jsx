// src/main.jsx（React 18+ 标准写法）
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './router/routes'; // 之前写的路由配置
import './index.css'; // 若有全局样式，确保引入

// 找到 index.html 中 id 为 root 的容器，挂载应用
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
);
