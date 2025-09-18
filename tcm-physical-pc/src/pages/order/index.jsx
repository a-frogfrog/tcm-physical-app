import React, { useState, useEffect } from 'react';
import {
  Table,
  Card,
  Form,
  DatePicker,
  Select,
  Input,
  Space,
  Tag,
  Badge,
  Button  
} from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'antd/dist/reset.css';

const OrderPage = () => {
  const [searchForm] = Form.useForm();
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);

  // 订单类型配置
  const orderTypeOptions = [
    { label: '诊疗', value: 'treatment' },
    { label: '药材', value: 'medicine' },
    { label: '套餐', value: 'package' },
  ];

  // 支付方式配置
  const paymentMethodOptions = [
    { label: '微信支付', value: 'wechat' },
    { label: '支付宝', value: 'alipay' },
    { label: '现金', value: 'cash' },
    { label: '银行卡', value: 'card' },
  ];

  // 订单状态配置
  const orderStatusOptions = [
    { label: '待支付', value: 'pending', color: 'orange' },
    { label: '已支付', value: 'paid', color: 'green' },
    { label: '已取消', value: 'cancelled', color: 'red' },
    { label: '已退款', value: 'refunded', color: 'purple' },
  ];

  // 页面初始化加载订单数据
  useEffect(() => {
    fetchOrderList();
  }, []);

  // 获取订单列表（支持筛选）
  const fetchOrderList = (params = {}) => {
    setLoading(true);

    // 模拟API请求
    setTimeout(() => {
      const mockData = [
        {
          id: 'ORD20230615001',
          customerName: '张三',
          customerPhone: '13800138000',
          orderType: 'treatment',
          orderTime: '2023-06-15 09:30:00',
          amount: 180.0,
          paymentMethod: 'wechat',
          status: 'paid',
          paymentTime: '2023-06-15 09:35:00',
          doctorName: '张工',
          remark: '无特殊要求',
        },
        {
          id: 'ORD20230615002',
          customerName: '李四',
          customerPhone: '13900139000',
          orderType: 'medicine',
          orderTime: '2023-06-15 10:15:00',
          amount: 45.5,
          paymentMethod: 'cash',
          status: 'paid',
          paymentTime: '2023-06-15 10:18:00',
          doctorName: '李工',
          remark: '需要拔罐',
        },
        {
          id: 'ORD20230615003',
          customerName: '王五',
          customerPhone: '13700137000',
          orderType: 'package',
          orderTime: '2023-06-15 14:20:00',
          amount: 380.0,
          paymentMethod: 'alipay',
          status: 'pending',
          paymentTime: '',
          doctorName: '王工',
          remark: '',
        },
        {
          id: 'ORD20230614001',
          customerName: '赵六',
          customerPhone: '13600136000',
          orderType: 'treatment',
          orderTime: '2023-06-14 16:45:00',
          amount: 120.0,
          paymentMethod: 'card',
          status: 'cancelled',
          paymentTime: '',
          doctorName: '赵工',
          remark: '客户临时有事',
        },
        {
          id: 'ORD20230614002',
          customerName: '张三',
          customerPhone: '13800138000',
          orderType: 'medicine',
          orderTime: '2023-06-14 09:10:00',
          amount: 65.0,
          paymentMethod: 'wechat',
          status: 'refunded',
          paymentTime: '2023-06-14 09:12:00',
          doctorName: '张力',
          remark: '药材质量问题',
        },
        {
          id: 'ORD20230616001',
          customerName: '孙七',
          customerPhone: '13500135000',
          orderType: 'treatment',
          orderTime: '2023-06-16 11:20:00',
          amount: 240.0,
          paymentMethod: 'wechat',
          status: 'paid',
          paymentTime: '2023-06-16 11:22:00',
          doctorName: '刘工',
          remark: '每周三定期治疗',
        },
        {
          id: 'ORD20230616002',
          customerName: '周八',
          customerPhone: '13400134000',
          orderType: 'package',
          orderTime: '2023-06-16 15:10:00',
          amount: 760.0,
          paymentMethod: 'alipay',
          status: 'paid',
          paymentTime: '2023-06-16 15:15:00',
          doctorName: '陈工',
          remark: '购买2个养生套餐',
        },
      ];

      // 应用筛选条件
      let filteredData = [...mockData];
      if (params.orderNo) {
        filteredData = filteredData.filter((item) => 
          item.id.toLowerCase().includes(params.orderNo.toLowerCase())
        );
      }
      if (params.customerName) {
        filteredData = filteredData.filter((item) => 
          item.customerName.toLowerCase().includes(params.customerName.toLowerCase())
        );
      }
      if (params.orderType) {
        filteredData = filteredData.filter((item) => item.orderType === params.orderType);
      }
      if (params.status) {
        filteredData = filteredData.filter((item) => item.status === params.status);
      }
      if (params.dateRange && params.dateRange.length) {
        const startDate = params.dateRange[0].format('YYYY-MM-DD');
        const endDate = params.dateRange[1].format('YYYY-MM-DD');
        filteredData = filteredData.filter((item) => {
          const orderDate = item.orderTime.split(' ')[0];
          return orderDate >= startDate && orderDate <= endDate;
        });
      }

      setOrderList(filteredData);
      setLoading(false);
    }, 500);
  };

  // 处理搜索
  const handleSearch = () => {
    searchForm.validateFields().then((values) => {
      const params = {
        orderNo: values.orderNo || '',
        customerName: values.customerName || '',
        orderType: values.orderType || '',
        status: values.status || '',
        dateRange: values.dateRange || null,
      };
      fetchOrderList(params);
    });
  };

  // 重置搜索
  const handleReset = () => {
    searchForm.resetFields();
    fetchOrderList();
  };

  // 表格列配置
  const columns = [
    {
      title: '序号',
      key: 'index',
      width: 80,
      align: 'center',
      render: (text, record, index) => index + 1,
    },
    {
      title: '订单编号',
      dataIndex: 'id',
      key: 'id',
      width: 140,
      align: 'center',
      ellipsis: true,
      tooltip: (text) => text,
    },
    {
      title: '客户信息',
      key: 'customer',
      width: 200,
      render: (text, record) => (
        <div className='customer-info'>
          <div className='customer-name'>{record.customerName}</div>
          <div className='customer-phone'>{record.customerPhone}</div>
        </div>
      ),
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      key: 'orderType',
      width: 100,
      align: 'center',
      render: (type) => {
        const typeInfo = orderTypeOptions.find((item) => item.value === type);
        return typeInfo ? typeInfo.label : type;
      },
    },
    {
      title: '下单时间',
      dataIndex: 'orderTime',
      key: 'orderTime',
      width: 160,
      align: 'center',
      ellipsis: true,
      tooltip: (text) => text,
    },
    {
      title: '订单金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
      align: 'center',
      render: (amount) => <span className='order-amount'>¥{amount.toFixed(2)}</span>,
    },
    {
      title: '支付方式',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      width: 120,
      align: 'center',
      render: (method) => {
        const methodInfo = paymentMethodOptions.find((item) => item.value === method);
        return methodInfo ? methodInfo.label : method;
      },
    },
    {
      title: '支付时间',
      dataIndex: 'paymentTime',
      key: 'paymentTime',
      width: 160,
      align: 'center',
      ellipsis: true,
      tooltip: (text) => text || '未支付',
      render: (time) => time || <span className='empty-text'>-</span>,
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center',
      render: (status) => {
        const statusInfo = orderStatusOptions.find((item) => item.value === status);
        return statusInfo ? (
          <Tag color={statusInfo.color} className='order-status-tag'>
            {statusInfo.label}
          </Tag>
        ) : (
          <Tag color='gray' className='order-status-tag'>{status}</Tag>
        );
      },
    },
    {
      title: '接待员工',
      dataIndex: 'doctorName',
      key: 'doctorName',
      width: 100,
      align: 'center',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      ellipsis: true,
      tooltip: (text) => text || '无备注',
      render: (remark) => remark || <span className='empty-text'>-</span>,
    },
  ];

  return (
    <div className='order-page-container'>
      {/* 页面标题 */}
      <div className='page-header'>
        <h2 className='page-title'>订单管理</h2>
      </div>

      {/* 搜索区域 */}
      <Card className='search-card' bordered={false}>
        <Form
          form={searchForm}
          layout='inline'
          onFinish={handleSearch}
          className='search-form'
          initialValues={{ orderType: '', status: '' }}
        >
          <Form.Item name='orderNo' label='订单编号' className='search-form-item'>
            <Input 
              placeholder='请输入订单编号' 
              className='search-input'
              maxLength={20}
            />
          </Form.Item>

          <Form.Item name='customerName' label='客户姓名' className='search-form-item'>
            <Input 
              placeholder='请输入客户姓名' 
              className='search-input'
              maxLength={10}
            />
          </Form.Item>

          <Form.Item name='orderType' label='订单类型' className='search-form-item'>
            <Select 
              placeholder='请选择订单类型' 
              className='search-select'
              showSearch
              filterOption={(input, option) => 
                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
              }
            >
              {orderTypeOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name='status' label='订单状态' className='search-form-item'>
            <Select 
              placeholder='请选择订单状态' 
              className='search-select'
              showSearch
              filterOption={(input, option) => 
                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
              }
            >
              {orderStatusOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name='dateRange' label='下单日期' className='search-form-item'>
            <RangePicker 
              format='YYYY-MM-DD' 
              className='search-date-picker'
              placeholder={['开始日期', '结束日期']}
            />
          </Form.Item>

          <Form.Item className='search-form-item'>
            <Space size='middle'>
              <Button 
                type='primary' 
                icon={<SearchOutlined />} 
                htmlType='submit'
                className='search-btn'
              >
                搜索
              </Button>
              <Button 
                onClick={handleReset}
                className='reset-btn'
              >
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      {/* 统计信息 */}
      <Card className='stats-card' bordered={false}>
        <div className='stats-container'>
          <div className='stat-item'>
            <span className='stat-label'>今日订单数：</span>
            <Badge count={2} size='large' className='stat-count' />
          </div>
          <div className='stat-item'>
            <span className='stat-label'>今日销售额：</span>
            <span className='stat-value'>¥1,000.00</span>
          </div>
          <div className='stat-item'>
            <span className='stat-label'>本月销售额：</span>
            <span className='stat-value'>¥16,680.20</span>
          </div>
          <div className='stat-item'>
            <span className='stat-label'>总订单数：</span>
            <span className='stat-value'>{orderList.length} 条</span>
          </div>
        </div>
      </Card>

      {/* 订单表格 */}
      <Card className='table-card' bordered={false}>
        <Table
          columns={columns}
          dataSource={orderList}
          rowKey='id'
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`,
            pageSizeOptions: ['5', '10', '20', '50'],
            size: 'middle'
          }}
          scroll={{ x: 'max-content' }}
          rowSelection={false}
          onRow={() => ({ style: { cursor: 'default' } })}
          size='middle'
        />
      </Card>
    </div>
  );
};

export default OrderPage;