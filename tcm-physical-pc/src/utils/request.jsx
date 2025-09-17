import axios from 'axios';
import { message } from 'antd';

// 创建axios实例 - 使用import.meta.env来获取环境变量
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  timeout: 10000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 从localStorage获取token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 统一错误处理
    if (error.response?.status === 401) {
      // token过期或未认证，清除本地存储并跳转到登录页
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
      window.location.href = '/login';
      message.error('登录已过期，请重新登录');
    }
    
    // 将错误继续抛出，让调用处也能处理
    return Promise.reject(error);
  }
);

export default instance;