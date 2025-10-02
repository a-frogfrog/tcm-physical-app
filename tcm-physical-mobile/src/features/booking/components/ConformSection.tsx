import { Check, Info } from 'lucide-react';
import { useBooking } from '../hooks/useBooking';
import { useBookingStore } from '../store';
import { BookingTitle } from './BookingTitle';
import {
  DetailCard,
  DetailCardFooter,
  DetailCardHeader,
  DetailCardItem,
} from './DetailCard';
import { PrevButton } from './StepButton';

const ConfirmSection = () => {
  const booking = useBookingStore((state) => state.booking);
  const setStep = useBookingStore((state) => state.setStep);
  const { formatDateReadable, handleSubmit, selectedService } = useBooking();

  console.log(booking);
  return (
    <section className='space-y-6'>
      <BookingTitle title='确认预约信息' />

      <DetailCard>
        <DetailCardHeader>预约信息</DetailCardHeader>
        <DetailCardItem
          label='服务类型'
          value={selectedService?.title || '--'}
        />
        <DetailCardItem
          label='预约日期'
          value={formatDateReadable(booking.date)}
        />
        <DetailCardItem label='预约日期' value={booking.time!} />

        <DetailCardItem
          label='服务时长'
          value={selectedService?.duration.toString() || '--'}
        />

        <DetailCardFooter
          title='总计费用'
          value={selectedService?.price.toFixed(2) || '--'}
        />
      </DetailCard>

      {/* 预约须知 */}
      <BookingInfo />

      <div className='mt-8 flex justify-between'>
        <PrevButton onClick={() => setStep(1)} />
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
