import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, Badge, Input } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.css'; // 引入自定义 CSS 文件

const { Header, Sider, Content } = Layout;
const { Search } = Input;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 获取当前用户信息
  useEffect(() => {
    const info = localStorage.getItem('userInfo');
    if (info) {
      setUserInfo(JSON.parse(info));
    } else {
      // 如果未登录，跳转到登录页
      navigate('/login');
    }
  }, [navigate]);

  // 处理退出登录
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  // 用户菜单
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  // 侧边栏菜单
  const sideMenuItems = [
    {
      key: '/home',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: '/appointment',
      icon: <BellOutlined />,
      label: '预约',
    },
    {
      key: '/diagnosis',
      icon: <UserOutlined />,
      label: '接诊',
    },
    {
      key: '/order',
      icon: <UserOutlined />,
      label: '订单',
    },
    {
      key: '/schedule',
      icon: <UserOutlined />,
      label: '排班',
    },
    {
      key: '/customer',
      icon: <UserOutlined />,
      label: '客户',
    },
    {
      key: '/system',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
    {
      key: '/help',
      icon: <UserOutlined />,
      label: '帮助中心',
    },
  ];

  // 处理菜单点击
  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  if (!userInfo) {
    return null; // 未加载完用户信息时不渲染
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: '#fff', borderRight: '1px solid #e8e8e8' }}
      >
        <div className="logo">
          <h1 style={{ color: '#8B5A2B', fontSize: '18px', fontWeight: 'bold', margin: 0 }}>御和堂</h1>
          <p style={{ fontSize: '12px', color: '#888', margin: '4px 0 0 0' }}>中医馆收银管理系统</p>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={sideMenuItems.map(item => ({
            ...item,
            key: item.key,
            icon: item.icon,
            label: item.label,
            className: location.pathname === item.key ? 'menu-item-selected' : '',
          }))}
          onClick={handleMenuClick}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: '0 24px',
            background: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #e8e8e8'
          }}
        >
          {/* 头部左侧标题区域 */}
          <div className="header-title">
            {sideMenuItems.find(item => item.key === location.pathname)?.label || '首页'}
          </div>

          {/* 头部右侧操作区 */}
          <div className="header-actions">
            <Search
              placeholder="搜索..."
            />
            <Badge count={3}>
              <BellOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
            </Badge>
            <Dropdown
              menu={{
                items: userMenuItems.map(item => ({
                  key: item.key,
                  icon: item.icon,
                  label: item.label,
                  onClick: item.onClick,
                }))
              }}
              placement="bottomRight"
            >
              <div className="user-dropdown-trigger">
                <Avatar icon={<UserOutlined />} />
                <span>{userInfo.username}</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ 
          margin: '24px 16px', 
          padding: 24, 
          background: '#fff', 
          minHeight: 280, 
          borderRadius: '4px', 
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' 
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
