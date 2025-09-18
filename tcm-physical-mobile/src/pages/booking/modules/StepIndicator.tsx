const StepIndicator = ({ step }: { step: number }) => {
  return (
    <div className='relative mb-8'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col items-center'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#2E8B57] font-bold text-white shadow-md'>
            1
          </div>
          <span className='mt-2 text-center text-xs'>选择服务</span>
        </div>
        <div className='relative mx-2 h-1 flex-1 bg-gray-300'>
          <div
            className={`absolute top-0 left-0 h-full bg-[#2E8B57] transition-all duration-500`}
            style={{ width: step >= 2 ? '100%' : '0%' }}
          />
        </div>
        <div className='flex flex-col items-center'>
          <div
            className={`h-10 w-10 rounded-full ${step >= 2 ? 'bg-[#2E8B57] text-white' : 'bg-gray-300 text-gray-600'} flex items-center justify-center font-bold shadow-md`}>
            2
          </div>
          <span className='mt-2 text-center text-xs'>选择时间</span>
        </div>
        <div className='relative mx-2 h-1 flex-1 bg-gray-300'>
          <div
            className={`absolute top-0 left-0 h-full bg-[#2E8B57] transition-all duration-500`}
            style={{ width: step >= 3 ? '100%' : '0%' }}
          />
        </div>
        <div className='flex flex-col items-center'>
          <div
            className={`h-10 w-10 rounded-full ${step >= 3 ? 'bg-[#2E8B57] text-white' : 'bg-gray-300 text-gray-600'} flex items-center justify-center font-bold shadow-md`}>
            3
          </div>
          <span className='mt-2 text-center text-xs'>确认预约</span>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
