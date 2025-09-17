import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown, Badge, message } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
  ScheduleOutlined,
  CustomerServiceOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.css';

const { Header, Content } = Layout;

const MainLayout = ({ children }) => {
  // 状态管理：用户信息、加载状态、全屏状态
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 初始化：验证登录状态+获取用户信息
  useEffect(() => {
    const initSystem = async () => {
      try {
        // 从localStorage读取用户信息
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
          setUserInfo(JSON.parse(storedUser));
        } else {
          // 未登录：跳转登录页并提示
          navigate('/login', { replace: true });
          message.warning('请先登录系统后操作');
        }
      } catch (error) {
        console.error('系统初始化失败:', error);
        message.error('初始化出错，请刷新页面重试');
      } finally {
        // 无论成功失败，都结束加载状态
        setIsLoading(false);
      }
    };

    initSystem();
  }, [navigate]);

  // 退出登录：清除缓存+跳转登录页
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login', { replace: true });
    message.success('退出登录成功，欢迎下次使用');
  };

  // 全屏切换逻辑
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      // 进入全屏
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
      } else if (docEl.mozRequestFullScreen) {
        docEl.mozRequestFullScreen();
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      } else if (docEl.msRequestFullscreen) {
        docEl.msRequestFullscreen();
      }
    } else {
      // 退出全屏
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  // 监听全屏变化（浏览器原生事件）
  useEffect(() => {
    const fullscreenChangeHandler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', fullscreenChangeHandler);
    document.addEventListener('mozfullscreenchange', fullscreenChangeHandler);
    document.addEventListener(
      'webkitfullscreenchange',
      fullscreenChangeHandler,
    );
    document.addEventListener('msfullscreenchange', fullscreenChangeHandler);

    return () => {
      document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
      document.removeEventListener(
        'mozfullscreenchange',
        fullscreenChangeHandler,
      );
      document.removeEventListener(
        'webkitfullscreenchange',
        fullscreenChangeHandler,
      );
      document.removeEventListener(
        'msfullscreenchange',
        fullscreenChangeHandler,
      );
    };
  }, []);

  // 用户下拉菜单配置（个人资料/设置/退出）
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '账号设置',
      onClick: () => navigate('/settings'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  // 顶部导航菜单配置（核心功能入口）
  const topNavItems = [
    { key: '/home', icon: <HomeOutlined />, label: '首页' },
    { key: '/appointment', icon: <CalendarOutlined />, label: '预约' },
    { key: '/diagnosis', icon: <FileTextOutlined />, label: '接诊' },
    { key: '/order', icon: <FileTextOutlined />, label: '订单' },
    { key: '/schedule', icon: <ScheduleOutlined />, label: '排班' },
    { key: '/customer', icon: <CustomerServiceOutlined />, label: '客户' },
  ];

  // 导航菜单点击：跳转对应页面
  const handleNavClick = (e) => {
    navigate(e.key);
  };

  // 加载中状态：显示加载动画
  if (isLoading) {
    return (
      <div className='loading-container'>
        <div className='loading-content'>
          <div className='spinner'></div>
          <p>系统加载中，请稍候...</p>
        </div>
      </div>
    );
  }

  // 未获取到用户信息（异常情况）：返回空页面
  if (!userInfo) {
    return null;
  }

  return (
    <Layout className='main-layout'>
      {/* 顶部导航栏：Logo + 居中导航 + 右侧操作区 */}
      <Header className='main-header'>
        {/* 左侧：Logo区域 */}
        <div className='header-left'>
          <div className='logo-container'>
            <div className='logo-text'>
              <h1>御和堂</h1>
              <p>中医馆收银管理系统</p>
            </div>
          </div>
        </div>

        {/* 中间：居中导航菜单 */}
        <Menu
          theme='light'
          mode='horizontal'
          selectedKeys={[location.pathname]} // 高亮当前页面导航
          items={topNavItems.map((item) => ({
            ...item,
            className: location.pathname === item.key ? 'nav-item-active' : '',
          }))}
          onClick={handleNavClick}
          className='top-navigation'
        />

        {/* 右侧：通知 + 全屏 + 用户下拉 */}
        <div className='header-right'>
          {/* 通知图标（带3条未读消息标记） */}
          <Badge count={3} size='small' className='notification-badge'>
            <BellOutlined className='notification-icon' />
          </Badge>

          {/* 全屏切换按钮 */}
          <div
            className='fullscreen-toggle'
            title={isFullscreen ? '退出全屏' : '进入全屏'}
            onClick={toggleFullscreen}>
            {isFullscreen ? (
              <FullscreenExitOutlined className='fullscreen-icon' />
            ) : (
              <FullscreenOutlined className='fullscreen-icon' />
            )}
          </div>

          {/* 用户下拉菜单 */}
          <Dropdown
            menu={{
              items: userMenuItems,
              trigger: ['hover'], // 鼠标hover触发下拉
            }}
            placement='bottomRight'
            arrow // 显示下拉箭头，提升交互体验
          >
            <div className='user-menu-trigger'>
              <Avatar className='user-avatar' icon={<UserOutlined />} />
              <span className='user-name'>{userInfo.username}</span>
            </div>
          </Dropdown>
        </div>
      </Header>

      {/* 主内容区域：承接子页面（如首页、订单页等） */}
      <Content className='main-content'>{children}</Content>
    </Layout>
  );
};

export default MainLayout;
