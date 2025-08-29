import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'font-awesome/css/font-awesome.min.css';
import { logins } from '../../api/Login.js';
import { loginSync } from '../../store/modules/login';

const Login = () => {
  // 状态管理
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [account, setAccount] = useState('19111111111');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const particlesRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 组件挂载初始化
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    particlesRef.current = document.getElementById('particles');
    createParticles();

    return () => {
      clearTimeout(timer);
      const particles = particlesRef.current?.querySelectorAll('div');
      particles?.forEach(particle => particle.remove());
    };
  }, []);

  // 切换密码显示/隐藏
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLogging(true);
    try {
      const result = await dispatch(loginSync({ account, password }));
      
      if (result.code === 0) {
        navigate('/');
      } else {
        alert(result.msg);
      }
    } catch (error) {
      alert('登录失败: ' + error.message);
    } finally {
      setIsLogging(false);
    }
  };

  // 创建粒子背景
  const createParticles = () => {
    if (!particlesRef.current) return;
    
    const particleCount = 80;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 20 + 10;
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        opacity: ${Math.random() * 0.6 + 0.2};
        top: ${posY}%;
        left: ${posX}%;
        animation: float ${duration}s ease-in-out ${delay}s infinite;
        z-index: 1;
      `;
      
      particlesRef.current.appendChild(particle);
    }
  };

  return (
    <div className="font-inter min-h-screen overflow-hidden flex items-center justify-center bg-sky-50">
      {/* 固定背景层 - 淡蓝色风格 */}
      <div className="fixed inset-0 z-0">
        {/* 渐变背景：淡蓝色为主的透明渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br 
                      from-sky-100 
                      via-blue-100/70 
                      to-cyan-100/60 
                      animate-gradientShift"></div>
        
        {/* 装饰性圆形元素：淡蓝色透明效果 */}
        <div className="absolute w-96 h-96 rounded-full bg-blue-200/30 top-0 -left-40 animate-float animate-rotate"></div>
        <div className="absolute w-80 h-80 rounded-full bg-sky-200/20 bottom-0 -right-20 animate-float-delay-1"></div>
        <div className="absolute w-64 h-64 rounded-full bg-cyan-200/25 top-1/3 right-1/4 animate-float-delay-2 animate-rotate-reverse"></div>
        <div className="absolute w-48 h-48 rounded-full bg-blue-100/30 bottom-1/3 left-1/4 animate-float-delay-3"></div>
        
        {/* 网格背景调整为淡色 */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4ODgiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTYwIDBoLTYwdjYwaDYwdjAweiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        
        {/* 粒子效果容器 */}
        <div id="particles" className="absolute inset-0" ref={particlesRef}></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4 py-8">
        {/* 半透明玻璃态卡片 - 适配淡蓝色背景（优化内边距避免溢出） */}
        <div className={`bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl 
                      transform transition-all duration-1000 
                      hover:shadow-blue-200/50 hover:shadow-cyan-200/30 
                      ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* 御和堂logo区域（优化间距，减少垂直占用） */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-600 text-white mb-2">
              <i className="fa fa-building text-xl sm:text-2xl"></i>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-blue-800 mb-1">御和堂</h1>
            <p className="text-blue-500/80 text-sm">专业健康服务平台</p>
          </div>

          {/* 移除原"账户登录"标题区域，直接显示表单说明 */}
          <p className="text-center text-blue-600/70 mb-6">请输入您的账号信息进行登录</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <i className="fa fa-user text-blue-400"></i>
              </div>
              <input 
                type="text" 
                name="username"
                value={account}
                onChange={e => setAccount(e.target.value)}
                placeholder="用户名或邮箱" 
                className="w-full pl-12 pr-4 py-2.5 sm:py-3 rounded-lg bg-white/60 border border-blue-100 text-blue-800 placeholder-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-300/50 transition-all"
                required
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <i className="fa fa-lock text-blue-400"></i>
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="密码" 
                className="w-full pl-12 pr-12 py-2.5 sm:py-3 rounded-lg bg-white/60 border border-blue-100 text-blue-800 placeholder-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-300/50 transition-all"
                required
              />
              <div 
                className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <i className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'} text-blue-400 hover:text-blue-600 transition-colors`}></i>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded bg-blue-50 border-blue-200 text-blue-500 focus:ring-blue-300/50" />
                <span className="text-blue-700/80 text-sm">记住我</span>
              </label>
              <a href="/forgot-password" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">忘记密码?</a>
            </div>
            
            <button 
              type="submit" 
              className="w-full py-2.5 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-200/50"
              disabled={isLogging}
            >
              {isLogging ? '登录中...' : '登录'}
            </button>
          </form>
          
          <div className="my-5 flex items-center">
            <div className="flex-grow h-px bg-blue-100"></div>
            <span className="px-4 text-blue-500/70 text-sm">或使用以下方式登录</span>
            <div className="flex-grow h-px bg-blue-100"></div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <button className="flex items-center justify-center py-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all">
              <i className="fa fa-weixin text-green-600 text-xl"></i>
            </button>
            <button className="flex items-center justify-center py-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all">
              <i className="fa fa-qq text-blue-500 text-xl"></i>
            </button>
            <button className="flex items-center justify-center py-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all">
              <i className="fa fa-github text-gray-700 text-xl"></i>
            </button>
          </div>
          
          <p className="text-center text-blue-600/70 text-sm">
            还没有账户? <a href="/register" className="text-blue-500 hover:text-blue-600 font-medium transition-colors">立即注册</a>
          </p>
        </div>
      </div>

      {/* 添加关键帧动画样式 */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradientShift {
          background-size: 200% 200%;
          animation: gradientShift 15s ease infinite;
        }
        .animate-float { animation: float 10s ease-in-out infinite; }
        .animate-float-delay-1 { animation: float 12s ease-in-out 1s infinite; }
        .animate-float-delay-2 { animation: float 15s ease-in-out 2s infinite; }
        .animate-float-delay-3 { animation: float 18s ease-in-out 3s infinite; }
        .animate-rotate { animation: float 20s linear infinite; }
        .animate-rotate-reverse { animation: float 25s linear infinite reverse; }
        /* 防止页面整体溢出 */
        html, body {
          overflow-x: hidden;
          height: 100%;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default Login;