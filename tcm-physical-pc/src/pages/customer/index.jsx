import React, { useState, useEffect } from 'react';
import { 
  Table, Card, Button, Input, Space, Tag, Modal, Form, 
  DatePicker, Select, message, Popconfirm, Badge, 
  Tabs, Descriptions, List, InputNumber 
} from 'antd';
const { TextArea } = Input;
import { 
  PlusOutlined, EditOutlined, EyeOutlined, 
  DeleteOutlined, SearchOutlined, UserAddOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import './index.css';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const CustomerPage = () => {
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [customerList, setCustomerList] = useState([]);
  const [customerHistory, setCustomerHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [actionType, setActionType] = useState('add'); // add 或 edit
  const navigate = useNavigate();
  
  // 模拟客户类型
  const customerTypeOptions = [
    { label: '普通客户', value: 'normal' },
    { label: '会员', value: 'member' },
    { label: 'VIP客户', value: 'vip' },
  ];
  
  // 模拟获取客户列表数据
  useEffect(() => {
    fetchCustomerList();
  }, []);
  
  // 获取客户列表
  const fetchCustomerList = (params = {}) => {
    setLoading(true);
    
    // 模拟API请求
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          name: '张三',
          gender: '男',
          age: 35,
          phone: '13800138000',
          type: 'member',
          registerDate: '2023-01-15',
          lastVisitDate: '2023-06-15',
          visitCount: 12,
          totalConsumption: 2680,
          address: '北京市朝阳区XX街道',
          remark: '有高血压病史'
        },
        {
          id: 2,
          name: '李四',
          gender: '女',
          age: 28,
          phone: '13900139000',
          type: 'normal',
          registerDate: '2023-03-22',
          lastVisitDate: '2023-06-10',
          visitCount: 5,
          totalConsumption: 860,
          address: '上海市浦东新区XX路',
          remark: ''
        },
        {
          id: 3,
          name: '王五',
          gender: '男',
          age: 45,
          phone: '13700137000',
          type: 'vip',
          registerDate: '2022-11-05',
          lastVisitDate: '2023-06-15',
          visitCount: 32,
          totalConsumption: 12500,
          address: '广州市天河区XX小区',
          remark: '长期调理'
        },
        {
          id: 4,
          name: '赵六',
          gender: '女',
          age: 52,
          phone: '13600136000',
          type: 'normal',
          registerDate: '2023-05-18',
          lastVisitDate: '2023-05-18',
          visitCount: 1,
          totalConsumption: 320,
          address: '深圳市南山区XX大厦',
          remark: '颈椎不适'
        },
        {
          id: 5,
          name: '钱七',
          gender: '男',
          age: 38,
          phone: '13500135000',
          type: 'member',
          registerDate: '2023-02-10',
          lastVisitDate: '2023-06-08',
          visitCount: 8,
          totalConsumption: 1560,
          address: '杭州市西湖区XX路',
          remark: ''
        },
      ];
      
      // 应用筛选条件
      let filteredData = [...mockData];
      
      if (params.name) {
        filteredData = filteredData.filter(item => 
          item.name.includes(params.name)
        );
      }
      
      if (params.phone) {
        filteredData = filteredData.filter(item => 
          item.phone.includes(params.phone)
        );
      }
      
      if (params.type) {
        filteredData = filteredData.filter(item => 
          item.type === params.type
        );
      }
      
      if (params.registerDateRange && params.registerDateRange.length) {
        const startDate = params.registerDateRange[0].format('YYYY-MM-DD');
        const endDate = params.registerDateRange[1].format('YYYY-MM-DD');
        filteredData = filteredData.filter(item => 
          item.registerDate >= startDate && item.registerDate <= endDate
        );
      }
      
      setCustomerList(filteredData);
      setLoading(false);
    }, 500);
  };
  
  // 获取客户就诊历史
  const fetchCustomerHistory = (customerId) => {
    setLoading(true);
    
    // 模拟API请求
    setTimeout(() => {
      const mockHistory = [
        {
          id: 'H1001',
          visitDate: '2023-06-15',
          doctorName: '张医生',
          department: '内科',
          diagnosis: '风热感冒',
          treatment: '中药调理',
          amount: 180,
          status: 'completed'
        },
        {
          id: 'H1002',
          visitDate: '2023-05-28',
          doctorName: '李医生',
          department: '针灸科',
          diagnosis: '腰肌劳损',
          treatment: '针灸治疗',
          amount: 80,
          status: 'completed'
        },
        {
          id: 'H1003',
          visitDate: '2023-05-10',
          doctorName: '张医生',
          department: '内科',
          diagnosis: '脾胃虚弱',
          treatment: '中药调理',
          amount: 220,
          status: 'completed'
        },
        {
          id: 'H1004',
          visitDate: '2023-04-22',
          doctorName: '王医生',
          department: '推拿科',
          diagnosis: '颈椎病',
          treatment: '推拿按摩',
          amount: 60,
          status: 'completed'
        },
      ];
      
      setCustomerHistory(mockHistory);
      setLoading(false);
    }, 500);
  };
  
  // 搜索处理
  const handleSearch = () => {
    searchForm.validateFields().then(values => {
      const params = {
        name: values.name || '',
        phone: values.phone || '',
        type: values.type || '',
        registerDateRange: values.registerDateRange || null
      };
      fetchCustomerList(params);
    });
  };
  
  // 重置搜索
  const handleReset = () => {
    searchForm.resetFields();
    fetchCustomerList();
  };
  
  // 打开表单弹窗
  const openModal = (record, type) => {
    setActionType(type);
    setVisible(true);
    
    if (type === 'edit' && record) {
      setCurrentRecord(record);
      form.setFieldsValue({
        name: record.name,
        gender: record.gender,
        age: record.age,
        phone: record.phone,
        type: record.type,
        registerDate: moment(record.registerDate),
        address: record.address,
        remark: record.remark
      });
    } else {
      setCurrentRecord(null);
      form.resetFields();
      // 默认值设置
      form.setFieldsValue({
        registerDate: moment(),
        type: 'normal'
      });
    }
  };
  
  // 关闭表单弹窗
  const closeModal = () => {
    setVisible(false);
    form.resetFields();
  };
  
  // 查看客户详情
  const viewCustomerDetail = (record) => {
    setCurrentRecord(record);
    fetchCustomerHistory(record.id);
    setDetailVisible(true);
  };
  
  // 关闭详情弹窗
  const closeDetailModal = () => {
    setDetailVisible(false);
    setCurrentRecord(null);
    setCustomerHistory([]);
  };
  
  // 保存客户
  const handleSave = () => {
    form.validateFields().then(values => {
      setLoading(true);
      
      // 构建保存的数据对象
      const saveData = {
        id: actionType === 'add' ? Math.max(...customerList.map(c => c.id), 0) + 1 : currentRecord.id,
        name: values.name,
        gender: values.gender,
        age: values.age,
        phone: values.phone,
        type: values.type,
        registerDate: values.registerDate.format('YYYY-MM-DD'),
        lastVisitDate: actionType === 'add' ? values.registerDate.format('YYYY-MM-DD') : currentRecord.lastVisitDate,
        visitCount: actionType === 'add' ? 0 : currentRecord.visitCount,
        totalConsumption: actionType === 'add' ? 0 : currentRecord.totalConsumption,
        address: values.address,
        remark: values.remark
      };
      
      // 检查手机号是否已存在
      if (actionType === 'add') {
        const exists = customerList.some(item => item.phone === saveData.phone);
        if (exists) {
          message.error('该手机号已存在');
          setLoading(false);
          return;
        }
      } else {
        const exists = customerList.some(item => 
          item.phone === saveData.phone && item.id !== saveData.id
        );
        if (exists) {
          message.error('该手机号已存在');
          setLoading(false);
          return;
        }
      }
      
      // 模拟保存API请求
      setTimeout(() => {
        let newList = [...customerList];
        
        if (actionType === 'add') {
          newList.push(saveData);
          message.success('客户创建成功');
        } else {
          newList = newList.map(item => 
            item.id === currentRecord.id ? saveData : item
          );
          message.success('客户信息更新成功');
        }
        
        setCustomerList(newList);
        setVisible(false);
        setLoading(false);
      }, 500);
    });
  };
  
  // 删除客户
  const deleteCustomer = (id) => {
    setLoading(true);
    
    // 模拟API请求
    setTimeout(() => {
      const newList = customerList.filter(item => item.id !== id);
      setCustomerList(newList);
      message.success('客户已删除');
      setLoading(false);
    }, 500);
  };
  
  // 新增预约
  const addAppointment = (customer) => {
    navigate('/appointment/add', { state: { customer } });
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
      title: '客户姓名',
      dataIndex: 'name',
      key: 'name',
      width: 120
    },
    {
      title: '性别/年龄',
      key: 'demographic',
      width: 120,
      render: (text, record) => `${record.gender}/${record.age}岁`
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',
      width: 140
    },
    {
      title: '客户类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type) => {
        const typeInfo = customerTypeOptions.find(item => item.value === type);
        let color = 'blue';
        if (type === 'vip') color = 'red';
        if (type === 'member') color = 'orange';
        return typeInfo ? (
          <Tag color={color}>{typeInfo.label}</Tag>
        ) : (
          <Tag color="gray">{type}</Tag>
        );
      }
    },
    {
      title: '注册日期',
      dataIndex: 'registerDate',
      key: 'registerDate',
      width: 120
    },
    {
      title: '最近就诊',
      dataIndex: 'lastVisitDate',
      key: 'lastVisitDate',
      width: 120
    },
    {
      title: '就诊次数',
      dataIndex: 'visitCount',
      key: 'visitCount',
      width: 100
    },
    {
      title: '累计消费',
      dataIndex: 'totalConsumption',
      key: 'totalConsumption',
      width: 120,
      render: (amount) => `¥${amount}`
    },
    {
      title: '操作',
      key: 'action',
      width: 280,
      render: (text, record) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => viewCustomerDetail(record)}
            size="small"
          >
            详情
          </Button>
          
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
            icon={<UserAddOutlined />} 
            onClick={() => addAppointment(record)}
            size="small"
            style={{ color: '#8B5A2B' }}
          >
            新增预约
          </Button>
          
          <Popconfirm
            title="确定要删除该客户吗？"
            onConfirm={() => deleteCustomer(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button 
              type="text" 
              icon={<DeleteOutlined />} 
              size="small"
              danger
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];
  
  return (
    <div className="customer-page">
      <div className="page-header">
        <h2 className="page-title">客户管理</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => openModal(null, 'add')}
        >
          新增客户
        </Button>
      </div>
      
      <Card className="search-card">
        <Form 
          form={searchForm} 
          layout="inline" 
          onFinish={handleSearch}
          className="search-form"
        >
          <Form.Item name="name" label="客户姓名">
            <Input placeholder="请输入客户姓名" />
          </Form.Item>
          
          <Form.Item name="phone" label="手机号码">
            <Input placeholder="请输入手机号码" />
          </Form.Item>
          
          <Form.Item name="type" label="客户类型">
            <Select placeholder="请选择客户类型">
              {customerTypeOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item name="registerDateRange" label="注册日期">
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
              <span className="stats-label">客户总数：</span>
              <Badge count={customerList.length} size="large" />
            </div>
            <div>
              <span className="stats-label">会员数量：</span>
              <Badge count={customerList.filter(c => c.type === 'member' || c.type === 'vip').length} size="large" color="orange" />
            </div>
            <div>
              <span className="stats-label">本月新增：</span>
              <Badge count={3} size="large" color="green" />
            </div>
            <div>
              <span className="stats-label">累计消费总额：</span>
              <span className="stats-value">¥{customerList.reduce((sum, c) => sum + c.totalConsumption, 0)}</span>
            </div>
          </Space>
        </div>
        
        <Table
          columns={columns}
          dataSource={customerList}
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
      
      {/* 客户表单弹窗 */}
      <Modal
        title={actionType === 'add' ? '新增客户' : '编辑客户'}
        open={visible}
        onCancel={closeModal}
        onOk={handleSave}
        confirmLoading={loading}
        width={600}
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          className="customer-form"
        >
          <Form.Item
            name="name"
            label="客户姓名"
            rules={[{ required: true, message: '请输入客户姓名' }]}
          >
            <Input placeholder="请输入客户姓名" />
          </Form.Item>
          
          <Space style={{ width: '100%' }}>
            <Form.Item
              name="gender"
              label="性别"
              rules={[{ required: true, message: '请选择性别' }]}
              style={{ flex: 1 }}
            >
              <Select placeholder="请选择性别">
                <Option value="男">男</Option>
                <Option value="女">女</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="age"
              label="年龄"
              rules={[{ required: true, message: '请输入年龄' }]}
              style={{ flex: 1 }}
            >
              <InputNumber 
                min={0} 
                max={150} 
                style={{ width: '100%' }} 
                placeholder="请输入年龄" 
                formatter={value => `${value}岁`}
                parser={value => value.replace('岁', '')}
              />
            </Form.Item>
          </Space>
          
          <Form.Item
            name="phone"
            label="手机号码"
            rules={[
              { required: true, message: '请输入手机号码' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
            ]}
          >
            <Input placeholder="请输入手机号码" />
          </Form.Item>
          
          <Form.Item
            name="type"
            label="客户类型"
            rules={[{ required: true, message: '请选择客户类型' }]}
          >
            <Select placeholder="请选择客户类型">
              {customerTypeOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="registerDate"
            label="注册日期"
            rules={[{ required: true, message: '请选择注册日期' }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          
          <Form.Item
            name="address"
            label="联系地址"
          >
            <TextArea rows={3} placeholder="请输入联系地址" />
          </Form.Item>
          
          <Form.Item
            name="remark"
            label="备注信息"
          >
            <TextArea rows={3} placeholder="请输入备注信息（如病史、过敏情况等）" />
          </Form.Item>
        </Form>
      </Modal>
      
      {/* 客户详情弹窗 */}
      <Modal
        title="客户详情"
        open={detailVisible}
        onCancel={closeDetailModal}
        width={800}
        destroyOnHidden
        footer={[
          <Button key="close" onClick={closeDetailModal}>关闭</Button>,
          <Button 
            key="edit" 
            type="primary" 
            onClick={() => {
              closeDetailModal();
              openModal(currentRecord, 'edit');
            }}
          >
            编辑
          </Button>
        ]}
      >
        {currentRecord && (
          <Tabs defaultActiveKey="info" className="customer-detail-tabs">
            <TabPane tab="基本信息" key="info">
              <div className="customer-basic-info">
                <div className="customer-avatar">
                  <Avatar size={64} icon={<UserOutlined />} />
                  <div className="customer-name">{currentRecord.name}</div>
                  <Tag 
                    color={
                      currentRecord.type === 'vip' ? 'red' : 
                      currentRecord.type === 'member' ? 'orange' : 'blue'
                    }
                  >
                    {customerTypeOptions.find(t => t.value === currentRecord.type)?.label}
                  </Tag>
                </div>
                
                <Descriptions column={2} bordered>
                  <Descriptions.Item label="性别">{currentRecord.gender}</Descriptions.Item>
                  <Descriptions.Item label="年龄">{currentRecord.age}岁</Descriptions.Item>
                  <Descriptions.Item label="手机号码">{currentRecord.phone}</Descriptions.Item>
                  <Descriptions.Item label="注册日期">{currentRecord.registerDate}</Descriptions.Item>
                  <Descriptions.Item label="最近就诊">{currentRecord.lastVisitDate}</Descriptions.Item>
                  <Descriptions.Item label="就诊次数">{currentRecord.visitCount}次</Descriptions.Item>
                  <Descriptions.Item label="累计消费">¥{currentRecord.totalConsumption}</Descriptions.Item>
                  <Descriptions.Item label="联系地址">{currentRecord.address || '-'}</Descriptions.Item>
                  <Descriptions.Item label="备注信息" span={2}>
                    {currentRecord.remark || '无'}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </TabPane>
            
            <TabPane tab={<><HistoryOutlined /> 就诊记录</>} key="history">
              <List
                itemLayout="vertical"
                dataSource={customerHistory}
                loading={loading && customerHistory.length === 0}
                renderItem={item => (
                  <List.Item
                    key={item.id}
                    extra={`¥${item.amount}`}
                    className="history-item"
                  >
                    <List.Item.Meta
                      title={
                        <div className="history-title">
                          <span className="visit-date">{item.visitDate}</span>
                          <span className="doctor-name">医生：{item.doctorName}</span>
                          <span className="department">科室：{item.department}</span>
                        </div>
                      }
                      description={
                        <div className="history-content">
                          <p><strong>诊断：</strong>{item.diagnosis}</p>
                          <p><strong>治疗：</strong>{item.treatment}</p>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
              
              {!loading && customerHistory.length === 0 && (
                <div className="no-history">暂无就诊记录</div>
              )}
            </TabPane>
          </Tabs>
        )}
      </Modal>
    </div>
  );
};

export default CustomerPage;
