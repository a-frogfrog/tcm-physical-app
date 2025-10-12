const ServiceLegend = ({ className }: { className?: string }) => {
  // 服务类型数据，包含类型名称和对应的颜色
  const serviceTypes = [
    { name: '推拿', color: 'bg-green-100' },
    { name: '艾灸', color: 'bg-blue-100' },
    { name: '针灸', color: 'bg-red-100' },
    { name: '拔罐', color: 'bg-yellow-100' },
    { name: '刮痧', color: 'bg-indigo-100' },
    { name: '休息', color: 'bg-purple-100' },
  ];

  return (
    <div className={`mt-6 rounded-lg bg-white p-4 shadow-sm ${className}`}>
      <h4 className='mb-3 text-sm font-medium text-gray-800'>服务类型说明</h4>
      <div className='flex flex-wrap gap-x-6 gap-y-2'>
        {serviceTypes.map((type, index) => (
          <div key={index} className='flex items-center'>
            {/* 圆形颜色标识 */}
            <span
              className={`mr-2 inline-block h-3 w-3 rounded-full ${type.color}`}></span>
            {/* 服务类型名称 */}
            <span className='text-xs text-gray-600'>{type.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceLegend;
