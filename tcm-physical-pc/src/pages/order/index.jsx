import React, { useState, useEffect } from 'react';
import { 
  Table, Card, Button, Input, Space, Tag, Modal, Form, 
  DatePicker, Select, message, Popconfirm, Badge, InputNumber 
} from 'antd';
const { TextArea } = Input;
import { 
  PlusOutlined, EditOutlined, EyeOutlined, 
  DeleteOutlined, SearchOutlined, PrinterOutlined ,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import './index.css';

const { Option } = Select;
const { RangePicker } = DatePicker;

const OrderPage = () => {
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [orderList, setOrderList] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [actionType, setActionType] = useState('add'); // add 或 edit
  const navigate = useNavigate();
  
  // 模拟订单类型
  const orderTypeOptions = [
    { label: '诊疗', value: 'treatment' },
    { label: '药材', value: 'medicine' },
    { label: '套餐', value: 'package' },
  ];
  
  // 模拟支付方式
  const paymentMethodOptions = [
    { label: '微信支付', value: 'wechat' },
    { label: '支付宝', value: 'alipay' },
    { label: '现金', value: 'cash' },
    { label: '银行卡', value: 'card' },
  ];
  
  // 模拟订单状态
  const orderStatusOptions = [
    { label: '待支付', value: 'pending', color: 'orange' },
    { label: '已支付', value: 'paid', color: 'green' },
    { label: '已取消', value: 'cancelled', color: 'red' },
    { label: '已退款', value: 'refunded', color: 'purple' },
  ];
  
  // 模拟商品/服务数据
  const productOptions = [
    { id: 1, name: '针灸治疗', type: 'treatment', price: 80 },
    { id: 2, name: '推拿按摩', type: 'treatment', price: 60 },
    { id: 3, name: '中药调理', type: 'treatment', price: 120 },
    { id: 4, name: '当归', type: 'medicine', price: 1.5 },
    { id: 5, name: '黄芪', type: 'medicine', price: 2.0 },
    { id: 6, name: '人参', type: 'medicine', price: 5.0 },
    { id: 7, name: '感冒套餐', type: 'package', price: 200 },
    { id: 8, name: '养生套餐', type: 'package', price: 380 },
  ];
  
  // 模拟客户数据
  const customerOptions = [
    { id: 1, name: '张三', phone: '13800138000' },
    { id: 2, name: '李四', phone: '13900139000' },
    { id: 3, name: '王五', phone: '13700137000' },
    { id: 4, name: '赵六', phone: '13600136000' },
  ];
  
  // 模拟获取订单列表数据
  useEffect(() => {
    fetchOrderList();
  }, []);
  
  // 获取订单列表
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
          amount: 180.00,
          paymentMethod: 'wechat',
          status: 'paid',
          paymentTime: '2023-06-15 09:35:00',
          doctorName: '张医生',
          remark: '无特殊要求'
        },
        {
          id: 'ORD20230615002',
          customerName: '李四',
          customerPhone: '13900139000',
          orderType: 'medicine',
          orderTime: '2023-06-15 10:15:00',
          amount: 45.50,
          paymentMethod: 'cash',
          status: 'paid',
          paymentTime: '2023-06-15 10:18:00',
          doctorName: '李医生',
          remark: '需要切片'
        },
        {
          id: 'ORD20230615003',
          customerName: '王五',
          customerPhone: '13700137000',
          orderType: 'package',
          orderTime: '2023-06-15 14:20:00',
          amount: 380.00,
          paymentMethod: 'alipay',
          status: 'pending',
          paymentTime: '',
          doctorName: '王医生',
          remark: ''
        },
        {
          id: 'ORD20230614001',
          customerName: '赵六',
          customerPhone: '13600136000',
          orderType: 'treatment',
          orderTime: '2023-06-14 16:45:00',
          amount: 120.00,
          paymentMethod: 'card',
          status: 'cancelled',
          paymentTime: '',
          doctorName: '赵医生',
          remark: '客户临时有事'
        },
        {
          id: 'ORD20230614002',
          customerName: '张三',
          customerPhone: '13800138000',
          orderType: 'medicine',
          orderTime: '2023-06-14 09:10:00',
          amount: 65.00,
          paymentMethod: 'wechat',
          status: 'refunded',
          paymentTime: '2023-06-14 09:12:00',
          doctorName: '张医生',
          remark: '药材质量问题'
        },
      ];
      
      // 应用筛选条件
      let filteredData = [...mockData];
      
      if (params.orderNo) {
        filteredData = filteredData.filter(item => 
          item.id.includes(params.orderNo)
        );
      }
      
      if (params.customerName) {
        filteredData = filteredData.filter(item => 
          item.customerName.includes(params.customerName)
        );
      }
      
      if (params.orderType) {
        filteredData = filteredData.filter(item => 
          item.orderType === params.orderType
        );
      }
      
      if (params.status) {
        filteredData = filteredData.filter(item => 
          item.status === params.status
        );
      }
      
      if (params.dateRange && params.dateRange.length) {
        const startDate = params.dateRange[0].format('YYYY-MM-DD');
        const endDate = params.dateRange[1].format('YYYY-MM-DD');
        filteredData = filteredData.filter(item => {
          const orderDate = item.orderTime.split(' ')[0];
          return orderDate >= startDate && orderDate <= endDate;
        });
      }
      
      setOrderList(filteredData);
      setLoading(false);
    }, 500);
  };
  
  // 搜索处理
  const handleSearch = () => {
    searchForm.validateFields().then(values => {
      const params = {
        orderNo: values.orderNo || '',
        customerName: values.customerName || '',
        orderType: values.orderType || '',
        status: values.status || '',
        dateRange: values.dateRange || null
      };
      fetchOrderList(params);
    });
  };
  
  // 重置搜索
  const handleReset = () => {
    searchForm.resetFields();
    fetchOrderList();
  };
  
  // 打开表单弹窗
  const openModal = (record, type) => {
    setActionType(type);
    setVisible(true);
    
    if (type === 'edit' && record) {
      setCurrentRecord(record);
      
      // 模拟获取订单明细
      const mockItems = [
        { id: 1, productId: 1, productName: '针灸治疗', quantity: 1, price: 80, amount: 80 },
        { id: 2, productId: 3, productName: '中药调理', quantity: 1, price: 120, amount: 120 },
      ];
      
      setOrderItems(mockItems);
      
      form.setFieldsValue({
        customerId: customerOptions.find(c => c.name === record.customerName)?.id,
        orderType: record.orderType,
        doctorName: record.doctorName,
        remark: record.remark,
        paymentMethod: record.paymentMethod,
        status: record.status,
        orderTime: moment(record.orderTime),
        paymentTime: record.paymentTime ? moment(record.paymentTime) : null
      });
    } else {
      setCurrentRecord(null);
      setOrderItems([]);
      form.resetFields();
      // 默认值设置
      form.setFieldsValue({
        orderTime: moment(),
        orderType: 'treatment',
        status: 'pending'
      });
    }
  };
  
  // 关闭表单弹窗
  const closeModal = () => {
    setVisible(false);
    form.resetFields();
    setOrderItems([]);
  };
  
  // 添加订单明细
  const addOrderItem = () => {
    if (!orderItems.some(item => !item.productId)) {
      setOrderItems([...orderItems, { id: Date.now(), productId: null, productName: '', quantity: 1, price: 0, amount: 0 }]);
    } else {
      message.warning('请先完成当前空行的商品选择');
    }
  };
  
  // 移除订单明细
  const removeOrderItem = (id) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };
  
  // 商品选择变化
  const handleProductChange = (id, productId) => {
    const product = productOptions.find(p => p.id === productId);
    if (product) {
      setOrderItems(orderItems.map(item => {
        if (item.id === id) {
          return {
            ...item,
            productId,
            productName: product.name,
            price: product.price,
            amount: product.price * item.quantity
          };
        }
        return item;
      }));
    }
  };
  
  // 数量变化
  const handleQuantityChange = (id, quantity) => {
    if (quantity <= 0) return;
    
    setOrderItems(orderItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity,
          amount: item.price * quantity
        };
      }
      return item;
    }));
  };
  
  // 计算总金额
  const calculateTotalAmount = () => {
    return orderItems.reduce((sum, item) => sum + (item.amount || 0), 0).toFixed(2);
  };
  
  // 保存订单
  const handleSave = () => {
    if (orderItems.length === 0) {
      message.warning('请添加至少一个商品或服务');
      return;
    }
    
    if (orderItems.some(item => !item.productId)) {
      message.warning('请完成所有商品的选择');
      return;
    }
    
    form.validateFields().then(values => {
      setLoading(true);
      
      const customer = customerOptions.find(c => c.id === values.customerId);
      
      // 构建保存的数据对象
      const saveData = {
        id: actionType === 'add' 
          ? `ORD${moment().format('YYYYMMDD')}${Math.floor(Math.random() * 100).toString().padStart(3, '0')}` 
          : currentRecord.id,
        customerName: customer?.name || '',
        customerPhone: customer?.phone || '',
        orderType: values.orderType,
        orderTime: values.orderTime.format('YYYY-MM-DD HH:mm:ss'),
        amount: parseFloat(calculateTotalAmount()),
        paymentMethod: values.paymentMethod,
        status: values.status,
        paymentTime: values.status === 'paid' && values.paymentTime 
          ? values.paymentTime.format('YYYY-MM-DD HH:mm:ss') 
          : '',
        doctorName: values.doctorName,
        remark: values.remark,
        items: orderItems
      };
      
      // 模拟保存API请求
      setTimeout(() => {
        let newList = [...orderList];
        
        if (actionType === 'add') {
          newList.unshift(saveData);
          message.success('订单创建成功');
        } else {
          newList = newList.map(item => 
            item.id === currentRecord.id ? saveData : item
          );
          message.success('订单更新成功');
        }
        
        setOrderList(newList);
        setVisible(false);
        setLoading(false);
      }, 500);
    });
  };
  
  // 查看订单详情
  const viewOrderDetail = (record) => {
    navigate(`/order/${record.id}/detail`, { state: { record } });
  };
  
  // 删除订单
  const deleteOrder = (id) => {
    setLoading(true);
    
    // 模拟API请求
    setTimeout(() => {
      const newList = orderList.filter(item => item.id !== id);
      setOrderList(newList);
      message.success('订单已删除');
      setLoading(false);
    }, 500);
  };
  
  // 取消订单
  const cancelOrder = (id) => {
    setLoading(true);
    
    // 模拟API请求
    setTimeout(() => {
      const newList = orderList.map(item => 
        item.id === id ? { ...item, status: 'cancelled' } : item
      );
      setOrderList(newList);
      message.success('订单已取消');
      setLoading(false);
    }, 500);
  };
  
  // 支付订单
  const payOrder = (record) => {
    openModal({ 
      ...record, 
      status: 'paid',
      paymentTime: moment().format('YYYY-MM-DD HH:mm:ss')
    }, 'edit');
  };
  
  // 退款订单
  const refundOrder = (id) => {
    setLoading(true);
    
    // 模拟API请求
    setTimeout(() => {
      const newList = orderList.map(item => 
        item.id === id ? { ...item, status: 'refunded' } : item
      );
      setOrderList(newList);
      message.success('订单已退款');
      setLoading(false);
    }, 500);
  };
  
  // 打印订单
  const printOrder = (id) => {
    message.info('正在打印订单...');
    // 实际项目中调用打印API
  };
  
  // 表格列定义
  const columns = [
    {
      title: '序号',
      key: 'index',
      width: 80,
      render: (text, record, index) => index + 1
    },
    {
      title: '订单编号',
      dataIndex: 'id',
      key: 'id',
      width: 140
    },
    {
      title: '客户信息',
      key: 'customer',
      width: 200,
      render: (text, record) => (
        <div>
          <div>{record.customerName}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.customerPhone}</div>
        </div>
      )
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      key: 'orderType',
      width: 100,
      render: (type) => {
        const typeInfo = orderTypeOptions.find(item => item.value === type);
        return typeInfo ? typeInfo.label : type;
      }
    },
    {
      title: '下单时间',
      dataIndex: 'orderTime',
      key: 'orderTime',
      width: 160
    },
    {
      title: '订单金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
      render: (amount) => `¥${amount.toFixed(2)}`
    },
    {
      title: '支付方式',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      width: 120,
      render: (method) => {
        const methodInfo = paymentMethodOptions.find(item => item.value === method);
        return methodInfo ? methodInfo.label : method;
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => {
        const statusInfo = orderStatusOptions.find(item => item.value === status);
        return statusInfo ? (
          <Tag color={statusInfo.color}>{statusInfo.label}</Tag>
        ) : (
          <Tag color="gray">{status}</Tag>
        );
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 320,
      render: (text, record) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => viewOrderDetail(record)}
            size="small"
          >
            详情
          </Button>
          
          <Button 
            type="text" 
            icon={<PrinterOutlined />} 
            onClick={() => printOrder(record.id)}
            size="small"
          >
            打印
          </Button>
          
          {record.status === 'pending' && (
            <>
              <Button 
                type="text" 
                icon={<EditOutlined />} 
                onClick={() => openModal(record, 'edit')}
                size="small"
              >
                编辑
              </Button>
              
              <Button 
                type="text" 
                icon={<CheckCircleOutlined />} 
                onClick={() => payOrder(record)}
                size="small"
                style={{ color: 'green' }}
              >
                支付
              </Button>
              
              <Popconfirm
                title="确定要取消订单吗？"
                onConfirm={() => cancelOrder(record.id)}
                okText="确定"
                cancelText="取消"
              >
                <Button 
                  type="text" 
                  icon={<DeleteOutlined />} 
                  size="small"
                  style={{ color: 'red' }}
                >
                  取消
                </Button>
              </Popconfirm>
            </>
          )}
          
          {record.status === 'paid' && (
            <Popconfirm
              title="确定要退款吗？"
              onConfirm={() => refundOrder(record.id)}
              okText="确定"
              cancelText="取消"
            >
              <Button 
                type="text" 
                icon={<DeleteOutlined />} 
                size="small"
                style={{ color: 'purple' }}
              >
                退款
              </Button>
            </Popconfirm>
          )}
        </Space>
      )
    }
  ];
  
  return (
    <div className="order-page">
      <div className="page-header">
        <h2 className="page-title">订单管理</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => openModal(null, 'add')}
        >
          新增订单
        </Button>
      </div>
      
      <Card className="search-card">
        <Form 
          form={searchForm} 
          layout="inline" 
          onFinish={handleSearch}
          className="search-form"
        >
          <Form.Item name="orderNo" label="订单编号">
            <Input placeholder="请输入订单编号" />
          </Form.Item>
          
          <Form.Item name="customerName" label="客户姓名">
            <Input placeholder="请输入客户姓名" />
          </Form.Item>
          
          <Form.Item name="orderType" label="订单类型">
            <Select placeholder="请选择订单类型">
              {orderTypeOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item name="status" label="状态">
            <Select placeholder="请选择状态">
              {orderStatusOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item name="dateRange" label="下单日期">
            <RangePicker format="YYYY-MM-DD" />
          </Form.Item>
          
          <Form.Item>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
                搜索
              </Button>
              <Button onClick={handleReset}>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      
      <Card className="table-card">
        <div className="stats-bar">
          <Space size="large">
            <div>
              <span className="stats-label">今日订单数：</span>
              <Badge count={3} size="large" />
            </div>
            <div>
              <span className="stats-label">今日销售额：</span>
              <span className="stats-value">¥605.50</span>
            </div>
            <div>
              <span className="stats-label">本月销售额：</span>
              <span className="stats-value">¥15,680.20</span>
            </div>
          </Space>
        </div>
        
        <Table
          columns={columns}
          dataSource={orderList}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
          scroll={{ x: 'max-content' }}
        />
      </Card>
      
      {/* 订单表单弹窗 */}
      <Modal
        title={actionType === 'add' ? '新增订单' : '编辑订单'}
        open={visible}
        onCancel={closeModal}
        onOk={handleSave}
        confirmLoading={loading}
        width={800}
        destroyOnHidden
        footer={[
          <Button key="back" onClick={closeModal}>取消</Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleSave}>
            保存
          </Button>
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          className="order-form"
        >
          <Space style={{ width: '100%' }}>
            <Form.Item
              name="customerId"
              label="客户"
              rules={[{ required: true, message: '请选择客户' }]}
              style={{ flex: 1 }}
            >
              <Select placeholder="请选择客户">
                {customerOptions.map(customer => (
                  <Option key={customer.id} value={customer.id}>
                    {customer.name}（{customer.phone}）
                  </Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item
              name="orderType"
              label="订单类型"
              rules={[{ required: true, message: '请选择订单类型' }]}
              style={{ flex: 1 }}
            >
              <Select placeholder="请选择订单类型">
                {orderTypeOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Space>
          
          <Space style={{ width: '100%' }}>
            <Form.Item
              name="orderTime"
              label="下单时间"
              rules={[{ required: true, message: '请选择下单时间' }]}
              style={{ flex: 1 }}
            >
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            
            <Form.Item
              name="doctorName"
              label="接诊医生"
              style={{ flex: 1 }}
            >
              <Input placeholder="请输入医生姓名" />
            </Form.Item>
          </Space>
          
          <Form.Item
            name="remark"
            label="备注"
          >
            <TextArea rows={2} placeholder="请输入备注信息" />
          </Form.Item>
          
          <div className="order-items-title">
            <h4>订单明细</h4>
            <Button 
              type="dashed" 
              icon={<PlusOutlined />} 
              size="small"
              onClick={addOrderItem}
            >
              添加商品/服务
            </Button>
          </div>
          
          {orderItems.length > 0 ? (
            <div className="order-items-table">
              {orderItems.map((item, index) => (
                <div key={item.id} className="order-item-row">
                  <div className="order-item-cell">
                    <Select 
                      placeholder="请选择商品/服务"
                      style={{ width: '100%' }}
                      value={item.productId}
                      onChange={(value) => handleProductChange(item.id, value)}
                    >
                      {productOptions
                        .filter(p => !form.getFieldValue('orderType') || p.type === form.getFieldValue('orderType'))
                        .map(product => (
                          <Option key={product.id} value={product.id}>
                            {product.name} - ¥{product.price.toFixed(2)}
                          </Option>
                        ))}
                    </Select>
                  </div>
                  
                  <div className="order-item-cell">
                    <InputNumber 
                      min={1} 
                      value={item.quantity}
                      onChange={(value) => handleQuantityChange(item.id, value)}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div className="order-item-cell">
                    <Input 
                      value={`¥${item.price.toFixed(2)}`} 
                      disabled
                    />
                  </div>
                  
                  <div className="order-item-cell">
                    <Input 
                      value={`¥${item.amount.toFixed(2)}`} 
                      disabled
                    />
                  </div>
                  
                  <div className="order-item-cell action-cell">
                    <Button 
                      type="text" 
                      icon={<DeleteOutlined />} 
                      size="small"
                      onClick={() => removeOrderItem(item.id)}
                      danger
                    />
                  </div>
                </div>
              ))}
              
              <div className="order-total-row">
                <div className="total-label">总计：</div>
                <div className="total-value">¥{calculateTotalAmount()}</div>
              </div>
            </div>
          ) : (
            <div className="no-items-placeholder">
              暂无订单明细，请点击"添加商品/服务"按钮
            </div>
          )}
          
          <Space style={{ width: '100%' }}>
            <Form.Item
              name="paymentMethod"
              label="支付方式"
              rules={[{ required: true, message: '请选择支付方式' }]}
              style={{ flex: 1 }}
            >
              <Select placeholder="请选择支付方式">
                {paymentMethodOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item
              name="status"
              label="订单状态"
              rules={[{ required: true, message: '请选择订单状态' }]}
              style={{ flex: 1 }}
            >
              <Select placeholder="请选择订单状态">
                {orderStatusOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Space>
          
          <Form.Item
            name="paymentTime"
            label="支付时间"
            rules={[
              { 
                required: (form.getFieldValue('status') === 'paid'), 
                message: '已支付状态必须填写支付时间' 
              }
            ]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderPage;
    