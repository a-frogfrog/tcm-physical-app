import React, { useState, useEffect } from 'react';
import {
  Table,
  Card,
  Button,
  Input,
  Space,
  Tag,
  Modal,
  Form,
  DatePicker,
  Select,
  message,
  Popconfirm,
  Divider,
  Checkbox,
  Radio,
  InputNumber,
} from 'antd';
const { TextArea } = Input;
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import './index.css';

const { Option } = Select;
const { RangePicker, WeekPicker, MonthPicker } = DatePicker;
const { Group: RadioGroup, Button: RadioButton } = Radio;

const SchedulePage = () => {
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [scheduleList, setScheduleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [actionType, setActionType] = useState('add'); // add 或 edit
  const [viewMode, setViewMode] = useState('week'); // day, week, month
  const [currentDate, setCurrentDate] = useState(moment());
  const navigate = useNavigate();

  // 模拟医生数据
  const doctorOptions = [
    { id: 1, name: '张医生', specialty: '内科' },
    { id: 2, name: '李医生', specialty: '针灸' },
    { id: 3, name: '王医生', specialty: '推拿' },
    { id: 4, name: '赵医生', specialty: '妇科' },
  ];

  // 模拟班次数据
  const shiftOptions = [
    { id: 'morning', name: '上午', startTime: '08:00', endTime: '12:00' },
    { id: 'afternoon', name: '下午', startTime: '13:30', endTime: '17:30' },
    { id: 'evening', name: '晚上', startTime: '18:30', endTime: '21:00' },
  ];

  // 模拟获取排班列表数据
  useEffect(() => {
    fetchScheduleList();
  }, [currentDate, viewMode]);

  // 获取排班列表
  const fetchScheduleList = (params = {}) => {
    setLoading(true);

    // 模拟API请求
    setTimeout(() => {
      // 根据当前视图模式生成不同日期范围的数据
      let mockData = [];
      const baseDate = currentDate
        .clone()
        .startOf(viewMode === 'week' ? 'week' : viewMode);

      // 生成7天（周视图）或30天（月视图）的数据
      const daysCount = viewMode === 'week' ? 7 : viewMode === 'month' ? 30 : 1;

      for (let d = 0; d < daysCount; d++) {
        const scheduleDate = baseDate
          .clone()
          .add(d, 'days')
          .format('YYYY-MM-DD');

        // 为每天添加医生排班
        doctorOptions.forEach((doctor) => {
          // 随机生成是否排班
          const isScheduled = Math.random() > 0.3;
          if (isScheduled) {
            // 随机选择1-2个班次
            const shiftsCount = Math.floor(Math.random() * 2) + 1;
            const selectedShifts = [];

            for (let s = 0; s < shiftsCount; s++) {
              // 避免重复选择相同班次
              let shiftIndex;
              do {
                shiftIndex = Math.floor(Math.random() * shiftOptions.length);
              } while (selectedShifts.includes(shiftIndex));

              selectedShifts.push(shiftIndex);

              mockData.push({
                id: `${doctor.id}-${scheduleDate}-${shiftOptions[shiftIndex].id}`,
                doctorId: doctor.id,
                doctorName: doctor.name,
                doctorSpecialty: doctor.specialty,
                scheduleDate,
                shiftId: shiftOptions[shiftIndex].id,
                shiftName: shiftOptions[shiftIndex].name,
                startTime: shiftOptions[shiftIndex].startTime,
                endTime: shiftOptions[shiftIndex].endTime,
                maxAppointments: Math.floor(Math.random() * 10) + 5, // 5-15个预约名额
                currentAppointments: Math.floor(Math.random() * 5), // 0-4个已预约
                status: 'normal', // normal, rest, leave
                remark: Math.random() > 0.8 ? '限约VIP客户' : '',
              });
            }
          }
        });
      }

      // 应用筛选条件
      let filteredData = [...mockData];

      if (params.doctorId) {
        filteredData = filteredData.filter(
          (item) => item.doctorId === params.doctorId,
        );
      }

      if (params.scheduleDate) {
        filteredData = filteredData.filter(
          (item) =>
            item.scheduleDate === params.scheduleDate.format('YYYY-MM-DD'),
        );
      }

      if (params.status) {
        filteredData = filteredData.filter(
          (item) => item.status === params.status,
        );
      }

      setScheduleList(filteredData);
      setLoading(false);
    }, 500);
  };

  // 搜索处理
  const handleSearch = () => {
    searchForm.validateFields().then((values) => {
      const params = {
        doctorId: values.doctorId || '',
        scheduleDate: values.scheduleDate || null,
        status: values.status || '',
      };
      fetchScheduleList(params);
    });
  };

  // 重置搜索
  const handleReset = () => {
    searchForm.resetFields();
    fetchScheduleList();
  };

  // 切换视图模式
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // 切换日期
  const handleDateChange = (date) => {
    if (date) {
      setCurrentDate(date);
    }
  };

  // 前一天/周/月
  const prevPeriod = () => {
    setCurrentDate(currentDate.clone().subtract(1, viewMode));
  };

  // 后一天/周/月
  const nextPeriod = () => {
    setCurrentDate(currentDate.clone().add(1, viewMode));
  };

  // 今天/本周/本月
  const today = () => {
    setCurrentDate(moment());
  };

  // 打开表单弹窗
  const openModal = (record, type) => {
    setActionType(type);
    setVisible(true);

    if (type === 'edit' && record) {
      setCurrentRecord(record);
      form.setFieldsValue({
        doctorId: record.doctorId,
        scheduleDate: moment(record.scheduleDate),
        shiftId: record.shiftId,
        maxAppointments: record.maxAppointments,
        status: record.status,
        remark: record.remark,
      });
    } else {
      setCurrentRecord(null);
      form.resetFields();
      // 默认值设置
      form.setFieldsValue({
        scheduleDate: moment(),
        status: 'normal',
        maxAppointments: 10,
      });
    }
  };

  // 关闭表单弹窗
  const closeModal = () => {
    setVisible(false);
    form.resetFields();
  };

  // 批量设置排班
  const batchSetSchedule = () => {
    message.info('批量排班功能开发中...');
    // 实际项目中打开批量排班弹窗
  };

  // 保存排班
  const handleSave = () => {
    form.validateFields().then((values) => {
      setLoading(true);

      const doctor = doctorOptions.find((d) => d.id === values.doctorId);
      const shift = shiftOptions.find((s) => s.id === values.shiftId);
      const scheduleDate = values.scheduleDate.format('YYYY-MM-DD');

      // 构建保存的数据对象
      const saveData = {
        id:
          actionType === 'add'
            ? `${values.doctorId}-${scheduleDate}-${values.shiftId}`
            : currentRecord.id,
        doctorId: values.doctorId,
        doctorName: doctor?.name || '',
        doctorSpecialty: doctor?.specialty || '',
        scheduleDate,
        shiftId: values.shiftId,
        shiftName: shift?.name || '',
        startTime: shift?.startTime || '',
        endTime: shift?.endTime || '',
        maxAppointments: values.maxAppointments,
        currentAppointments:
          actionType === 'add' ? 0 : currentRecord.currentAppointments,
        status: values.status,
        remark: values.remark,
      };

      // 检查是否已存在相同的排班
      if (actionType === 'add') {
        const exists = scheduleList.some(
          (item) =>
            item.doctorId === saveData.doctorId &&
            item.scheduleDate === saveData.scheduleDate &&
            item.shiftId === saveData.shiftId,
        );

        if (exists) {
          message.error('该医生在该日期的该班次已存在排班');
          setLoading(false);
          return;
        }
      }

      // 模拟保存API请求
      setTimeout(() => {
        let newList = [...scheduleList];

        if (actionType === 'add') {
          newList.push(saveData);
          message.success('排班创建成功');
        } else {
          newList = newList.map((item) =>
            item.id === currentRecord.id ? saveData : item,
          );
          message.success('排班更新成功');
        }

        setScheduleList(newList);
        setVisible(false);
        setLoading(false);
      }, 500);
    });
  };

  // 删除排班
  const deleteSchedule = (id) => {
    setLoading(true);

    // 模拟API请求
    setTimeout(() => {
      const newList = scheduleList.filter((item) => item.id !== id);
      setScheduleList(newList);
      message.success('排班已删除');
      setLoading(false);
    }, 500);
  };

  // 查看预约列表
  const viewAppointments = (record) => {
    navigate(
      `/appointment?doctorId=${record.doctorId}&date=${record.scheduleDate}&shiftId=${record.shiftId}`,
    );
  };

  // 格式化显示当前日期范围
  const formatDateRange = () => {
    if (viewMode === 'day') {
      return currentDate.format('YYYY年MM月DD日');
    } else if (viewMode === 'week') {
      const start = currentDate.clone().startOf('week');
      const end = currentDate.clone().endOf('week');
      return `${start.format('MM月DD日')}-${end.format('MM月DD日')} 周视图`;
    } else if (viewMode === 'month') {
      return currentDate.format('YYYY年MM月') + ' 月视图';
    }
    return '';
  };

  // 表格列定义
  const columns = [
    {
      title: '序号',
      key: 'index',
      width: 80,
      render: (text, record, index) => index + 1,
    },
    {
      title: '医生信息',
      key: 'doctor',
      width: 200,
      render: (text, record) => (
        <div>
          <div>{record.doctorName}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {record.doctorSpecialty}
          </div>
        </div>
      ),
    },
    {
      title: '日期',
      dataIndex: 'scheduleDate',
      key: 'scheduleDate',
      width: 120,
      render: (date) => moment(date).format('YYYY-MM-DD'),
    },
    {
      title: '星期',
      key: 'weekday',
      width: 80,
      render: (text, record) => {
        const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
        return `周${weekdays[moment(record.scheduleDate).day()]}`;
      },
    },
    {
      title: '班次',
      dataIndex: 'shiftName',
      key: 'shiftName',
      width: 100,
    },
    {
      title: '时间',
      key: 'time',
      width: 160,
      render: (text, record) => `${record.startTime}-${record.endTime}`,
    },
    {
      title: '预约情况',
      key: 'appointment',
      width: 160,
      render: (text, record) => (
        <div>
          <span>
            {record.currentAppointments}/{record.maxAppointments}
          </span>
          <div className='progress-bar'>
            <div
              className='progress'
              style={{
                width: `${(record.currentAppointments / record.maxAppointments) * 100}%`,
              }}></div>
          </div>
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => {
        let label, color;
        switch (status) {
          case 'normal':
            label = '正常';
            color = 'green';
            break;
          case 'rest':
            label = '休息';
            color = 'orange';
            break;
          case 'leave':
            label = '请假';
            color = 'red';
            break;
          default:
            label = status;
            color = 'gray';
        }
        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      width: 240,
      render: (text, record) => (
        <Space size='small'>
          <Button
            type='text'
            size='small'
            onClick={() => viewAppointments(record)}>
            查看预约
          </Button>

          <Button
            type='text'
            icon={<EditOutlined />}
            onClick={() => openModal(record, 'edit')}
            size='small'>
            编辑
          </Button>

          <Popconfirm
            title='确定要删除该排班吗？'
            onConfirm={() => deleteSchedule(record.id)}
            okText='确定'
            cancelText='取消'>
            <Button type='text' icon={<DeleteOutlined />} size='small' danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className='schedule-page'>
      <div className='page-header'>
        <h2 className='page-title'>医生排班</h2>
        <Space>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => openModal(null, 'add')}>
            新增排班
          </Button>
          <Button type='default' onClick={batchSetSchedule}>
            批量排班
          </Button>
        </Space>
      </div>

      <Card className='calendar-card'>
        <div className='calendar-controls'>
          <RadioGroup
            value={viewMode}
            onChange={(e) => handleViewModeChange(e.target.value)}>
            <RadioButton value='day'>日视图</RadioButton>
            <RadioButton value='week'>周视图</RadioButton>
            <RadioButton value='month'>月视图</RadioButton>
          </RadioGroup>

          <div className='date-nav'>
            <Button icon={<CalendarOutlined />} onClick={today} size='small'>
              今天
            </Button>
            <Button onClick={prevPeriod} size='small'>
              前
              {viewMode === 'day'
                ? '一天'
                : viewMode === 'week'
                  ? '一周'
                  : '一月'}
            </Button>
            <span className='current-date'>{formatDateRange()}</span>
            <Button onClick={nextPeriod} size='small'>
              后
              {viewMode === 'day'
                ? '一天'
                : viewMode === 'week'
                  ? '一周'
                  : '一月'}
            </Button>
          </div>

          {viewMode === 'day' && (
            <DatePicker
              value={currentDate}
              onChange={handleDateChange}
              format='YYYY-MM-DD'
            />
          )}

          {viewMode === 'week' && (
            <WeekPicker
              value={currentDate}
              onChange={handleDateChange}
              format='YYYY年第WW周'
            />
          )}

          {viewMode === 'month' && (
            <MonthPicker
              value={currentDate}
              onChange={handleDateChange}
              format='YYYY-MM'
            />
          )}
        </div>
      </Card>

      <Card className='search-card'>
        <Form
          form={searchForm}
          layout='inline'
          onFinish={handleSearch}
          className='search-form'>
          <Form.Item name='doctorId' label='医生'>
            <Select placeholder='请选择医生'>
              {doctorOptions.map((doctor) => (
                <Option key={doctor.id} value={doctor.id}>
                  {doctor.name}（{doctor.specialty}）
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name='scheduleDate' label='日期'>
            <DatePicker format='YYYY-MM-DD' />
          </Form.Item>

          <Form.Item name='status' label='状态'>
            <Select placeholder='请选择状态'>
              <Option value='normal'>正常</Option>
              <Option value='rest'>休息</Option>
              <Option value='leave'>请假</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type='primary'
                icon={<SearchOutlined />}
                htmlType='submit'>
                搜索
              </Button>
              <Button onClick={handleReset}>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card className='table-card'>
        <Table
          columns={columns}
          dataSource={scheduleList}
          rowKey='id'
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
          scroll={{ x: 'max-content' }}
        />
      </Card>

      {/* 排班表单弹窗 */}
      <Modal
        title={actionType === 'add' ? '新增医生排班' : '编辑医生排班'}
        open={visible}
        onCancel={closeModal}
        onOk={handleSave}
        confirmLoading={loading}
        width={600}
        destroyOnHidden>
        <Form form={form} layout='vertical' className='schedule-form'>
          <Form.Item
            name='doctorId'
            label='医生'
            rules={[{ required: true, message: '请选择医生' }]}>
            <Select placeholder='请选择医生'>
              {doctorOptions.map((doctor) => (
                <Option key={doctor.id} value={doctor.id}>
                  {doctor.name}（{doctor.specialty}）
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name='scheduleDate'
            label='日期'
            rules={[{ required: true, message: '请选择日期' }]}>
            <DatePicker format='YYYY-MM-DD' />
          </Form.Item>

          <Form.Item
            name='shiftId'
            label='班次'
            rules={[{ required: true, message: '请选择班次' }]}>
            <Select placeholder='请选择班次'>
              {shiftOptions.map((shift) => (
                <Option key={shift.id} value={shift.id}>
                  {shift.name}（{shift.startTime}-{shift.endTime}）
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name='maxAppointments'
            label='最大预约数'
            rules={[
              { required: true, message: '请输入最大预约数' },
              { type: 'number', min: 1, message: '最大预约数必须大于0' },
            ]}>
            <InputNumber
              min={1}
              style={{ width: '100%' }}
              placeholder='请输入最大预约数'
            />
          </Form.Item>

          <Form.Item
            name='status'
            label='状态'
            rules={[{ required: true, message: '请选择状态' }]}>
            <Select placeholder='请选择状态'>
              <Option value='normal'>正常</Option>
              <Option value='rest'>休息</Option>
              <Option value='leave'>请假</Option>
            </Select>
          </Form.Item>

          <Form.Item name='remark' label='备注'>
            <TextArea rows={3} placeholder='请输入备注信息' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SchedulePage;
