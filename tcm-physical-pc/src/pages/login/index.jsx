import React, { useState } from 'react';
import { Card, Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { logins } from '../../api/login';
import './index.css';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 处理登录表单提交
  const handleLogin = async (values) => {
    setLoading(true);

    try {
      // 1. 账号去除空格（避免用户误输入空格导致登录失败）
      const response = await logins({
        account: values.account.trim(),
        password: values.password,
        code: ''
      });
      
      // 根据后端实际响应结构判断（code=0为成功）
      if (response && response.code === 0) {
        // 2. 存储userInfo前判断是否存在（避免存储undefined导致后续JSON解析错误）
        const userInfo = response.data?.user || {};
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.setItem('token', response.data.token);
        
        message.success('登录成功');
        // 确保跳转执行（避免message弹窗阻塞问题）
        navigate('/home');
      } else {
        // 处理API返回的错误
        const errorMsg = response?.message || '用户名或密码错误';
        message.error(errorMsg);
      }
    } catch (error) {
      // 处理网络错误或API错误
      console.error('Login error:', error);
      
      if (error.code === 'ERR_NETWORK') {
        message.error('网络连接失败，请检查服务器状态');
      } else if (error.response) {
        // 服务器返回了错误状态码
        const errorMsg = error.response.data?.message || '登录失败，请重试';
        message.error(errorMsg);
      } else {
        message.error('登录失败，请重试');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-container'>
      <Card className='login-card' title='中医馆收银管理系统'>
        <Form
          name='loginForm'
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          layout='vertical'>
          <Form.Item
            name="account"
            label="用户名"
            rules={[
              { required: true, message: '请输入用户名' },
              { whitespace: true, message: '用户名不能包含空格' } // 前端拦截空格输入
            ]}
          >
            <Input 
              prefix={<UserOutlined className="login-icon" />} 
              placeholder="请输入用户名" 
              className="login-input"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码长度不能少于6位' } // 避免短密码无效请求
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined className="login-icon" />} 
              placeholder="请输入密码" 
              className="login-input"
            />
          </Form.Item>

          <Form.Item name='remember' valuePropName='checked'>
            <Checkbox className='remember-checkbox'>记住我</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="login-button"
              loading={loading}
              block // 按钮占满宽度，提升操作体验
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;