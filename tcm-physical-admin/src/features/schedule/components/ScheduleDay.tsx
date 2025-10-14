interface ScheduleDayProps {
  dayOfWeek: string; // 星期（如“周日”）
  date: string; // 日期（如24）
}

const ScheduleDay = ({
  dayOfWeek,
  date,
  children,
}: ScheduleDayProps & React.ComponentProps<'section'>) => {
  return (
    <div className='h-full w-full min-w-[60px] border border-gray-200'>
      <div className='flex flex-col items-center gap-2 border-b border-gray-100 px-4 py-3'>
        {/* 星期栏 */}
        <p>{dayOfWeek}</p>
        <p className='text-base text-gray-500'>{date}</p>
        {/* 日期与排班状态栏 */}
      </div>
      <div className='mt-2 p-2 text-sm text-gray-300'> {children}</div>
    </div>
  );
};

export { ScheduleDay };
