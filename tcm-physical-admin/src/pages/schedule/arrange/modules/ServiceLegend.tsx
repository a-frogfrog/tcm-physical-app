const serviceLegend = [
  { type: '推拿', color: 'bg-green-100' },
  { type: '艾灸', color: 'bg-blue-100' },
  { type: '针灸', color: 'bg-red-100' },
  { type: '拔罐', color: 'bg-yellow-100' },
  { type: '刮痧', color: 'bg-purple-100' },
  { type: '休息', color: 'bg-pink-100' },
];

const ServiceLegend = () => {
  return (
    <div className='bg-white p-4 shadow-sm'>
      <h3 className='mb-2 font-medium'>服务类型说明</h3>
      <div className='flex space-x-4'>
        {serviceLegend.map((item) => (
          <div key={item.type} className='flex items-center'>
            <div className={`h-4 w-4 ${item.color} mr-1 rounded`}></div>
            <span className='text-sm'>{item.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceLegend;
