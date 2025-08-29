import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

// 中医馆CRM系统"御和堂"布局组件
const Layout = ({ children }) => {
  // 状态管理
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 监听滚动事件，用于导航栏样式变化
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 根据当前路径设置激活菜单
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('patients')) setActiveMenu('patients');
    else if (path.includes('appointments')) setActiveMenu('appointments');
    else if (path.includes('prescriptions')) setActiveMenu('prescriptions');
    else if (path.includes('inventory')) setActiveMenu('inventory');
    else if (path.includes('reports')) setActiveMenu('reports');
    else if (path.includes('settings')) setActiveMenu('settings');
    else setActiveMenu('dashboard');
  }, [location.pathname]);

  // 退出登录处理
  const handleLogout = () => {
    localStorage.removeItem('isLogin');
    navigate('/login');
  };

  // 侧边菜单数据 - 御和堂中医馆特色功能
  const menuItems = [
    {
      key: 'dashboard',
      icon: 'fa-tachometer',
      label: '主页',
      path: '/',
      description: '实时监控馆内运营数据'
    },
    {
      key: 'patients',
      icon: 'fa-users',
      label: '患者管理',
      path: '/patients',
      description: '患者档案与诊疗记录'
    },
    {
      key: 'appointments',
      icon: 'fa-calendar',
      label: '预约排班',
      path: '/appointments',
      description: '医师出诊与患者预约'
    },
    {
      key: 'prescriptions',
      icon: 'fa-file-text-o',
      label: '处方管理',
      path: '/prescriptions',
      description: '中药处方与配药记录'
    },
    {
      key: 'diagnosis',
      icon: 'fa-stethoscope',
      label: '辨证论治',
      path: '/diagnosis',
      description: '四诊记录与诊断分析'
    },
    {
      key: 'inventory',
      icon: 'fa-cubes',
      label: '药材库存',
      path: '/inventory',
      description: '中药药材库存管理'
    },
    {
      key: 'reports',
      icon: 'fa-bar-chart',
      label: '运营报表',
      path: '/reports',
      description: '经营分析与统计报表'
    },
    {
      key: 'settings',
      icon: 'fa-cog',
      label: '系统设置',
      path: '/settings',
      description: '馆内信息与系统配置'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* 侧边栏 - 御和堂中医风格设计 */}
      <aside 
        className={`bg-[#8B4513] text-white transition-all duration-300 ease-in-out z-30 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* 系统Logo区域 - 御和堂 */}
        <div className="p-4 border-b border-[#A0522D] flex items-center justify-between">
          <div className={`flex items-center space-x-2 ${!isSidebarOpen && 'justify-center w-full'}`}>
            <i className="fa fa-leaf text-2xl text-[#F0E68C]"></i>
            {isSidebarOpen && <h1 className="text-xl font-bold">御和堂</h1>}
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`text-white hover:text-[#F0E68C] transition-colors ${!isSidebarOpen && 'hidden'}`}
          >
            <i className="fa fa-angle-double-left"></i>
          </button>
        </div>

        {/* 侧边菜单 */}
        <nav className="py-4">
          <ul>
            {menuItems.map((item) => (
              <li key={item.key}>
                <Link 
                  to={item.path}
                  className={`flex items-center p-4 cursor-pointer transition-all ${
                    activeMenu === item.key 
                      ? 'bg-[#A0522D] text-[#F0E68C]' 
                      : 'hover:bg-[#A0522D]/50'
                  }`}
                  onClick={() => setActiveMenu(item.key)}
                >
                  <i className={`fa ${item.icon} text-xl ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`}></i>
                  
                  {isSidebarOpen && (
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-[#F5DEB3]/70">{item.description}</div>
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 侧边栏收起按钮（小屏状态） */}
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-16 bg-[#8B4513] p-1 rounded-full border border-[#A0522D] text-white hover:text-[#F0E68C]"
          >
            <i className="fa fa-angle-double-right"></i>
          </button>
        )}
      </aside>

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航栏 */}
        <header 
          className={`bg-white shadow-md z-20 transition-all duration-300 ${
            isScrolled ? 'py-2' : 'py-3'
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* 左侧：标题和面包屑 */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {menuItems.find(item => item.key === activeMenu)?.label || '御和堂系统'}
                </h2>
                <div className="text-xs text-gray-500">
                  首页 / {menuItems.find(item => item.key === activeMenu)?.label}
                </div>
              </div>

              {/* 右侧：功能区和用户信息 */}
              <div className="flex items-center space-x-4">
                {/* 搜索框 - 御和堂业务适配 */}
                <div className="relative hidden md:block">
                  <input
                    type="text"
                    placeholder="搜索患者、处方..."
                    className="pl-8 pr-3 py-1.5 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#8B4513] focus:border-[#8B4513]"
                  />
                  <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>

                {/* 通知按钮 */}
                <button className="relative p-2 text-gray-600 hover:text-[#8B4513] transition-colors">
                  <i className="fa fa-bell-o"></i>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* 帮助按钮 */}
                <button className="p-2 text-gray-600 hover:text-[#8B4513] transition-colors">
                  <i className="fa fa-question-circle-o"></i>
                </button>

                {/* 用户信息和退出 */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 focus:outline-none">
                    <img 
                      src="https://picsum.photos/id/64/40/40" 
                      alt="用户头像" 
                      className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    />
                    <span className="text-sm font-medium text-gray-700 hidden md:inline-block">王医师</span>
                    <i className="fa fa-angle-down text-gray-500"></i>
                  </button>
                  
                  {/* 下拉菜单 */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <i className="fa fa-user-o mr-2"></i>个人资料
                    </a>
                    <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <i className="fa fa-cog mr-2"></i>账号设置
                    </a>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <i className="fa fa-sign-out mr-2"></i>退出登录
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 页面内容区域 */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {/* 御和堂中医馆特色装饰元素 */}
          <div className="absolute top-20 right-10 w-32 h-32 bg-[#F0E68C]/20 rounded-full blur-2xl -z-10"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#8B4513]/10 rounded-full blur-2xl -z-10"></div>
          
          {/* 子页面内容 */}
          {children}
        </main>

        {/* 页脚 - 御和堂品牌信息 */}
        <footer className="bg-white border-t border-gray-200 py-3 px-4">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <div>© 2025 御和堂中医馆CRM系统 - 传承中医文化，智能管理医馆</div>
            <div className="mt-2 md:mt-0">版本 v1.0.0</div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;