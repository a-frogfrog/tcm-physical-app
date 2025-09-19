import React, { useState, useEffect } from 'react';
import { 
  Card, Row, Col, List, Badge, Button, Modal, 
  Form, Input, Select, InputNumber, Space, message, 
  DatePicker, TimePicker, Table, Tag, Statistic 
} from 'antd';
import {
  UserOutlined,
  PlusOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
  UserAddOutlined,
  BarChartOutlined,
  HomeOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import './index.css';

const { TextArea } = Input;
const { Option } = Select;

// 工具函数：格式化moment对象为datetime-local格式
const formatMomentToDatetimeLocal = (momentObj) => {
  return momentObj && moment.isMoment(momentObj) ? momentObj.format('YYYY-MM-DDTHH:mm') : '';
};

const HomePage = () => {
  const navigate = useNavigate();
  const [orderForm] = Form.useForm();
  const [appointmentForm] = Form.useForm();
  const [memberForm] = Form.useForm();
  const [payModalVisible, setPayModalVisible] = useState(false);
  const [appointmentModalVisible, setAppointmentModalVisible] = useState(false);
  const [memberModalVisible, setMemberModalVisible] = useState(false);
  const [statsModalVisible, setStatsModalVisible] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [appointmentLoading, setAppointmentLoading] = useState(false);
  const [memberLoading, setMemberLoading] = useState(false);
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [doctorAvailableTimeRange, setDoctorAvailableTimeRange] = useState(null);

  // 房间状态数据 - 显示值班员工
  const [roomStatusList, setRoomStatusList] = useState([
    { id: 'RM001', name: '理疗1号房', type: '推拿专用', status: '占用', dutyStaff: '张三', endTime: '11:30' },
    { id: 'RM002', name: '理疗2号房', type: '针灸专用', status: '空闲', dutyStaff: '-', endTime: '-' },
    { id: 'RM003', name: '养生房', type: '艾灸/拔罐', status: '占用', dutyStaff: '李四', endTime: '14:15' },
    { id: 'RM004', name: '中药调理房', type: '中药理疗', status: '消毒中', dutyStaff: '-', endTime: '10:45' },
    { id: 'RM005', name: '康复训练房', type: '术后康复', status: '空闲', dutyStaff: '-', endTime: '-' }
  ]);

  // 今日预约数据
  const todayAppointments = [
    {
      id: 'APT001',
      customerName: '张先生',
      service: '推拿按摩',
      time: '10:00 - 11:00',
      room: '理疗1号房',
      doctor: '张三',
      status: '即将开始',
    },
    {
      id: 'APT002',
      customerName: '李女士',
      service: '艾灸疗法',
      time: '11:30 - 12:30',
      room: '养生房',
      doctor: '李四',
      status: '1小时后',
    },
    {
      id: 'APT003',
      customerName: '王先生',
      service: '针灸治疗',
      time: '13:00 - 14:00',
      room: '理疗2号房',
      doctor: '王五',
      status: '2小时后',
    },
    {
      id: 'APT004',
      customerName: '赵女士',
      service: '中药调理',
      time: '15:00 - 16:30',
      room: '中药调理房',
      doctor: '赵六',
      status: '5小时后',
    },
  ];

  // 配置选项
  const orderTypeOptions = [
    { label: '诊疗', value: 'treatment' },
    { label: '药材', value: 'medicine' },
    { label: '套餐', value: 'package' },
  ];

  const paymentMethodOptions = [
    { label: '微信支付', value: 'wechat', icon: <span>💳</span> },
    { label: '支付宝', value: 'alipay', icon: <span>🐜</span> },
    { label: '现金', value: 'cash', icon: <span>💵</span> },
    { label: '银行卡', value: 'card', icon: <span>🏦</span> },
  ];

  const memberLevelOptions = [
    { label: '普通会员', value: 'normal', discount: 0.95 },
    { label: '银卡会员', value: 'silver', discount: 0.9 },
    { label: '金卡会员', value: 'gold', discount: 0.85 },
    { label: '钻石会员', value: 'diamond', discount: 0.8 },
  ];

  const productOptions = [
    { id: 1, name: '针灸治疗', type: 'treatment', price: 80, unit: '次' },
    { id: 2, name: '推拿按摩', type: 'treatment', price: 60, unit: '次' },
    { id: 3, name: '中药调理', type: 'treatment', price: 120, unit: '疗程' },
    { id: 4, name: '当归', type: 'medicine', price: 1.5, unit: '克' },
    { id: 5, name: '黄芪', type: 'medicine', price: 2.0, unit: '克' },
    { id: 6, name: '人参', type: 'medicine', price: 5.0, unit: '克' },
    { id: 7, name: '感冒套餐', type: 'package', price: 200, unit: '套' },
    { id: 8, name: '养生套餐', type: 'package', price: 380, unit: '套' },
  ];

  const customerOptions = [
    { id: 1, name: '张三', phone: '13800138000', gender: '男', age: 35 },
    { id: 2, name: '李四', phone: '13900139000', gender: '女', age: 28 },
    { id: 3, name: '王五', phone: '13700137000', gender: '男', age: 42 },
    { id: 4, name: '赵六', phone: '13600136000', gender: '女', age: 55 },
  ];

  // 模拟统计数据
  const statsData = {
    totalRevenue: 12580,
    totalMembers: 238,
    todayAppointments: 18,
    todayRevenue: 1280,
    monthlyTrend: [
      { month: '1月', revenue: 9800 },
      { month: '2月', revenue: 10500 },
      { month: '3月', revenue: 12300 },
      { month: '4月', revenue: 11800 },
      { month: '5月', revenue: 13200 },
      { month: '6月', revenue: 12580 },
    ],
    serviceStats: [
      { service: '针灸治疗', count: 156, revenue: 12480 },
      { service: '推拿按摩', count: 215, revenue: 12900 },
      { service: '中药调理', count: 89, revenue: 10680 },
      { service: '感冒套餐', count: 45, revenue: 9000 },
      { service: '养生套餐', count: 32, revenue: 12160 },
    ]
  };

  // 初始化医生选项
  useEffect(() => {
    try {
      const baseDoctors = [
        { name: '李工', department: '推拿理疗科', status: '空闲', availableTime: '10:00-12:00' },
        { name: '王工', department: '推拿理疗科', status: '忙碌', availableTime: '14:00-16:00' },
        { name: '张工', department: '针灸科', status: '空闲', availableTime: '13:00-15:00' },
        { name: '刘工', department: '针灸科', status: '忙碌', availableTime: '15:30-17:30' },
        { name: '孙工', department: '中药调理科', status: '空闲', availableTime: '10:30-12:30' }
      ];

      const options = baseDoctors.map(doctor => ({
        label: `${doctor.name}（${doctor.department}）`,
        value: doctor.name,
        department: doctor.department,
        status: doctor.status,
        availableTime: doctor.availableTime,
        availableTimeRange: doctor.availableTime.split('-').map(time => moment(time, 'HH:mm'))
      }));
      setDoctorOptions(options);
    } catch (error) {
      console.error('医生选项初始化失败:', error);
      message.error('加载医生信息失败');
    }
  }, []);

  // 监听医生选择变化
  useEffect(() => {
    const selectedDoctor = appointmentForm.getFieldValue('doctorName');
    if (!selectedDoctor || doctorOptions.length === 0) return;

    const doctor = doctorOptions.find(d => d.value === selectedDoctor);
    if (doctor) {
      setDoctorAvailableTimeRange(doctor.availableTimeRange);
      appointmentForm.setFieldsValue({
        appointmentTime: doctor.availableTimeRange[0]
      });
    } else {
      setDoctorAvailableTimeRange(null);
    }
  }, [appointmentForm.getFieldValue('doctorName'), doctorOptions]);

  // 打开预约弹窗
  const openAppointmentModal = () => {
    try {
      if (doctorOptions.length === 0) {
        message.warning('医生数据加载中，请稍后再试');
        return;
      }
      
      const firstAvailableDoctor = doctorOptions.find(d => d.status === '空闲');
      appointmentForm.resetFields();
      appointmentForm.setFieldsValue({
        appointmentDate: moment(),
        doctorName: firstAvailableDoctor?.value || doctorOptions[0].value,
        appointmentTime: firstAvailableDoctor?.availableTimeRange[0] || moment('09:00', 'HH:mm'),
      });
      setAppointmentModalVisible(true);
    } catch (error) {
      console.error('打开预约弹窗失败:', error);
      message.error('打开预约窗口失败: ' + error.message);
    }
  };

  // 关闭预约弹窗
  const closeAppointmentModal = () => {
    setAppointmentModalVisible(false);
    appointmentForm.resetFields();
  };

  // 提交预约
  const handleSubmitAppointment = () => {
    if (appointmentLoading) return;
    
    appointmentForm.validateFields().then((values) => {
      setAppointmentLoading(true);
      
      try {
        const customer = customerOptions.find(c => c.id === values.customerId);
        const doctorInfo = doctorOptions.find(d => d.value === values.doctorName);
        
        if (!customer) throw new Error('未找到选中的客户');
        if (!doctorInfo) throw new Error('未找到选中的医生');
        if (!values.appointmentDate || !moment.isMoment(values.appointmentDate)) throw new Error('请选择有效预约日期');
        if (!values.appointmentTime || !moment.isMoment(values.appointmentTime)) throw new Error('请选择有效预约时间');
        
        // 校验医生是否空闲
        if (doctorInfo.status !== '空闲') {
          throw new Error(`医生${doctorInfo.label}当前忙碌，无法预约`);
        }
        
        // 校验预约时间是否在医生可预约时段内
        const appointmentMoment = moment(values.appointmentTime.format('HH:mm'), 'HH:mm');
        const [start, end] = doctorInfo.availableTimeRange || [];
        if (!start || !end || !(appointmentMoment.isBetween(start, end, null, '[]'))) {
          throw new Error(`医生可预约时段为${doctorInfo.availableTime}，请重新选择`);
        }
        
        const newAppointment = {
          id: `APT${moment().format('YYYYMMDD')}${Math.floor(Math.random() * 1000).toString().padStart(4, '0')}`,
          customerName: customer.name,
          customerPhone: customer.phone,
          doctorName: values.doctorName,
          department: doctorInfo.department,
          appointmentDate: values.appointmentDate.format('YYYY-MM-DD'),
          appointmentTime: values.appointmentTime.format('HH:mm'),
          reason: values.reason || '无',
          status: 'pending',
          createTime: moment().format('YYYY-MM-DD HH:mm:ss')
        };

        // 模拟API请求
        setTimeout(() => {
          message.success(`预约成功！编号：${newAppointment.id}`);
          setAppointmentModalVisible(false);
        }, 1000);
      } catch (error) {
        console.error('预约处理失败:', error);
        message.error('预约失败: ' + error.message);
      } finally {
        setAppointmentLoading(false);
      }
    }).catch((error) => {
      console.error('预约表单验证失败:', error);
      message.warning('请填写完整预约信息');
      setAppointmentLoading(false);
    });
  };

  // 订单相关功能
  const openPayModal = () => {
    setPayModalVisible(true);
    setOrderItems([]);
    orderForm.resetFields();
    orderForm.setFieldsValue({
      orderTime: moment(),
      orderType: 'treatment',
      paymentMethod: 'wechat',
      paymentTime: moment()
    });
  };

  const closePayModal = () => {
    setPayModalVisible(false);
    orderForm.resetFields();
    setOrderItems([]);
  };

  const addOrderItem = () => {
    if (!orderItems.some(item => !item.productId)) {
      setOrderItems([
        ...orderItems,
        {
          id: Date.now(),
          productId: null,
          productName: '',
          quantity: 1,
          price: 0,
          amount: 0,
          unit: ''
        },
      ]);
    } else {
      message.warning('请先完成当前空行的商品选择');
    }
  };

  const removeOrderItem = (id) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const handleProductChange = (id, productId) => {
    const product = productOptions.find(p => p.id === productId);
    if (product) {
      setOrderItems(
        orderItems.map(item => {
          if (item.id === id) {
            const newAmount = product.price * item.quantity;
            return {
              ...item,
              productId,
              productName: product.name,
              price: product.price,
              amount: newAmount,
              unit: product.unit
            };
          }
          return item;
        })
      );
    }
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity <= 0) return;
    setOrderItems(
      orderItems.map(item => {
        if (item.id === id) {
          const newAmount = item.price * quantity;
          return { ...item, quantity, amount: newAmount };
        }
        return item;
      })
    );
  };

  const calculateTotalAmount = () => {
    if (!orderItems || orderItems.length === 0) return '0.00';
    return orderItems.reduce((sum, item) => sum + (item.amount || 0), 0).toFixed(2);
  };

  const handleSubmitPayment = () => {
    if (orderItems.length === 0) {
      message.warning('请添加至少一个商品或服务');
      return;
    }
    if (orderItems.some(item => !item.productId)) {
      message.warning('请完成所有商品的选择');
      return;
    }

    orderForm.validateFields().then(values => {
      setOrderLoading(true);
      const customer = customerOptions.find(c => c.id === values.customerId);

      const newOrder = {
        id: `ORD${moment().format('YYYYMMDD')}${Math.floor(Math.random() * 1000).toString().padStart(4, '0')}`,
        customerName: customer?.name || '',
        customerPhone: customer?.phone || '',
        orderType: values.orderType,
        orderTime: values.orderTime.format('YYYY-MM-DD HH:mm:ss'),
        amount: parseFloat(calculateTotalAmount()),
        paymentMethod: values.paymentMethod,
        paymentTime: values.paymentTime.format('YYYY-MM-DD HH:mm:ss'),
        doctorName: values.doctorName || '未指定',
        remark: values.remark || '无',
        items: orderItems.map(item => ({
          productName: item.productName,
          quantity: item.quantity,
          unit: item.unit,
          price: item.price,
          amount: item.amount
        }))
      };

      setTimeout(() => {
        message.success(`支付成功！订单编号：${newOrder.id}`);
        setPayModalVisible(false);
        setOrderLoading(false);
      }, 1000);
    }).catch(error => {
      console.error('支付表单验证失败：', error);
      message.error('请完善表单必填项');
      setOrderLoading(false);
    });
  };

  // 会员注册功能
  const openMemberModal = () => {
    memberForm.resetFields();
    memberForm.setFieldsValue({
      joinDate: moment(),
      level: 'normal'
    });
    setMemberModalVisible(true);
  };

  const closeMemberModal = () => {
    setMemberModalVisible(false);
    memberForm.resetFields();
  };

  const handleSubmitMember = () => {
    if (memberLoading) return;
    
    memberForm.validateFields().then(values => {
      setMemberLoading(true);
      
      try {
        // 简单验证手机号格式
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!phoneRegex.test(values.phone)) {
          throw new Error('请输入有效的手机号码');
        }
        
        // 验证生日是否合理
        if (values.birthday && moment(values.birthday).isAfter(moment().subtract(18, 'years'))) {
          throw new Error('会员年龄需满18岁');
        }
        
        // 生成会员ID
        const memberId = `MEM${moment().format('YYYYMMDD')}${Math.floor(Math.random() * 1000).toString().padStart(4, '0')}`;
        
        // 模拟API请求
        setTimeout(() => {
          message.success(`会员注册成功！会员编号：${memberId}`);
          setMemberModalVisible(false);
        }, 1000);
      } catch (error) {
        console.error('会员注册失败:', error);
        message.error('注册失败: ' + error.message);
      } finally {
        setMemberLoading(false);
      }
    }).catch(error => {
      console.error('会员表单验证失败:', error);
      message.error('请完善表单必填项');
      setMemberLoading(false);
    });
  };

  // 数据统计功能
  const openStatsModal = () => {
    setStatsModalVisible(true);
  };

  const closeStatsModal = () => {
    setStatsModalVisible(false);
  };

  // 服务统计表格列定义
  const serviceStatsColumns = [
    {
      title: '服务项目',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: '次数',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '收入(元)',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (value) => `¥${value.toFixed(2)}`,
    },
    {
      title: '占比',
      dataIndex: 'revenue',
      key: 'percentage',
      render: (value) => {
        const total = statsData.serviceStats.reduce((sum, item) => sum + item.revenue, 0);
        const percentage = ((value / total) * 100).toFixed(1);
        return `${percentage}%`;
      },
    },
  ];

  // 月度趋势表格列定义
  const monthlyTrendColumns = [
    {
      title: '月份',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: '收入(元)',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (value) => `¥${value.toFixed(2)}`,
    },
    {
      title: '趋势',
      dataIndex: 'revenue',
      key: 'trend',
      render: (value, record, index) => {
        if (index === 0) return <Tag color="default">基准</Tag>;
        const prevValue = statsData.monthlyTrend[index - 1].revenue;
        const change = ((value - prevValue) / prevValue * 100).toFixed(1);
        if (change > 0) {
          return <Tag color="green">↑ {change}%</Tag>;
        } else if (change < 0) {
          return <Tag color="red">↓ {Math.abs(change)}%</Tag>;
        } else {
          return <Tag color="default">持平</Tag>;
        }
      },
    },
  ];

  // 四个功能按钮
  const actionButtons = [
    {
      title: '收银结算',
      value: <PlusOutlined />,
      color: '#8B5A2B',
      trend: '新订单结算',
      isButton: true,
      onClick: openPayModal
    },
    {
      title: '新增预约',
      value: <ClockCircleOutlined />,
      color: '#8B5A2B',
      trend: '点击添加新预约',
      isButton: true,
      onClick: openAppointmentModal
    },
    {
      title: '会员注册',
      value: <UserAddOutlined />,
      color: '#8B5A2B',
      trend: '新增会员信息',
      isButton: true,
      onClick: openMemberModal
    },
    {
      title: '数据统计',
      value: <BarChartOutlined />,
      color: '#8B5A2B',
      trend: '查看经营数据',
      isButton: true,
      onClick: openStatsModal
    }
  ];

  return (
    <div className='home-container' style={{ background: '#FCFAF6' }}>
      {/* 页面标题 */}
      <div className='page-header'>
        <h2 className='page-title'>工作台</h2>
      </div>

      {/* 四个功能按钮 - 增大间距，缩小尺寸，保持居中 */}
      <div className="stats-row" style={{ marginBottom: 24 }}>
        <div style={{ 
          display: 'flex', 
          gap: 20, // 按钮间距增大到20px
          flexWrap: 'wrap', 
          justifyContent: 'center',
          maxWidth: '900px', // 容器最大宽度缩小
          margin: '0 auto'
        }}>
          {actionButtons.map((button, index) => (
            <Card 
              key={index}
              className={`stat-card ${button.isButton ? 'stat-button-card' : ''}`}
              style={{ 
                flex: '0 0 calc(25% - 15px)', // 计算宽度时预留更大间距
                minWidth: 140, // 按钮最小宽度缩小
                maxWidth: 180, // 按钮最大宽度缩小
                margin: 0
              }}
            >
              <div className='stat-card-container'>
                <button 
                  className='stat-button' 
                  onClick={button.onClick}
                  type='button'
                  aria-label={button.title}
                >
                  <div className='stat-button-content'>
                    <div className='stat-button-icon' style={{ color: button.color }}>
                      {button.value}
                    </div>
                    <div className='stat-button-title'>{button.title}</div>
                    <div className='stat-button-trend'>{button.trend}</div>
                  </div>
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 内容区域：房间状态 + 今日预约提醒 - 并排布局 */}
      <div className="content-row" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {/* 房间状态列 - 占据约55%宽度 */}
        <div style={{ flex: 1.2, minWidth: 300 }}>
          <Card 
            className='content-card room-status-card updated-room-card' 
            title='房间状态'
          >
            <List
              dataSource={roomStatusList}
              renderItem={(item) => (
                <List.Item className='appointment-item room-item updated-room-item'>
                  <List.Item.Meta
                    title={
                      <div className='appointment-title room-title updated-room-title'>
                        <span className='appointment-id room-id'>
                          <HomeOutlined size={16} style={{ marginRight: 8, color: '#8B5A2B' }} />
                          {item.name}（{item.type}）
                        </span>
                        <Badge
                          status={
                            item.status === '空闲' ? 'success' : 
                            item.status === '占用' ? 'processing' : 
                            'warning'
                          }
                          text={item.status}
                          className='appointment-status room-status'
                        />
                      </div>
                    }
                    description={
                      <div className='appointment-details room-details updated-room-details'>
                        <div className='room-staff-row'>
                          <p className='room-staff-item'>
                            <UserOutlined size={14} style={{ marginRight: 4, color: '#8B5A2B' }} />
                            值班员工: {item.dutyStaff}
                          </p>
                        </div>
                        {item.status !== '空闲' && (
                          <p className='room-time-info'>
                            <ClockCircleOutlined size={14} style={{ marginRight: 4, color: '#8B5A2B' }} />
                            {item.status === '占用' ? '预计结束时间: ' : '预计可用时间: '}
                            {item.endTime}
                          </p>
                        )}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>

        {/* 今日预约提醒列 - 占据约45%宽度 */}
        <div style={{ flex: 1, minWidth: 300 }}>
          <Card 
            className='content-card updated-room-card' 
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarOutlined size={16} style={{ marginRight: 8, color: '#8B5A2B' }} />
                  今日预约提醒
                </div>
                <Badge 
                  count={todayAppointments.length} 
                  overflowCount={9} 
                  style={{ backgroundColor: '#8B5A2B' }}
                />
              </div>
            }
          >
            <List
              dataSource={todayAppointments}
              renderItem={(item) => (
                <List.Item className='appointment-item room-item updated-room-item'>
                  <List.Item.Meta
                    title={
                      <div className='appointment-title room-title updated-room-title'>
                        <span className='appointment-id room-id'>
                          {item.customerName} - {item.service}
                        </span>
                        <Badge
                          status={
                            item.status === '即将开始' ? 'processing' : 
                            item.status.includes('小时后') ? 'warning' : 
                            'default'
                          }
                          text={item.status}
                          className='appointment-status room-status'
                        />
                      </div>
                    }
                    description={
                      <div className='appointment-details room-details updated-room-details'>
                        <div className='room-staff-row'>
                          <p className='room-staff-item'>
                            <ClockCircleOutlined size={14} style={{ marginRight: 4, color: '#8B5A2B' }} />
                            时间: {item.time}
                          </p>
                          <p className='room-staff-item'>
                            <HomeOutlined size={14} style={{ marginRight: 4, color: '#8B5A2B' }} />
                            房间: {item.room}
                          </p>
                        </div>
                        <p className='room-staff-item'>
                          <UserOutlined size={14} style={{ marginRight: 4, color: '#8B5A2B' }} />
                          技师: {item.doctor}
                        </p>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
            <Button 
              type='primary' 
              block 
              style={{ 
                marginTop: 16, 
                backgroundColor: '#8B5A2B', 
                borderColor: '#8B5A2B'
              }}
              onClick={openAppointmentModal}
            >
              查看全部预约
            </Button>
          </Card>
        </div>
      </div>

      {/* 支付弹窗 */}
      <Modal
        title="新增支付"
        open={payModalVisible}
        onCancel={closePayModal}
        confirmLoading={orderLoading}
        width={800}
        destroyOnClose
        footer={[
          <Button key='back' onClick={closePayModal}>取消</Button>,
          <Button key='submit' type='primary' loading={orderLoading} onClick={handleSubmitPayment}>
            确认支付
          </Button>,
        ]}>
        <Form form={orderForm} layout='vertical' className='order-form home-order-form'>
          <Space style={{ width: '100%' }}>
            <Form.Item
              name='customerId'
              label='客户'
              rules={[{ required: true, message: '请选择客户' }]}
              style={{ flex: 1 }}>
              <Select placeholder='请选择客户'>
                {customerOptions.map((customer) => (
                  <Option key={customer.id} value={customer.id}>
                    {customer.name}（{customer.phone}）
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name='orderType'
              label='订单类型'
              rules={[{ required: true, message: '请选择订单类型' }]}
              style={{ flex: 1 }}>
              <Select placeholder='请选择订单类型'>
                {orderTypeOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Space>

          <Space style={{ width: '100%' }}>
            <Form.Item
              name='orderTime'
              label='下单时间'
              rules={[{ required: true, message: '请选择下单时间' }]}
              style={{ flex: 1 }}>
              <Input
                type="datetime-local"
                value={formatMomentToDatetimeLocal(orderForm.getFieldValue('orderTime'))}
                onChange={(e) => orderForm.setFieldsValue({
                  orderTime: e.target.value ? moment(e.target.value) : null
                })}
              />
            </Form.Item>

            <Form.Item name='doctorName' label='接待员工' style={{ flex: 1 }}>
              <Input placeholder='请输入员工姓名' />
            </Form.Item>
          </Space>

          <Form.Item name='remark' label='备注'>
            <TextArea rows={2} placeholder='请输入备注信息' />
          </Form.Item>

          <div className='order-items-title'>
            <h4>订单明细</h4>
            <Button
              type='dashed'
              icon={<PlusOutlined />}
              size='small'
              onClick={addOrderItem}>
              添加商品/服务
            </Button>
          </div>

          {orderItems.length > 0 ? (
            <div className='order-items-table'>
              {orderItems.map((item) => (
                <div key={item.id} className='order-item-row'>
                  <div className='order-item-cell'>
                    <Select
                      placeholder='请选择商品/服务'
                      style={{ width: '100%' }}
                      value={item.productId}
                      onChange={(value) => handleProductChange(item.id, value)}>
                      {productOptions
                        .filter(p => !orderForm.getFieldValue('orderType') || p.type === orderForm.getFieldValue('orderType'))
                        .map((product) => (
                          <Option key={product.id} value={product.id}>
                            {product.name} - ¥{product.price.toFixed(2)}/{product.unit}
                          </Option>
                        ))}
                    </Select>
                  </div>

                  <div className='order-item-cell'>
                    <InputNumber
                      min={1}
                      value={item.quantity}
                      onChange={(value) => handleQuantityChange(item.id, value)}
                      style={{ width: '100%' }}
                      placeholder="数量"
                    />
                  </div>

                  <div className='order-item-cell'>
                    <Input value={`¥${item.price.toFixed(2)}/${item.unit}`} disabled />
                  </div>

                  <div className='order-item-cell'>
                    <Input value={`¥${item.amount.toFixed(2)}`} disabled />
                  </div>

                  <div className='order-item-cell action-cell'>
                    <Button
                      type='text'
                      icon={<DeleteOutlined />}
                      size='small'
                      onClick={() => removeOrderItem(item.id)}
                      danger
                    />
                  </div>
                </div>
              ))}

              <div className='order-total-row'>
                <div className='total-label'>总计：</div>
                <div className='total-value'>¥{calculateTotalAmount()}</div>
              </div>
            </div>
          ) : (
            <div className='no-items-placeholder'>
              暂无订单明细，请点击"添加商品/服务"按钮
            </div>
          )}

          <Space style={{ width: '100%' }}>
            <Form.Item
              name='paymentMethod'
              label='支付方式'
              rules={[{ required: true, message: '请选择支付方式' }]}
              style={{ flex: 1 }}>
              <Select placeholder='请选择支付方式'>
                {paymentMethodOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {option.icon}
                      {option.label}
                    </span>
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name='paymentTime'
              label='支付时间'
              rules={[{ required: true, message: '请选择支付时间' }]}>
              <Input
                type="datetime-local"
                value={formatMomentToDatetimeLocal(orderForm.getFieldValue('paymentTime'))}
                onChange={(e) => orderForm.setFieldsValue({
                  paymentTime: e.target.value ? moment(e.target.value) : null
                })}
              />
            </Form.Item>
          </Space>
        </Form>
      </Modal>

      {/* 预约弹窗 */}
      <Modal
        title="新增预约"
        open={appointmentModalVisible}
        onCancel={closeAppointmentModal}
        confirmLoading={appointmentLoading}
        width={600}
        destroyOnClose
        footer={[
          <Button key='back' onClick={closeAppointmentModal}>取消</Button>,
          <Button
            key='submit'
            type='primary'
            loading={appointmentLoading}
            onClick={handleSubmitAppointment}
            disabled={doctorOptions.length === 0}>
            确认预约
          </Button>,
        ]}>
        <Form form={appointmentForm} layout='vertical' className='appointment-form home-appointment-form'>
          <Space style={{ width: '100%' }}>
            <Form.Item
              name='customerId'
              label='客户'
              rules={[{ required: true, message: '请选择客户' }]}
              style={{ flex: 1 }}>
              <Select placeholder='请选择客户'>
                {customerOptions.map((customer) => (
                  <Option key={customer.id} value={customer.id}>
                    {customer.name}（{customer.phone}）
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name='doctorName'
              label='接待员工'
              rules={[{ required: true, message: '请选择员工' }]}
              style={{ flex: 1 }}>
              <Select placeholder='请选择员工'>
                {doctorOptions.map((doctor) => (
                  <Option key={doctor.value} value={doctor.value}>
                    <Space>
                      {doctor.label}
                      <Badge status={doctor.status === '空闲' ? 'success' : 'error'} text={doctor.status} />
                    </Space>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Space>

          <Space style={{ width: '100%' }}>
            <Form.Item
              name='appointmentDate'
              label='预约日期'
              rules={[{ required: true, message: '请选择预约日期' }]}
              style={{ flex: 1 }}>
              <DatePicker 
                style={{ width: '100%' }}
                placeholder="选择日期"
                disabledDate={(current) => current && current < moment().startOf('day')}
              />
            </Form.Item>

            <Form.Item
              name='appointmentTime'
              label='预约时间'
              rules={[{ required: true, message: '请选择预约时间' }]}
              style={{ flex: 1 }}>
              <TimePicker 
                style={{ width: '100%' }}
                placeholder="选择时间"
                format="HH:mm"
                disabledTime={(current) => {
                  if (!doctorAvailableTimeRange) return {};
                  const [start, end] = doctorAvailableTimeRange;
                  return {
                    disabledHours: () => 
                      Array.from({ length: 24 }, (_, i) => i)
                        .filter(hour => hour < start.hour() || hour > end.hour()),
                    disabledMinutes: (hour) => {
                      if (hour === start.hour()) {
                        return Array.from({ length: 60 }, (_, i) => i).filter(min => min < start.minute());
                      }
                      if (hour === end.hour()) {
                        return Array.from({ length: 60 }, (_, i) => i).filter(min => min > end.minute());
                      }
                      return [];
                    }
                  };
                }}
              />
            </Form.Item>
          </Space>

          <Form.Item 
            name='reason' 
            label='预约原因'
            rules={[{ max: 200, message: '预约原因不能超过200字' }]}>
            <TextArea rows={3} placeholder='请输入预约原因或症状描述' />
          </Form.Item>
        </Form>
      </Modal>

      {/* 会员注册弹窗 */}
      <Modal
        title="会员注册"
        open={memberModalVisible}
        onCancel={closeMemberModal}
        confirmLoading={memberLoading}
        width={600}
        destroyOnClose
        footer={[
          <Button key='back' onClick={closeMemberModal}>取消</Button>,
          <Button
            key='submit'
            type='primary'
            loading={memberLoading}
            onClick={handleSubmitMember}>
            确认注册
          </Button>,
        ]}>
        <Form form={memberForm} layout='vertical' className='member-form home-appointment-form'>
          <Space style={{ width: '100%' }}>
            <Form.Item
              name='name'
              label='姓名'
              rules={[{ required: true, message: '请输入会员姓名' },
                      { max: 20, message: '姓名不能超过20个字符' }]}
              style={{ flex: 1 }}>
              <Input placeholder='请输入会员姓名' />
            </Form.Item>

            <Form.Item
              name='gender'
              label='性别'
              rules={[{ required: true, message: '请选择性别' }]}
              style={{ flex: 1 }}>
              <Select placeholder='请选择性别'>
                <Option value='male'>男</Option>
                <Option value='female'>女</Option>
              </Select>
            </Form.Item>
          </Space>

          <Space style={{ width: '100%' }}>
            <Form.Item
              name='phone'
              label='手机号码'
              rules={[{ required: true, message: '请输入手机号码' }]}
              style={{ flex: 1 }}>
              <Input placeholder='请输入手机号码' maxLength={11} />
            </Form.Item>

            <Form.Item
              name='birthday'
              label='出生日期'
              style={{ flex: 1 }}>
              <DatePicker 
                style={{ width: '100%' }}
                placeholder="选择出生日期"
                disabledDate={(current) => current && current > moment().subtract(18, 'years')}
              />
            </Form.Item>
          </Space>

          <Space style={{ width: '100%' }}>
            <Form.Item
              name='level'
              label='会员等级'
              rules={[{ required: true, message: '请选择会员等级' }]}
              style={{ flex: 1 }}>
              <Select placeholder='请选择会员等级'>
                {memberLevelOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label} (折扣: {option.discount * 10}折)
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name='joinDate'
              label='入会日期'
              rules={[{ required: true, message: '请选择入会日期' }]}
              style={{ flex: 1 }}>
              <DatePicker 
                style={{ width: '100%' }}
                placeholder="选择入会日期"
                disabledDate={(current) => current && current > moment().endOf('day')}
              />
            </Form.Item>
          </Space>

          <Form.Item 
            name='address' 
            label='联系地址'>
            <TextArea rows={2} placeholder='请输入联系地址' maxLength={100} />
          </Form.Item>

          <Form.Item 
            name='remark' 
            label='备注信息'>
            <TextArea rows={2} placeholder='请输入备注信息' maxLength={200} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 数据统计弹窗 */}
      <Modal
        title="经营数据统计"
        open={statsModalVisible}
        onCancel={closeStatsModal}
        width={900}
        destroyOnClose
        footer={[
          <Button key='close' onClick={closeStatsModal}>关闭</Button>
        ]}>
        <div className='stats-container'>
          {/* 关键指标统计 */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic
                  title="总营业额(元)"
                  value={statsData.totalRevenue}
                  precision={2}
                  valueStyle={{ color: '#8B5A2B' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic
                  title="会员总数(人)"
                  value={statsData.totalMembers}
                  valueStyle={{ color: '#8B5A2B' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic
                  title="今日预约(单)"
                  value={statsData.todayAppointments}
                  valueStyle={{ color: '#8B5A2B' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic
                  title="今日营业额(元)"
                  value={statsData.todayRevenue}
                  precision={2}
                  valueStyle={{ color: '#8B5A2B' }}
                />
              </Card>
            </Col>
          </Row>

          {/* 月度趋势表格 */}
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ marginBottom: 12, color: '#8B5A2B' }}>近6个月营业额趋势</h4>
            <Card>
              <Table 
                dataSource={statsData.monthlyTrend} 
                columns={monthlyTrendColumns} 
                pagination={false} 
                size="middle"
              />
            </Card>
          </div>

          {/* 服务项目统计 */}
          <div>
            <h4 style={{ marginBottom: 12, color: '#8B5A2B' }}>服务项目收入统计</h4>
            <Card>
              <Table 
                dataSource={statsData.serviceStats} 
                columns={serviceStatsColumns} 
                pagination={false} 
                size="middle"
              />
            </Card>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;
    