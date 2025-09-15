import { FileTextIcon, InfoIcon, PercentIcon } from 'lucide-react';

type StepIndicatorProps = {
  activeTab: string;
};

const StepIndicator = ({ activeTab }: StepIndicatorProps) => {
  return (
    <div className='mb-8 flex items-center justify-between'>
      <div className='flex flex-col items-center'>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${activeTab === 'basic' || activeTab === 'content' || activeTab === 'discount' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
          <InfoIcon size={20} />
        </div>
        <span className='mt-2 text-sm font-medium'>基础信息</span>
      </div>

      <div
        className={`mx-4 h-1 flex-1 ${activeTab === 'content' || activeTab === 'discount' ? 'bg-primary' : 'bg-gray-200'}`}></div>

      <div className='flex flex-col items-center'>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${activeTab === 'content' || activeTab === 'discount' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
          <FileTextIcon size={20} />
        </div>
        <span className='mt-2 text-sm font-medium'>推广内容</span>
      </div>

      <div
        className={`mx-4 h-1 flex-1 ${activeTab === 'discount' ? 'bg-primary' : 'bg-gray-200'}`}></div>

      <div className='flex flex-col items-center'>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${activeTab === 'discount' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
          <PercentIcon size={20} />
        </div>
        <span className='mt-2 text-sm font-medium'>优惠设置</span>
      </div>
    </div>
  );
};

export default StepIndicator;
