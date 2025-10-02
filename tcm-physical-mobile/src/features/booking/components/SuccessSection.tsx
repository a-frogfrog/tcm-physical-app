import { Check } from 'lucide-react';
import { useBooking } from '../hooks/useBooking';
import { useBookingStore } from '../store';

const SuccessSection = () => {
  const booking = useBookingStore((state) => state.booking);
  const selectedService = useBookingStore((state) => state.selectedService);
  const resetAll = useBookingStore((state) => state.resetAll);

  const { formatDateReadable } = useBooking();

  return (
    <section className='py-10'>
      <div className='space-y-6 text-center'>
        <div className='mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100'>
          <Check className='text-3xl text-green-500' />
        </div>
        <h2 className='text-2xl font-bold text-[#8B4513]'>预约成功！</h2>
        <p className='text-gray-600'>您的预约已提交，我们会尽快与您确认</p>

        <div className='mx-auto mt-4 max-w-md rounded-xl bg-white p-6 text-left shadow-md'>
          <h3 className='mb-4 text-center font-bold'>预约信息</h3>
          <div className='space-y-2 text-sm'>
            <div className='flex justify-between'>
              <span className='text-gray-600'>预约编号：</span>
              <span className='font-medium'>{booking.bookingId}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>服务类型：</span>
              <span className='font-medium'>
                {selectedService ? selectedService.title : '--'}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>预约时间：</span>
              <span className='font-medium'>
                {formatDateReadable(booking.date)} {booking.time}
              </span>
            </div>
          </div>
        </div>

        <div className='mt-8'>
          <button
            onClick={() => {
              resetAll();
            }}
            className='rounded-full bg-[#8B4513] px-8 py-3 font-medium text-white shadow-md transition-all duration-300'>
            返回首页
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuccessSection;
