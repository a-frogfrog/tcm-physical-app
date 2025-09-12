import React from 'react';
import { Card, Statistic, Row, Col, List, Badge, Button } from 'antd';
import { 
  UserAddOutlined, 
  CalendarOutlined, 
  ShoppingCartOutlined, 
  DollarOutlined,
  MedicineBoxOutlined, 
  UserOutlined      
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
      doctor: '李医师', 
      time: '09:30',
      status: '已确认'
    },
    {
      id: 'A1002',
      customer: '李四',
      doctor: '王医师',
      time: '10:15',
      status: '已确认'
    },
    {
      id: 'A1003',
      customer: '王五',
      doctor: '张医师',
      time: '14:00',
      status: '待确认'
    },
    {
      id: 'A1004',
      customer: '赵六',
      doctor: '李医师',
      time: '15:30',
      status: '已确认'
    }
  ];
  
  // 中医理疗馆科室与医师空闲状况数据
  const departmentDoctorStatus = [
    {
      department: '推拿理疗科',
      doctors: [
        { name: '李医师', status: '空闲', availableTime: '10:00-12:00' },
        { name: '王医师', status: '忙碌', availableTime: '14:00-16:00' },
        { name: '张医师', status: '空闲', availableTime: '13:00-15:00' }
      ]
    },
    {
      department: '针灸科',
      doctors: [
        { name: '刘医师', status: '忙碌', availableTime: '15:30-17:30' },
        { name: '陈医师', status: '空闲', availableTime: '09:30-11:30' }
      ]
    },
    {
      department: '中药调理科',
      doctors: [
        { name: '孙医师', status: '空闲', availableTime: '10:30-12:30' },
        { name: '周医师', status: '空闲', availableTime: '14:30-16:30' }
      ]
    },
    {
      department: '艾灸养生科',
      doctors: [
        { name: '吴医师', status: '忙碌', availableTime: '16:00-18:00' },
        { name: '郑医师', status: '空闲', availableTime: '09:00-11:00' }
      ]
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
      
      {/* 近期预约和科室医师状况 */}
      <Row gutter={[16, 16]} className="content-row">
        {/* 近期预约模块 */}
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
                        <p>医师：{item.doctor}</p>
                        <p>时间：{item.time}</p>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        
        {/* 科室与医师空闲状况模块 */}
        <Col xs={24} md={12}>
          <Card className="content-card" title="科室与医师空闲状况">
            <div className="card-header-actions">
              <Button 
                type="link" 
                onClick={() => navigate('/department-doctor')}
                className="view-all-link"
              >
                查看全部
              </Button>
            </div>
            <List
              dataSource={departmentDoctorStatus}
              renderItem={department => (
                <List.Item className="department-item">
                  <List.Item.Meta
                    title={
                      <div className="department-header">
                        <span className="department-name">
                          <MedicineBoxOutlined size={16} />
                          {department.department}
                        </span>
                      </div>
                    }
                    description={
                      <div className="doctor-list">
                        {department.doctors.map((doctor, idx) => (
                          <div key={idx} className="doctor-item">
                            <span>
                              <UserOutlined size={14} style={{ marginRight: 4 }} />
                              {doctor.name}
                            </span>
                            <div>
                              <Badge 
                                status={doctor.status === '空闲' ? 'success' : 'processing'} 
                                text={doctor.status} 
                                style={{ marginRight: 8 }}
                              />
                              <span className="doctor-time">{doctor.availableTime}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;