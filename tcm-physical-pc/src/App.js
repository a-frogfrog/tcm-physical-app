// src/App.js
import React from 'react';
import AppRoutes from './routes'; // 导入路由配置（根据你的实际代码调整）

// 定义App组件
function App() {
  return (
    <div className="App">
      {/* 你的应用内容，例如路由组件 */}
      <AppRoutes />
    </div>
  );
}

// 关键：添加默认导出
export default App;