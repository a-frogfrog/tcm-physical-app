import { dateItems, timeSlots } from '../constants';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useBookingStore } from '../store';
import { cn } from '#/lib/utils';

const TimeSection = () => {
  const booking = useBookingStore((state) => state.booking);
  const setBooking = useBookingStore((state) => state.setBooking);
  const setStep = useBookingStore((state) => state.setStep);
  // 验证器
  const canToConfirm = !!booking.date && !!booking.time;

  return (
    <section className='space-y-6'>
      <h2 className='border-b-2 border-[#8B4513]/30 pb-2 text-xl font-bold text-[#8B4513]'>
        选择预约时间
      </h2>

      <div className='rounded-xl bg-white p-4 shadow-md'>
        <h3 className='mb-3 font-bold'>选择日期</h3>
        <div className='scrollbar-hide overflow-x-auto'>
          <div className='flex min-w-max space-x-3 pb-2'>
            {dateItems().map((d) => {
              const selected = booking.date === d.iso;
              return (
                <div
                  key={d.iso}
                  onClick={() => setBooking({ ...booking, date: d.iso })}
                  className={`card-hover flex h-24 w-20 cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 ${selected ? 'border-[#2E8B57] bg-[#2E8B57]/10' : ''}`}>
                  <span className='text-sm text-gray-500'>{d.labelDay}</span>
                  <span className='mt-1 text-xl font-bold'>{d.dateNum}</span>
                  <span className='mt-1 text-xs text-gray-500'>
                    {d.monthName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className='rounded-xl bg-white p-4 shadow-md'>
        <h3 className='mb-3 font-bold'>选择时间段</h3>
        <div className='grid grid-cols-3 gap-2'>
          {timeSlots.map((t) => {
            const isDisabled = t === '12:00 - 13:30'; // 原示例有个长午休段
            const selected = booking.time === t;
            return (
              <div
                key={t}
                onClick={() =>
                  !isDisabled && setBooking({ ...booking, time: t })
                }
                className={cn(
                  'card-hover cursor-pointer rounded-lg border border-gray-200 px-0.5 py-3 text-center text-sm',
                  isDisabled ? 'cursor-not-allowed opacity-50' : '',
                  selected ? 'border-[#2E8B57] bg-[#2E8B57]/10' : '',
                )}>
                {t}
              </div>
            );
          })}
        </div>
      </div>

      <div className='mt-8 flex justify-between'>
        <button
          onClick={() => setStep(1)}
          className='rounded-full bg-gray-200 px-6 py-3 font-medium text-[#3E2723] shadow-md transition-all duration-300'>
          <ArrowLeft className='mr-1 inline-block' /> 上一步
        </button>
        <button
          onClick={() => canToConfirm && setStep(3)}
          disabled={!canToConfirm}
          className={cn(
            'rounded-full bg-[#8B4513] px-6 py-3 font-medium text-white shadow-md transition-all duration-300',
            !canToConfirm ? 'cursor-not-allowed opacity-50' : '',
          )}>
          下一步 <ArrowRight className='ml-1 inline-block' />
        </button>
      </div>
    </section>
  );
};

export default TimeSection;
