import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const particlesRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // 创建粒子效果
    particlesRef.current = document.getElementById('particles');
    createParticles();

    return () => {
      clearTimeout(timer);
      const particles = particlesRef.current?.querySelectorAll('div');
      particles?.forEach(particle => particle.remove());
    };
  }, []);

  const createParticles = () => {
    if (!particlesRef.current) return;
    
    const particleCount = 50;
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
        background: white;
        border-radius: 50%;
        opacity: ${Math.random() * 0.5 + 0.1};
        top: ${posY}%;
        left: ${posX}%;
        animation: float ${duration}s ease-in-out ${delay}s infinite;
        z-index: 1;
      `;
      
      particlesRef.current.appendChild(particle);
    }
  };

  return (
    <div className="font-inter min-h-screen overflow-hidden flex items-center justify-center">
      {/* 动态背景层 */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-primary/90 to-secondary/80 animate-gradientShift"></div>
        <div className="absolute w-96 h-96 rounded-full bg-primary/20 top-0 -left-40 animate-float animate-rotate"></div>
        <div className="absolute w-80 h-80 rounded-full bg-secondary/20 bottom-0 -right-20 animate-float-delay-1"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTYwIDBoLTYwdjYwaDYwdjAweiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div id="particles" className="absolute inset-0" ref={particlesRef}></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className={`glass rounded-2xl p-8 shadow-2xl transform transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-6">
            <div className="text-[clamp(3rem,10vw,5rem)] font-bold text-white text-shadow mb-4">404</div>
            <h1 className="text-[clamp(1.5rem,5vw,2rem)] font-bold text-white text-shadow mb-2">页面未找到</h1>
            <p className="text-white/70">抱歉，您访问的页面不存在或已被移动</p>
          </div>
          
          <div className="text-center mb-8">
            <i className="fa fa-exclamation-triangle text-6xl text-yellow-400 opacity-80"></i>
          </div>
          
          <div className="flex flex-col gap-4">
            <Link 
              to="/" 
              className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all text-center transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
            >
              <i className="fa fa-home mr-2"></i>返回首页
            </Link>
            
            <Link 
              to="/login" 
              className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all text-center border border-white/20"
            >
              <i className="fa fa-sign-in mr-2"></i>登录页面
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
