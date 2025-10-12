export default function ScheduleTable({ className }: { className?: string }) {
  const scheduleData = [
    {
      doctor: '张医师',
      specialties: '推拿、艾灸',
      schedules: [
        {
          date: '11/2',
          events: [{ time: '全天', type: '休息', color: 'purple' }],
        },
        {
          date: '11/3',
          events: [{ time: '09:00-18:00', type: '推拿', color: 'green' }],
        },
        {
          date: '11/4',
          events: [{ time: '13:00-17:00', type: '艾灸', color: 'blue' }],
        },
        {
          date: '11/5',
          events: [{ time: '09:00-12:00', type: '推拿', color: 'green' }],
        },
        {
          date: '11/6',
          events: [
            { time: '09:00-12:00', type: '推拿', color: 'green' },
            { time: '14:00-17:00', type: '艾灸', color: 'blue' },
          ],
        },
        {
          date: '11/8',
          events: [{ time: '10:00-15:00', type: '推拿', color: 'green' }],
        },
        {
          date: '11/9',
          events: [{ time: '全天', type: '休息', color: 'purple' }],
        },
        {
          date: '11/10',
          events: [{ time: '09:00-18:00', type: '艾灸', color: 'blue' }],
        },
        {
          date: '11/11',
          events: [{ time: '13:00-17:00', type: '推拿', color: 'green' }],
        },
      ],
    },
    {
      doctor: '李医师',
      specialties: '针灸、拔罐',
      schedules: [
        {
          date: '11/2',
          events: [
            { time: '09:00-12:00', type: '拔罐', color: 'yellow' },
            { time: '14:00-17:00', type: '针灸', color: 'red' },
          ],
        },
        {
          date: '11/3',
          events: [{ time: '10:00-16:00', type: '拔罐', color: 'yellow' }],
        },
        {
          date: '11/4',
          events: [{ time: '09:00-18:00', type: '针灸', color: 'red' }],
        },
        {
          date: '11/5',
          events: [{ time: '13:00-17:00', type: '拔罐', color: 'yellow' }],
        },
        {
          date: '11/7',
          events: [{ time: '14:00-17:00', type: '针灸', color: 'red' }],
        },
        {
          date: '11/8',
          events: [{ time: '09:00-12:00', type: '拔罐', color: 'yellow' }],
        },
        {
          date: '11/9',
          events: [{ time: '10:00-16:00', type: '针灸', color: 'red' }],
        },
        {
          date: '11/11',
          events: [{ time: '09:00-18:00', type: '针灸', color: 'red' }],
        },
        {
          date: '11/12',
          events: [{ time: '全天', type: '休息', color: 'purple' }],
        },
      ],
    },
    {
      doctor: '王医师',
      specialties: '推拿、刮痧',
      schedules: [
        {
          date: '11/2',
          events: [{ time: '10:00-15:00', type: '推拿', color: 'green' }],
        },
        {
          date: '11/3',
          events: [
            { time: '09:00-12:00', type: '推拿', color: 'green' },
            { time: '14:00-18:00', type: '刮痧', color: 'indigo' },
          ],
        },
        {
          date: '11/4',
          events: [{ time: '全天', type: '休息', color: 'purple' }],
        },
        {
          date: '11/5',
          events: [{ time: '09:00-18:00', type: '推拿', color: 'green' }],
        },
        {
          date: '11/6',
          events: [{ time: '10:00-15:00', type: '刮痧', color: 'indigo' }],
        },
        {
          date: '11/8',
          events: [{ time: '13:00-17:00', type: '推拿', color: 'green' }],
        },
        {
          date: '11/9',
          events: [{ time: '09:00-12:00', type: '刮痧', color: 'indigo' }],
        },
        {
          date: '11/10',
          events: [{ time: '10:00-16:00', type: '推拿', color: 'green' }],
        },
        {
          date: '11/11',
          events: [{ time: '13:00-17:00', type: '推拿', color: 'green' }],
        },
      ],
    },
  ];

  // 日期列表
  const dates = [
    '11/2',
    '11/3',
    '11/4',
    '11/5',
    '11/6',
    '11/7',
    '11/8',
    '11/9',
    '11/10',
    '11/11',
    '11/12',
  ];

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead>
          <tr>
            <th className='w-40 border-r border-gray-200 bg-gray-50 px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase'>
              技术人员
            </th>
            {dates.map((date, index) => (
              <th
                key={index}
                className={`px-1 py-2 text-center ${index >= 2 && index <= 3 ? 'bg-gray-50' : ''}`}>
                <div className='text-xs font-medium text-gray-500'>{date}</div>
                <div className='text-xs text-gray-400'></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {scheduleData.map((item, rowIndex) => (
            <tr key={rowIndex}>
              <td className='border-r border-gray-200 bg-gray-50 px-4 py-2'>
                <div className='flex items-center'>
                  <img
                    src={`https://picsum.photos/id/${1012 + rowIndex}/40/40`}
                    alt={`${item.doctor}头像`}
                    className='mr-3 h-8 w-8 rounded-full'
                  />
                  <div>
                    <div className='text-sm font-medium text-gray-800'>
                      {item.doctor}
                    </div>
                    <div className='text-xs text-gray-500'>
                      {item.specialties}
                    </div>
                  </div>
                </div>
              </td>
              {dates.map((date, colIndex) => {
                const cellSchedule = item.schedules.find(
                  (sch) => sch.date === date,
                );
                return (
                  <td
                    key={colIndex}
                    className={`schedule-cell hover:bg-neutral/50 min-h-[80px] border border-gray-200 p-1 transition-colors ${colIndex >= 2 && colIndex <= 3 ? 'bg-gray-50' : ''}`}>
                    {cellSchedule?.events.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`schedule-event mb-1 cursor-pointer overflow-hidden rounded-md p-1 text-xs whitespace-nowrap bg-${event.color}-100 text-${event.color}-800`}>
                        {`${event.time} ${event.type}`}
                      </div>
                    ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
