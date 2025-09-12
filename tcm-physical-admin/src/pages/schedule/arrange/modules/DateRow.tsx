import dayjs from 'dayjs'; // 日期工具库，需安装：npm i dayjs

const DateRow = ({ startDate }: { startDate: Date }) => {
  const days = [];
  // 生成一周的日期
  for (let i = 0; i < 7; i++) {
    const date = dayjs(startDate).add(i, 'day');
    days.push(
      <div
        key={i}
        className='flex flex-col items-center border-r border-gray-200 p-2'>
        <span className='text-sm text-gray-500'>{date.format('MM/DD')}</span>
        <span className='font-medium'>{date.format('ddd')}</span>
      </div>,
    );
  }
  return <div className='flex border-b border-gray-200'>{days}</div>;
};

export default DateRow;
