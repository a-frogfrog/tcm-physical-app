// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
// 正确：默认导入App组件
import App from './App'; 
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App /> {/* 使用导入的App组件 */}
    </Provider>
  </React.StrictMode>
);