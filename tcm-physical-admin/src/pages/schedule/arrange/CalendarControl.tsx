import { useState } from 'react';

const CalendarControl = ({ className }: { className?: string }) => {
  // 状态管理
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // month, week, day

  // 处理上个月切换
  const handlePrevMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  // 处理下个月切换
  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  // 回到今天
  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // 切换视图模式
  const handleViewChange = (mode: 'month' | 'week' | 'day') => {
    setViewMode(mode);
  };

  // 格式化显示的月份和年份
  const formatMonthYear = () => {
    return `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月`;
  };

  return (
    <div className={`mb-6 rounded-lg bg-white p-4 shadow-sm ${className}`}>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        {/* 月份导航 */}
        <div className='flex items-center space-x-4'>
          <button
            onClick={handlePrevMonth}
            className='rounded p-2 transition-colors hover:bg-gray-100'
            aria-label='上个月'>
            <i className='fa fa-chevron-left text-gray-600'></i>
          </button>
          <h3 className='text-lg font-medium text-gray-800'>
            {formatMonthYear()}
          </h3>
          <button
            onClick={handleNextMonth}
            className='rounded p-2 transition-colors hover:bg-gray-100'
            aria-label='下个月'>
            <i className='fa fa-chevron-right text-gray-600'></i>
          </button>
          <button
            onClick={handleToday}
            className='btn-secondary px-3 py-1 text-sm'>
            今天
          </button>
        </div>

        {/* 视图切换 */}
        <div className='flex space-x-2'>
          <button
            onClick={() => handleViewChange('month')}
            className={`rounded px-3 py-1 text-sm ${
              viewMode === 'month'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}>
            月
          </button>
          <button
            onClick={() => handleViewChange('week')}
            className={`rounded px-3 py-1 text-sm ${
              viewMode === 'week'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}>
            周
          </button>
          <button
            onClick={() => handleViewChange('day')}
            className={`rounded px-3 py-1 text-sm ${
              viewMode === 'day'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}>
            日
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarControl;
