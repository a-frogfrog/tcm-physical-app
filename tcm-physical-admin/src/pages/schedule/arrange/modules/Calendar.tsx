import { useState } from 'react';
import dayjs from 'dayjs';
import CalendarHeader from './CalendarHeader';
import DateRow from './DateRow';
import DoctorScheduleItem from './DoctorScheduleItem';
import ServiceLegend from './ServiceLegend';
import { cn } from '#/lib/utils';

// 模拟医生数据（与原型一致）
const doctors = [
  {
    name: '张医师',
    avatar: 'https://via.placeholder.com/40',
    skills: ['推拿', '艾灸'],
    schedules: [
      [
        { time: '09:00-12:00', type: '推拿' },
        { time: '14:00-17:00', type: '艾灸' },
      ],
      [{ time: '10:00-15:00', type: '推拿' }],
      [],
      [{ type: '休息' }],
      [{ time: '09:00-18:00', type: '推拿' }],
      [{ time: '13:00-17:00', type: '艾灸' }],
      [{ time: '09:00-12:00', type: '推拿' }],
    ],
  },
  {
    name: '李医师',
    avatar: 'https://via.placeholder.com/40',
    skills: ['针灸', '拔罐'],
    schedules: [
      [],
      [{ time: '14:00-17:00', type: '针灸' }],
      [
        { time: '09:00-12:00', type: '拔罐' },
        { time: '14:00-18:00', type: '针灸' },
      ],
      [{ time: '10:00-16:00', type: '拔罐' }],
      [{ type: '休息' }],
      [{ time: '09:00-18:00', type: '针灸' }],
      [{ time: '13:00-17:00', type: '拔罐' }],
    ],
  },
  {
    name: '王医师',
    avatar: 'https://via.placeholder.com/40',
    skills: ['推拿', '刮痧'],
    schedules: [
      [{ time: '10:00-15:00', type: '推拿' }],
      [],
      [{ time: '13:00-17:00', type: '刮痧' }],
      [
        { time: '09:00-12:00', type: '推拿' },
        { time: '14:00-18:00', type: '刮痧' },
      ],
      [{ time: '10:00-16:00', type: '推拿' }],
      [{ type: '休息' }],
      [{ time: '09:00-18:00', type: '推拿' }],
    ],
  },
];

const Calendar = ({ className }: { className?: string }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs('2023-11'));
  const [view, setView] = useState('month');

  // 年月切换
  const handlePrevMonth = () =>
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));
  const handleToday = () => setCurrentMonth(dayjs());
  const handleViewChange = (newView) => setView(newView);

  // 当月第一天（用于生成日期栏）
  const firstDayOfMonth = currentMonth.startOf('month');

  return (
    <div className={cn('min-h-screen bg-gray-50', className)}>
      <CalendarHeader
        currentMonth={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
        view={view}
        onViewChange={handleViewChange}
      />
      <DateRow startDate={firstDayOfMonth} />
      <div className='max-h-96 overflow-y-auto'>
        {doctors.map((doctor) => (
          <DoctorScheduleItem key={doctor.name} doctor={doctor} />
        ))}
      </div>
      <ServiceLegend />
    </div>
  );
};

export default Calendar;
