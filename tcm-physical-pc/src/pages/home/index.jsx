import React from 'react';
import { Card, Statistic, Row, Col, Table, List, Badge, Button } from 'antd';
import { 
  UserAddOutlined, 
  CalendarOutlined, 
  ShoppingCartOutlined, 
  DollarOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './index.css';

const HomePage = () => {
  const navigate = useNavigate();
  
  // 统计数据
  const statistics = [
    {
      title: '今日预约',
      value: 18,
      icon: <CalendarOutlined />,
      color: '#8B5A2B',
      trend: '+2 较昨日'
    },
    {
      title: '今日接诊',
      value: 12,
      icon: <UserAddOutlined />,
      color: '#1890ff',
      trend: '+1 较昨日'
    },
    {
      title: '今日订单',
      value: 35,
      icon: <ShoppingCartOutlined />,
      color: '#52c41a',
      trend: '+5 较昨日'
    },
    {
      title: '今日收入',
      value: '¥12,580',
      icon: <DollarOutlined />,
      color: '#fa8c16',
      trend: '+12% 较昨日'
    }
  ];
  
  // 近期预约数据
  const recentAppointments = [
    {
      id: 'A1001',
      customer: '张三',
      doctor: '李医生',
      time: '09:30',
      status: '已确认'
    },
    {
      id: 'A1002',
      customer: '李四',
      doctor: '王医生',
      time: '10:15',
      status: '已确认'
    },
    {
      id: 'A1003',
      customer: '王五',
      doctor: '张医生',
      time: '14:00',
      status: '待确认'
    },
    {
      id: 'A1004',
      customer: '赵六',
      doctor: '李医生',
      time: '15:30',
      status: '已确认'
    }
  ];
  
  // 近期订单数据
  const recentOrders = [
    {
      key: '1',
      orderNo: 'O20230512001',
      customer: '张三',
      amount: '¥380.00',
      time: '09:45',
      status: '已支付'
    },
    {
      key: '2',
      orderNo: 'O20230512002',
      customer: '李四',
      amount: '¥560.00',
      time: '10:30',
      status: '已支付'
    },
    {
      key: '3',
      orderNo: 'O20230512003',
      customer: '王五',
      amount: '¥128.00',
      time: '11:15',
      status: '已支付'
    },
    {
      key: '4',
      orderNo: 'O20230512004',
      customer: '赵六',
      amount: '¥890.00',
      time: '14:20',
      status: '待支付'
    }
  ];
  
  // 订单表格列定义
  const orderColumns = [
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '客户',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <span className="order-amount">{amount}</span>
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === '已支付' ? 'success' : 'processing'} 
          text={status} 
        />
      )
    }
  ];

  return (
    <div className="home-container">
      <h2 className="page-title">首页</h2>
      
      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="stats-row">
        {statistics.map((stat, index) => (
          <Col xs={12} sm={6} key={index}>
            <Card className="stat-card">
              <Statistic
                title={stat.title}
                value={stat.value}
                precision={0}
                valueStyle={{ color: stat.color }}
                prefix={stat.icon}
                suffix={
                  <span className="stat-trend">
                    {stat.trend}
                  </span>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
      
      {/* 近期预约和订单 */}
      <Row gutter={[16, 16]} className="content-row">
        <Col xs={24} md={12}>
          <Card className="content-card" title="近期预约">
            <div className="card-header-actions">
              <Button 
                type="link" 
                onClick={() => navigate('/appointment')}
                className="view-all-link"
              >
                查看全部
              </Button>
            </div>
            <List
              dataSource={recentAppointments}
              renderItem={item => (
                <List.Item className="appointment-item">
                  <List.Item.Meta
                    title={
                      <div className="appointment-title">
                        <span className="appointment-id">{item.id}</span>
                        <Badge 
                          status={item.status === '已确认' ? 'success' : 'processing'} 
                          text={item.status} 
                          className="appointment-status"
                        />
                      </div>
                    }
                    description={
                      <div className="appointment-details">
                        <p>客户：{item.customer}</p>
                        <p>医生：{item.doctor}</p>
                        <p>时间：{item.time}</p>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        
        <Col xs={24} md={12}>
          <Card className="content-card" title="近期订单">
            <div className="card-header-actions">
              <Button 
                type="link" 
                onClick={() => navigate('/order')}
                className="view-all-link"
              >
                查看全部
              </Button>
            </div>
            <Table 
              columns={orderColumns} 
              dataSource={recentOrders} 
              pagination={false} 
              rowKey="orderNo"
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
