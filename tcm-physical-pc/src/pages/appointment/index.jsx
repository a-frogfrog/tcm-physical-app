import React, { useState } from 'react';
import { Card, Table, Button, Input, Space, Tag, Modal, Form, DatePicker, Select, message } from 'antd';
const { TextArea } = Input;
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, FilterOutlined } from '@ant-design/icons';
import './index.css';

const { Option } = Select;
const { RangePicker } = DatePicker;

const AppointmentPage = () => {
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' 或 'edit'
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [filtered, setFiltered] = useState(false);
  
  // 模拟预约数据
  const [appointments, setAppointments] = useState([
    {
      id: 'A1001',
      customerName: '张三',
      customerPhone: '13800138000',
      doctor: '李医生',
      department: '内科',
      date: '2023-05-12',
      time: '09:30',
      status: '已确认',
      notes: '咳嗽、乏力'
    },
    {
      id: 'A1002',
      customerName: '李四',
      customerPhone: '13900139000',
      doctor: '王医生',
      department: '针灸科',
      date: '2023-05-12',
      time: '10:15',
      status: '已确认',
      notes: '颈椎不适'
    },
    {
      id: 'A1003',
      customerName: '王五',
      customerPhone: '13700137000',
      doctor: '张医生',
      department: '中医科',
      date: '2023-05-12',
      time: '14:00',
      status: '待确认',
      notes: '失眠多梦'
    },
    {
      id: 'A1004',
      customerName: '赵六',
      customerPhone: '13600136000',
      doctor: '李医生',
      department: '内科',
      date: '2023-05-12',
      time: '15:30',
      status: '已确认',
      notes: '消化不良'
    },
    {
      id: 'A1005',
      customerName: '钱七',
      customerPhone: '13500135000',
      doctor: '刘医生',
      department: '推拿科',
      date: '2023-05-13',
      time: '10:00',
      status: '已取消',
      notes: '腰肌劳损'
    }
  ]);
  
  // 科室列表
  const departments = ['内科', '外科', '中医科', '针灸科', '推拿科', '儿科', '妇科'];
  
  // 医生列表
  const doctors = ['李医生', '王医生', '张医生', '刘医生', '陈医生', '杨医生'];
  
  // 表格列定义
  const columns = [
    {
      title: '预约编号',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
    },
    {
      title: '客户信息',
      dataIndex: 'customerName',
      key: 'customerName',
      width: '15%',
      render: (name, record) => (
        <div>
          <div>{name}</div>
          <div className="customer-phone">{record.customerPhone}</div>
        </div>
      )
    },
    {
      title: '科室',
      dataIndex: 'department',
      key: 'department',
      width: '10%',
    },
    {
      title: '医生',
      dataIndex: 'doctor',
      key: 'doctor',
      width: '10%',
    },
    {
      title: '预约日期',
      dataIndex: 'date',
      key: 'date',
      width: '12%',
    },
    {
      title: '预约时间',
      dataIndex: 'time',
      key: 'time',
      width: '10%',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (status) => {
        let color = 'blue';
        if (status === '已确认') color = 'green';
        if (status === '已取消') color = 'red';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: '操作',
      key: 'action',
      width: '13%',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            icon={<EditOutlined />} 
            size="small" 
            onClick={() => handleEdit(record)}
            className="edit-btn"
          />
          <Button 
            icon={<DeleteOutlined />} 
            size="small" 
            danger 
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];
  
  // 处理搜索
  const handleSearch = () => {
    // 实际应用中这里应该是调用API进行搜索
    console.log('Search:', searchText);
  };
  
  // 处理添加预约
  const handleAdd = () => {
    setModalType('add');
    setCurrentAppointment(null);
    form.resetFields();
    setIsModalVisible(true);
  };
  
  // 处理编辑预约
  const handleEdit = (record) => {
    setModalType('edit');
    setCurrentAppointment(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };
  
  // 处理删除预约
  const handleDelete = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条预约记录吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        setAppointments(appointments.filter(item => item.id !== id));
        message.success('删除成功');
      }
    });
  };
  
  // 处理表单提交
  const handleSubmit = () => {
    form.validateFields()
      .then(values => {
        if (modalType === 'add') {
          // 添加新预约
          const newId = `A${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
          const newAppointment = {
            id: newId,
            ...values,
            status: '待确认'
          };
          setAppointments([newAppointment, ...appointments]);
          message.success('添加成功');
        } else {
          // 编辑现有预约
          setAppointments(appointments.map(item => 
            item.id === currentAppointment.id ? { ...item, ...values } : item
          ));
          message.success('修改成功');
        }
        setIsModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };
  
  // 处理筛选
  const handleFilter = () => {
    setFiltered(!filtered);
    // 实际应用中这里应该是调用API进行筛选
    console.log('Filter toggled:', filtered);
  };

  return (
    <div className="appointment-container">
      <h2 className="page-title">预约管理</h2>
      
      <Card className="appointment-card">
        <div className="card-header">
          <div className="search-bar">
            <Input
              placeholder="搜索客户姓名或电话"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
              className="search-input"
              onPressEnter={handleSearch}
            />
            <Button 
              type="primary" 
              onClick={handleSearch}
              className="search-btn"
            >
              搜索
            </Button>
            <Button 
              icon={<FilterOutlined />} 
              onClick={handleFilter}
              className="filter-btn"
              style={{ marginLeft: 8 }}
            >
              筛选
            </Button>
          </div>
          
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAdd}
            className="add-btn"
          >
            新增预约
          </Button>
        </div>
        
        {/* 筛选条件区域 */}
        {filtered && (
          <div className="filter-container">
            <Space size="middle" className="filter-fields">
              <RangePicker placeholder={['开始日期', '结束日期']} className="date-filter" />
              <Select placeholder="选择科室" style={{ width: 150 }}>
                {departments.map(dept => (
                  <Option key={dept} value={dept}>{dept}</Option>
                ))}
              </Select>
              <Select placeholder="选择医生" style={{ width: 150 }}>
                {doctors.map(doctor => (
                  <Option key={doctor} value={doctor}>{doctor}</Option>
                ))}
              </Select>
              <Select placeholder="选择状态" style={{ width: 150 }}>
                <Option value="已确认">已确认</Option>
                <Option value="待确认">待确认</Option>
                <Option value="已取消">已取消</Option>
              </Select>
              <Button type="primary" className="apply-filter-btn">应用筛选</Button>
              <Button onClick={handleFilter} className="reset-filter-btn">重置</Button>
            </Space>
          </div>
        )}
        
        {/* 预约表格 */}
        <Table 
          columns={columns} 
          dataSource={appointments} 
          rowKey="id"
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
          className="appointment-table"
        />
      </Card>
      
      {/* 新增/编辑预约模态框 */}
      <Modal
        title={modalType === 'add' ? '新增预约' : '编辑预约'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
        destroyOnHidden={true}
        maskClosable={false}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          name="appointmentForm"
        >
          <Form.Item
            name="customerName"
            label="客户姓名"
            rules={[{ required: true, message: '请输入客户姓名' }]}
          >
            <Input placeholder="请输入客户姓名" />
          </Form.Item>
          
          <Form.Item
            name="customerPhone"
            label="联系电话"
            rules={[{ required: true, message: '请输入联系电话' }]}
          >
            <Input placeholder="请输入联系电话" />
          </Form.Item>
          
          <Form.Item
            name="department"
            label="科室"
            rules={[{ required: true, message: '请选择科室' }]}
          >
            <Select placeholder="请选择科室">
              {departments.map(dept => (
                <Option key={dept} value={dept}>{dept}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="doctor"
            label="医生"
            rules={[{ required: true, message: '请选择医生' }]}
          >
            <Select placeholder="请选择医生">
              {doctors.map(doctor => (
                <Option key={doctor} value={doctor}>{doctor}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="date"
            label="预约日期"
            rules={[{ required: true, message: '请选择预约日期' }]}
          >
            <DatePicker placeholder="请选择预约日期" format="YYYY-MM-DD" />
          </Form.Item>
          
          <Form.Item
            name="time"
            label="预约时间"
            rules={[{ required: true, message: '请选择预约时间' }]}
          >
            <Select placeholder="请选择预约时间">
              {['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'].map(time => (
                <Option key={time} value={time}>{time}</Option>
              ))}
            </Select>
          </Form.Item>
          
          {modalType === 'edit' && (
            <Form.Item
              name="status"
              label="状态"
              rules={[{ required: true, message: '请选择状态' }]}
            >
              <Select placeholder="请选择状态">
                <Option value="已确认">已确认</Option>
                <Option value="待确认">待确认</Option>
                <Option value="已取消">已取消</Option>
              </Select>
            </Form.Item>
          )}
          
          <Form.Item
            name="notes"
            label="症状描述"
          >
            <TextArea rows={3} placeholder="请输入客户症状描述" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AppointmentPage;
