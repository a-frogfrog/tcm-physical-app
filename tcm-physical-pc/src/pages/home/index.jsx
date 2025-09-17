import React, { useState } from 'react';
import { 
  Card, Statistic, Row, Col, List, Badge, Button, Modal, 
  Form, Input, Select, InputNumber, Space, message,
  Divider
} from 'antd';
import {
  UserAddOutlined,
  CalendarOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  MedicineBoxOutlined,
  UserOutlined,
  PlusOutlined,
  DeleteOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'antd/dist/reset.css';
import './index.css';

const { TextArea } = Input;
const { Option } = Select;

const HomePage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [payModalVisible, setPayModalVisible] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // 打开支付弹窗
  const openPayModal = () => {
    setPayModalVisible(true);
    setOrderItems([]);
    form.resetFields();
    form.setFieldsValue({
      orderTime: moment(),
      orderType: 'treatment',
      paymentMethod: 'wechat',
      paymentTime: moment()
    });
  };

  // 关闭支付弹窗
  const closePayModal = () => {
    setPayModalVisible(false);
    form.resetFields();
    setOrderItems([]);
  };

  // 添加商品项
  const addOrderItem = () => {
    if (!orderItems.some((item) => !item.productId)) {
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

  // 删除商品项
  const removeOrderItem = (id) => {
    setOrderItems(orderItems.filter((item) => item.id !== id));
  };

  // 商品选择变更
  const handleProductChange = (id, productId) => {
    const product = productOptions.find((p) => p.id === productId);
    if (product) {
      setOrderItems(
        orderItems.map((item) => {
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
        }),
      );
    }
  };

  // 数量变更
  const handleQuantityChange = (id, quantity) => {
    if (quantity <= 0) return;

    setOrderItems(
      orderItems.map((item) => {
        if (item.id === id) {
          const newAmount = item.price * quantity;
          return {
            ...item,
            quantity,
            amount: newAmount
          };
        }
        return item;
      }),
    );
  };

  // 计算总金额
  const calculateTotalAmount = () => {
    return orderItems
      .reduce((sum, item) => sum + (item.amount || 0), 0)
      .toFixed(2);
  };

  // 提交支付
  const handleSubmitPayment = () => {
    if (orderItems.length === 0) {
      message.warning('请添加至少一个商品或服务');
      return;
    }

    if (orderItems.some((item) => !item.productId)) {
      message.warning('请完成所有商品的选择');
      return;
    }

    form.validateFields().then((values) => {
      setLoading(true);

      const customer = customerOptions.find((c) => c.id === values.customerId);
      const paymentMethod = paymentMethodOptions.find(p => p.value === values.paymentMethod);

      const newOrder = {
        id: `ORD${moment().format('YYYYMMDD')}${Math.floor(Math.random() * 1000).toString().padStart(4, '0')}`,
        customerName: customer?.name || '',
        customerPhone: customer?.phone || '',
        customerInfo: `${customer?.gender || ''} ${customer?.age || ''}岁`,
        orderType: values.orderType,
        orderTypeLabel: orderTypeOptions.find(t => t.value === values.orderType)?.label,
        orderTime: values.orderTime.format('YYYY-MM-DD HH:mm:ss'),
        orderTimeFormat: values.orderTime.format('MM-DD HH:mm'),
        amount: parseFloat(calculateTotalAmount()),
        status: 'paid',
        statusLabel: '已支付',
        statusColor: 'green',
        statusIcon: <CheckCircleOutlined />,
        paymentMethod: values.paymentMethod,
        paymentMethodLabel: paymentMethod?.label,
        paymentMethodIcon: paymentMethod?.icon,
        paymentTime: values.paymentTime.format('YYYY-MM-DD HH:mm:ss'),
        paymentTimeFormat: values.paymentTime.format('MM-DD HH:mm'),
        doctorName: values.doctorName || '未指定',
        remark: values.remark || '无',
        items: orderItems.map(item => ({
          productName: item.productName,
          quantity: item.quantity,
          unit: item.unit,
          price: item.price,
          amount: item.amount,
          amountFormat: `¥${item.amount.toFixed(2)}`
        })),
        createTime: moment().format('YYYY-MM-DD HH:mm:ss')
      };

      // 模拟支付请求
      setTimeout(() => {
        message.success(`支付成功！订单编号：${newOrder.id}`);
        setPayModalVisible(false);
        setLoading(false);
      }, 1000);
    });
  };

  // 统计数据
  const statistics = [
    {
      title: '今日预约',
      value: 18,
      icon: <CalendarOutlined />,
      color: '#8B5A2B',
      trend: '+2 较昨日',
    },
    {
      title: '今日接待',
      value: 12,
      icon: <UserAddOutlined />,
      color: '#1890ff',
      trend: '+1 较昨日',
    },
    {
      title: '今日订单',
      value: 15,
      icon: <ShoppingCartOutlined />,
      color: '#52c41a',
      trend: '+3 较昨日',
    },
    {
      title: '今日收入',
      value: '¥5,680.00',
      icon: <DollarOutlined />,
      color: '#fa8c16',
      trend: '+12% 较昨日',
    },
  ];

  // 近期预约数据
  const recentAppointments = [
    {
      id: 'A1001',
      customer: '张三',
      doctor: '李工',
      time: '09:30',
      status: '已确认',
    },
    {
      id: 'A1002',
      customer: '李四',
      doctor: '王工',
      time: '10:15',
      status: '已确认',
    },
    {
      id: 'A1003',
      customer: '王五',
      doctor: '张工',
      time: '14:00',
      status: '待确认',
    },
    {
      id: 'A1004',
      customer: '赵六',
      doctor: '李工',
      time: '15:30',
      status: '已确认',
    },
  ];

  // 科室医生数据
  const departmentDoctorStatus = [
    {
      department: '推拿理疗科',
      doctors: [
        { name: '李工', status: '空闲', availableTime: '10:00-12:00' },
        { name: '王工', status: '忙碌', availableTime: '14:00-16:00' },
        { name: '张工', status: '空闲', availableTime: '13:00-15:00' },
      ],
    },
    {
      department: '针灸科',
      doctors: [
        { name: '刘工', status: '忙碌', availableTime: '15:30-17:30' },
        { name: '陈工', status: '空闲', availableTime: '09:30-11:30' },
      ],
    },
    {
      department: '中药调理科',
      doctors: [
        { name: '孙工', status: '空闲', availableTime: '10:30-12:30' },
        { name: '周工', status: '空闲', availableTime: '14:30-16:30' },
      ],
    },
    {
      department: '艾灸养生科',
      doctors: [
        { name: '吴工', status: '忙碌', availableTime: '16:00-18:00' },
        { name: '郑工', status: '空闲', availableTime: '09:00-11:00' },
      ],
    },
  ];

  return (
    <div className='home-container' style={{ background: '#FCFAF6' }}>
      {/* 页面标题与支付按钮 */}
      <div className='page-header'>
        <h2 className='page-title'>工作台</h2>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={openPayModal}
          className='add-order-btn'>
          生成订单
        </Button>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className='stats-row'>
        {statistics.map((stat, index) => (
          <Col xs={12} sm={6} key={index}>
            <Card className='stat-card'>
              <Statistic
                title={stat.title}
                value={stat.value}
                precision={stat.title.includes('收入') ? 2 : 0}
                valueStyle={{ color: stat.color, fontSize: '18px' }}
                prefix={stat.icon}
                suffix={<span className='stat-trend'>{stat.trend}</span>}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* 近期预约和科室接待员工状况 */}
      <Row gutter={[16, 16]} className='content-row'>
        {/* 近期预约模块 */}
        <Col xs={24} md={12}>
          <Card className='content-card' title='近期预约'>
            <div className='card-header-actions'>
              <Button
                type='link'
                onClick={() => navigate('/appointment')}
                className='view-all-link'>
                查看全部
              </Button>
            </div>
            <List
              dataSource={recentAppointments}
              renderItem={(item) => (
                <List.Item className='appointment-item'>
                  <List.Item.Meta
                    title={
                      <div className='appointment-title'>
                        <span className='appointment-id'>{item.id}</span>
                        <Badge
                          status={item.status === '已确认' ? 'success' : 'processing'}
                          text={item.status}
                          className='appointment-status'
                        />
                      </div>
                    }
                    description={
                      <div className='appointment-details'>
                        <p>客户：{item.customer}</p>
                        <p>接待员工：{item.doctor}</p>
                        <p>时间：{item.time}</p>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* 科室与接待员工空闲状况模块 */}
        <Col xs={24} md={12}>
          <Card className='content-card' title='员工空闲状况'>
            <div className='card-header-actions'>
              <Button
                type='link'
                onClick={() => navigate('/department-doctor')}
                className='view-all-link'>
                查看全部
              </Button>
            </div>
            <List
              dataSource={departmentDoctorStatus}
              renderItem={(department) => (
                <List.Item className='department-item'>
                  <List.Item.Meta
                    title={
                      <div className='department-header'>
                        <span className='department-name'>
                          <MedicineBoxOutlined size={16} />
                          {department.department}
                        </span>
                      </div>
                    }
                    description={
                      <div className='doctor-list'>
                        {department.doctors.map((doctor, idx) => (
                          <div key={idx} className='doctor-item'>
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
                              <span className='doctor-time'>{doctor.availableTime}</span>
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

      {/* 支付弹窗 */}
      <Modal
        title="新增支付"
        open={payModalVisible}
        onCancel={closePayModal}
        confirmLoading={loading}
        width={800}
        destroyOnClose
        footer={[
          <Button key='back' onClick={closePayModal}>
            取消
          </Button>,
          <Button
            key='submit'
            type='primary'
            loading={loading}
            onClick={handleSubmitPayment}>
            确认支付
          </Button>,
        ]}>
        <Form form={form} layout='vertical' className='order-form home-order-form'>
          {/* 客户与订单类型 */}
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

          {/* 下单时间与医生 */}
          <Space style={{ width: '100%' }}>
            <Form.Item
              name='orderTime'
              label='下单时间'
              rules={[{ required: true, message: '请选择下单时间' }]}
              style={{ flex: 1 }}>
              <Input
                type="datetime-local"
                value={form.getFieldValue('orderTime')?.format('YYYY-MM-DDTHH:mm')}
                onChange={(e) => form.setFieldsValue({
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

          {/* 订单明细 */}
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
                        .filter(
                          (p) =>
                            !form.getFieldValue('orderType') ||
                            p.type === form.getFieldValue('orderType'),
                        )
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

          {/* 支付信息 */}
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
                value={form.getFieldValue('paymentTime')?.format('YYYY-MM-DDTHH:mm')}
                onChange={(e) => form.setFieldsValue({
                  paymentTime: e.target.value ? moment(e.target.value) : null
                })}
              />
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </div>
  );
};

export default HomePage;
    