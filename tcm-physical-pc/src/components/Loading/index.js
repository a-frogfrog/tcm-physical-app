import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/70 backdrop-blur-sm">
      {/* 加载容器 */}
      <div className="relative">
        {/* 圆形加载动画 */}
        <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        
        {/* 装饰圆点 */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full animate-ping opacity-75"></div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full"></div>
        
        {/* 加载文本 */}
        <p className="mt-4 text-white text-center text-shadow">加载中...</p>
      </div>
    </div>
  );
};

export default Loading;
