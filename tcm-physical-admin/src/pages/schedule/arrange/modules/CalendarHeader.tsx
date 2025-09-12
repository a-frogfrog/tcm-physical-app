interface CalendarHeaderProps {
  currentMonth: moment.Moment;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  view: 'month' | 'week' | 'day';
  onViewChange: (view: 'month' | 'week' | 'day') => void;
}

const CalendarHeader = ({
  currentMonth,
  onPrevMonth,
  onNextMonth,
  onToday,
  view,
  onViewChange,
}: CalendarHeaderProps) => {
  return (
    <div className='flex items-center justify-between bg-white p-4 shadow-sm'>
      {/* 年月切换 */}
      <div className='flex items-center space-x-2'>
        <button onClick={onPrevMonth} className='rounded p-2 hover:bg-gray-100'>
          &lt;
        </button>
        <span className='text-lg font-medium'>
          {currentMonth.format('YYYY年MM月')}
        </span>
        <button onClick={onNextMonth} className='rounded p-2 hover:bg-gray-100'>
          &gt;
        </button>
      </div>
      {/* 今日按钮 */}
      <button
        onClick={onToday}
        className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>
        今天
      </button>
      {/* 视图切换 */}
      <div className='flex space-x-2'>
        <button
          onClick={() => onViewChange('month')}
          className={`rounded px-3 py-1 ${view === 'month' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
          月
        </button>
        <button
          onClick={() => onViewChange('week')}
          className={`rounded px-3 py-1 ${view === 'week' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
          周
        </button>
        <button
          onClick={() => onViewChange('day')}
          className={`rounded px-3 py-1 ${view === 'day' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
          日
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
