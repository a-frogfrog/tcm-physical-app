import { ArrowLeft, Check, Info } from 'lucide-react';
import { useBooking } from '../hooks/useBooking';
import { useBookingStore } from '../store';

const ConfirmSection = () => {
  const booking = useBookingStore((state) => state.booking);
  const setStep = useBookingStore((state) => state.setStep);
  const { formatDateReadable, handleSubmit, selectedService } = useBooking();

  return (
    <section className='space-y-6'>
      <h2 className='border-b-2 border-[#8B4513]/30 pb-2 text-xl font-bold text-[#8B4513]'>
        确认预约信息
      </h2>

      <div className='rounded-xl bg-white p-6 shadow-md'>
        <h3 className='mb-4 border-b pb-2 text-lg font-bold'>预约详情</h3>

        <div className='space-y-4'>
          <div className='flex justify-between'>
            <span className='text-gray-600'>服务类型：</span>
            <span className='font-medium'>
              {selectedService ? selectedService.title : '--'}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>预约日期：</span>
            <span className='font-medium'>
              {formatDateReadable(booking.date)}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>预约时间：</span>
            <span className='font-medium'>{booking.time ?? '--'}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>服务时长：</span>
            <span className='font-medium'>
              {selectedService ? `${selectedService.duration}分钟` : '--'}
            </span>
          </div>
          <div className='border-t border-gray-200 pt-4'>
            <div className='flex justify-between text-lg font-bold'>
              <span>总计费用：</span>
              <span className='text-[#CD5C5C]'>
                ¥{selectedService ? selectedService.price : '--'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 预约须知 */}
      <BookingInfo />

      <div className='mt-8 flex justify-between'>
        <button
          onClick={() => setStep(2)}
          className='rounded-full bg-gray-200 px-6 py-3 font-medium text-[#3E2723] shadow-md transition-all duration-300'>
          <ArrowLeft className='mr-1 inline-block' /> 上一步
        </button>
        <button
          onClick={handleSubmit}
          className={`'bg-[#2E8B57] text-white' : 'cursor-not-allowed opacity-50'} rounded-full bg-[#2E8B57] px-6 py-3 font-medium text-white shadow-md transition-all duration-300`}>
          确认预约 <Check className='ml-1 inline-block' />
        </button>
      </div>
    </section>
  );
};

const BookingInfo = () => {
  return (
    <article className='rounded-xl border border-[#2E8B57]/20 bg-[#2E8B57]/10 p-4'>
      <h3 className='flex items-center font-bold text-[#2E8B57]'>
        <Info className='mr-2' /> 预约须知
      </h3>
      <ul className='mt-2 list-inside list-disc space-y-1 text-sm text-gray-700'>
        <li>请提前15分钟到达中医馆</li>
        <li>如需取消预约，请提前2小时通知</li>
        <li>如有特殊健康状况，请在备注中说明</li>
      </ul>
    </article>
  );
};

export default ConfirmSection;
