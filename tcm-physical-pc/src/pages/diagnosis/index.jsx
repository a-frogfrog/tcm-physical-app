import React, { useState, useEffect } from 'react';
import { 
  Table, Card, Button, Input, Space, Tag, Modal, Form, 
  DatePicker, Select, message, Popconfirm 
} from 'antd';
const { TextArea } = Input;
import { 
  PlusOutlined, EditOutlined, EyeOutlined, 
  CheckCircleOutlined, CloseCircleOutlined, SearchOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import './index.css';

const { Option } = Select;
const { RangePicker } = DatePicker;

const DiagnosisPage = () => {
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [diagnosisList, setDiagnosisList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [actionType, setActionType] = useState('add'); // add 或 edit
  const navigate = useNavigate();
  
  // 模拟医生数据
  const doctorOptions = [
    { id: 1, name: '张医生' },
    { id: 2, name: '李医生' },
    { id: 3, name: '王医生' },
    { id: 4, name: '赵医生' },
  ];
  
  // 模拟诊断状态
  const statusOptions = [
    { label: '待接诊', value: 'pending', color: 'orange' },
    { label: '接诊中', value: 'processing', color: 'blue' },
    { label: '已完成', value: 'completed', color: 'green' },
    { label: '已取消', value: 'cancelled', color: 'red' },
  ];
  
  // 模拟获取接诊列表数据
  useEffect(() => {
    fetchDiagnosisList();
  }, []);
  
  // 获取接诊列表
  const fetchDiagnosisList = (params = {}) => {
    setLoading(true);
    
    // 模拟API请求
    setTimeout(() => {
      const mockData = [
        {
          id: '1001',
          patientName: '张三',
          gender: '男',
          age: 35,
          appointmentNo: 'AP20230615001',
          doctorName: '张医生',
          visitDate: '2023-06-15',
          status: 'completed',
          symptoms: '头痛、乏力',
          diagnosis: '风热感冒',
          prescription: '银翘散加减',
          createdAt: '2023-06-15 09:30:00'
        },
        {
          id: '1002',
          patientName: '李四',
          gender: '女',
          age: 28,
          appointmentNo: 'AP20230615002',
          doctorName: '李医生',
          visitDate: '2023-06-15',
          status: 'processing',
          symptoms: '失眠、多梦',
          diagnosis: '',
          prescription: '',
          createdAt: '2023-06-15 10:15:00'
        },
        {
          id: '1003',
          patientName: '王五',
          gender: '男',
          age: 45,
          appointmentNo: 'AP20230615003',
          doctorName: '王医生',
          visitDate: '2023-06-15',
          status: 'pending',
          symptoms: '腰酸背痛',
          diagnosis: '',
          prescription: '',
          createdAt: '2023-06-14 16:45:00'
        },
        {
          id: '1004',
          patientName: '赵六',
          gender: '女',
          age: 52,
          appointmentNo: 'AP20230614001',
          doctorName: '赵医生',
          visitDate: '2023-06-14',
          status: 'cancelled',
          symptoms: '胃痛',
          diagnosis: '',
          prescription: '',
          createdAt: '2023-06-13 14:20:00'
        },
        {
          id: '1005',
          patientName: '钱七',
          gender: '男',
          age: 38,
          appointmentNo: 'AP20230614002',
          doctorName: '张医生',
          visitDate: '2023-06-14',
          status: 'completed',
          symptoms: '咳嗽、痰多',
          diagnosis: '痰湿阻肺',
          prescription: '二陈汤加减',
          createdAt: '2023-06-13 09:10:00'
        },
      ];
      
      // 应用筛选条件
      let filteredData = [...mockData];
      
      if (params.patientName) {
        filteredData = filteredData.filter(item => 
          item.patientName.includes(params.patientName)
        );
      }
      
      if (params.appointmentNo) {
        filteredData = filteredData.filter(item => 
          item.appointmentNo.includes(params.appointmentNo)
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
        filteredData = filteredData.filter(item => 
          item.visitDate >= startDate && item.visitDate <= endDate
        );
      }
      
      setDiagnosisList(filteredData);
      setLoading(false);
    }, 500);
  };
  
  // 搜索处理
  const handleSearch = () => {
    searchForm.validateFields().then(values => {
      const params = {
        patientName: values.patientName || '',
        appointmentNo: values.appointmentNo || '',
        status: values.status || '',
        dateRange: values.dateRange || null
      };
      fetchDiagnosisList(params);
    });
  };
  
  // 重置搜索
  const handleReset = () => {
    searchForm.resetFields();
    fetchDiagnosisList();
  };
  
  // 打开表单弹窗
  const openModal = (record, type) => {
    setActionType(type);
    setVisible(true);
    
    if (type === 'edit' && record) {
      setCurrentRecord(record);
      form.setFieldsValue({
        patientName: record.patientName,
        gender: record.gender,
        age: record.age,
        appointmentNo: record.appointmentNo,
        doctorId: doctorOptions.find(d => d.name === record.doctorName)?.id,
        visitDate: moment(record.visitDate),
        status: record.status,
        symptoms: record.symptoms,
        diagnosis: record.diagnosis,
        prescription: record.prescription
      });
    } else {
      setCurrentRecord(null);
      form.resetFields();
      // 默认值设置
      form.setFieldsValue({
        visitDate: moment(),
        status: 'pending'
      });
    }
  };
  
  // 关闭表单弹窗
  const closeModal = () => {
    setVisible(false);
    form.resetFields();
  };
  
  // 保存接诊记录
  const handleSave = () => {
    form.validateFields().then(values => {
      setLoading(true);
      
      // 构建保存的数据对象
      const saveData = {
        id: actionType === 'add' ? `10${Math.floor(Math.random() * 100)}` : currentRecord.id,
        patientName: values.patientName,
        gender: values.gender,
        age: values.age,
        appointmentNo: values.appointmentNo,
        doctorName: doctorOptions.find(d => d.id === values.doctorId)?.name || '',
        doctorId: values.doctorId,
        visitDate: values.visitDate.format('YYYY-MM-DD'),
        status: values.status,
        symptoms: values.symptoms,
        diagnosis: values.diagnosis,
        prescription: values.prescription,
        createdAt: actionType === 'add' 
          ? moment().format('YYYY-MM-DD HH:mm:ss') 
          : currentRecord.createdAt
      };
      
      // 模拟保存API请求
      setTimeout(() => {
        let newList = [...diagnosisList];
        
        if (actionType === 'add') {
          newList.unshift(saveData);
          message.success('接诊记录创建成功');
        } else {
          newList = newList.map(item => 
            item.id === currentRecord.id ? saveData : item
          );
          message.success('接诊记录更新成功');
        }
        
        setDiagnosisList(newList);
        setVisible(false);
        setLoading(false);
      }, 500);
    });
  };
  
  // 查看病历详情
  const viewMedicalRecord = (record) => {
    navigate(`/diagnosis/${record.id}/detail`, { state: { record } });
  };
  
  // 取消接诊
  const cancelDiagnosis = (id) => {
    setLoading(true);
    
    // 模拟API请求
    setTimeout(() => {
      const newList = diagnosisList.map(item => 
        item.id === id ? { ...item, status: 'cancelled' } : item
      );
      
      setDiagnosisList(newList);
      message.success('已取消接诊');
      setLoading(false);
    }, 500);
  };
  
  // 完成接诊
  const completeDiagnosis = (id) => {
    const record = diagnosisList.find(item => item.id === id);
    openModal({ ...record, status: 'completed' }, 'edit');
  };
  
  // 表格列定义
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (text, record, index) => index + 1
    },
    {
      title: '患者姓名',
      dataIndex: 'patientName',
      key: 'patientName',
      width: 120
    },
    {
      title: '性别/年龄',
      key: 'demographic',
      width: 120,
      render: (text, record) => `${record.gender}/${record.age}岁`
    },
    {
      title: '预约编号',
      dataIndex: 'appointmentNo',
      key: 'appointmentNo',
      width: 140
    },
    {
      title: '接诊医生',
      dataIndex: 'doctorName',
      key: 'doctorName',
      width: 120
    },
    {
      title: '就诊日期',
      dataIndex: 'visitDate',
      key: 'visitDate',
      width: 120
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => {
        const statusInfo = statusOptions.find(item => item.value === status);
        return statusInfo ? (
          <Tag color={statusInfo.color}>{statusInfo.label}</Tag>
        ) : (
          <Tag color="gray">{status}</Tag>
        );
      }
    },
    {
      title: '主要症状',
      dataIndex: 'symptoms',
      key: 'symptoms',
      ellipsis: true
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
            onClick={() => viewMedicalRecord(record)}
            size="small"
          >
            病历详情
          </Button>
          
          {record.status !== 'completed' && record.status !== 'cancelled' && (
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => openModal(record, 'edit')}
              size="small"
            >
              编辑
            </Button>
          )}
          
          {record.status === 'pending' && (
            <Button 
              type="text" 
              icon={<CheckCircleOutlined />} 
              onClick={() => openModal({ ...record, status: 'processing' }, 'edit')}
              size="small"
              style={{ color: 'green' }}
            >
              开始接诊
            </Button>
          )}
          
          {record.status === 'processing' && (
            <Button 
              type="text" 
              icon={<CheckCircleOutlined />} 
              onClick={() => completeDiagnosis(record.id)}
              size="small"
              style={{ color: 'green' }}
            >
              完成接诊
            </Button>
          )}
          
          {(record.status === 'pending' || record.status === 'processing') && (
            <Popconfirm
              title="确定要取消接诊吗？"
              onConfirm={() => cancelDiagnosis(record.id)}
              okText="确定"
              cancelText="取消"
            >
              <Button 
                type="text" 
                icon={<CloseCircleOutlined />} 
                size="small"
                style={{ color: 'red' }}
              >
                取消
              </Button>
            </Popconfirm>
          )}
        </Space>
      )
    }
  ];
  
  return (
    <div className="diagnosis-page">
      <div className="page-header">
        <h2 className="page-title">接诊管理</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => openModal(null, 'add')}
        >
          新增接诊记录
        </Button>
      </div>
      
      <Card className="search-card">
        <Form 
          form={searchForm} 
          layout="inline" 
          onFinish={handleSearch}
          className="search-form"
        >
          <Form.Item name="patientName" label="患者姓名">
            <Input placeholder="请输入患者姓名" />
          </Form.Item>
          
          <Form.Item name="appointmentNo" label="预约编号">
            <Input placeholder="请输入预约编号" />
          </Form.Item>
          
          <Form.Item name="status" label="状态">
            <Select placeholder="请选择状态">
              {statusOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item name="dateRange" label="就诊日期">
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
        <Table
          columns={columns}
          dataSource={diagnosisList}
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
      
      {/* 接诊记录表单弹窗 */}
      <Modal
        title={actionType === 'add' ? '新增接诊记录' : '编辑接诊记录'}
        open={visible}
        onCancel={closeModal}
        onOk={handleSave}
        confirmLoading={loading}
        width={700}
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          className="diagnosis-form"
        >
          <Form.Item
            name="patientName"
            label="患者姓名"
            rules={[{ required: true, message: '请输入患者姓名' }]}
          >
            <Input placeholder="请输入患者姓名" />
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
              <Input type="number" placeholder="请输入年龄" />
            </Form.Item>
          </Space>
          
          <Form.Item
            name="appointmentNo"
            label="预约编号"
            rules={[{ required: true, message: '请输入预约编号' }]}
          >
            <Input placeholder="请输入预约编号" />
          </Form.Item>
          
          <Space style={{ width: '100%' }}>
            <Form.Item
              name="doctorId"
              label="接诊医生"
              rules={[{ required: true, message: '请选择接诊医生' }]}
              style={{ flex: 1 }}
            >
              <Select placeholder="请选择接诊医生">
                {doctorOptions.map(doctor => (
                  <Option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item
              name="visitDate"
              label="就诊日期"
              rules={[{ required: true, message: '请选择就诊日期' }]}
              style={{ flex: 1 }}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </Space>
          
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              {statusOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="symptoms"
            label="症状描述"
            rules={[{ required: true, message: '请输入症状描述' }]}
          >
            <TextArea rows={3} placeholder="请输入患者症状描述" />
          </Form.Item>
          
          <Form.Item
            name="diagnosis"
            label="诊断结果"
            rules={[
              { 
                required: (form.getFieldValue('status') === 'completed'), 
                message: '完成接诊时必须填写诊断结果' 
              }
            ]}
          >
            <TextArea rows={3} placeholder="请输入诊断结果" />
          </Form.Item>
          
          <Form.Item
            name="prescription"
            label="处方"
          >
            <TextArea rows={4} placeholder="请输入处方内容" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DiagnosisPage;
    