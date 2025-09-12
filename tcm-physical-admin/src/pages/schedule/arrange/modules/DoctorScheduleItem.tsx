// 服务类型与颜色映射（对应原型图例）
const serviceColorMap = {
  推拿: 'bg-green-100',
  艾灸: 'bg-blue-100',
  针灸: 'bg-red-100',
  拔罐: 'bg-yellow-100',
  刮痧: 'bg-purple-100',
  休息: 'bg-pink-100',
};

const DoctorScheduleItem = ({ doctor }) => {
  return (
    <div className='flex border-b border-gray-200'>
      {/* 医生信息（头像、姓名、擅长） */}
      <div className='flex w-24 flex-col items-center p-2'>
        <img
          src={doctor.avatar}
          alt={doctor.name}
          className='h-10 w-10 rounded-full object-cover'
        />
        <span className='mt-2 font-medium'>{doctor.name}</span>
        <span className='text-sm text-gray-500'>
          {doctor.skills.join('、')}
        </span>
      </div>
      {/* 每日排班 */}
      <div className='flex-1'>
        {doctor.schedules.map((daySchedules, index) => (
          <div key={index} className='flex border-r border-gray-200'>
            {daySchedules.map((schedule) => (
              <div
                key={schedule.time}
                className={`flex-1 p-1 ${
                  schedule.type ? serviceColorMap[schedule.type] : 'bg-white'
                } m-1 rounded`}>
                {schedule.time && (
                  <span className='text-sm'>{schedule.time}</span>
                )}
                {schedule.type && (
                  <span className='ml-1 text-xs'>{schedule.type}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorScheduleItem;
