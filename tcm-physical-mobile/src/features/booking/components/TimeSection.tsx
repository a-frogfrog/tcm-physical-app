import { dateItems, timeSlots } from '../constants';
import { useBookingStore } from '../store';
import { BookingTitle } from './BookingTitle';
import { DateSelect, DateSelectItem } from './DateSelect';
import { NextButton, PrevButton } from './StepButton';
import { TimePeriodSelect, TimePeriodSelectItem } from './TimePeriodSelect';

const TimeSection = () => {
  const booking = useBookingStore((state) => state.booking);
  const setBooking = useBookingStore((state) => state.setBooking);
  const setStep = useBookingStore((state) => state.setStep);
  // 验证器
  const canToConfirm = !!booking.date && !!booking.time;

  return (
    <section className='space-y-6'>
      <BookingTitle title='选择预约时间' />

      <DateSelect>
        {dateItems().map((d) => {
          const selected = booking.date === d.iso;
          return (
            <DateSelectItem
              key={d.iso}
              iso={d.iso}
              day={d.labelDay}
              date={d.dateNum.toString()}
              month={d.monthName}
              selected={selected}
              onSelect={(iso) => setBooking({ ...booking, date: iso })}
            />
          );
        })}
      </DateSelect>

      <TimePeriodSelect>
        {timeSlots.map((t) => {
          const isDisabled = t === '12:00 - 13:30'; // 原示例有个长午休段
          const selected = booking.time === t;
          return (
            <TimePeriodSelectItem
              key={t}
              onClick={() => !isDisabled && setBooking({ ...booking, time: t })}
              disabled={isDisabled}
              selected={selected}>
              {t}
            </TimePeriodSelectItem>
          );
        })}
      </TimePeriodSelect>

      <div className='mt-8 flex justify-between'>
        <PrevButton onClick={() => setStep(1)} />
        <NextButton
          onClick={() => canToConfirm && setStep(3)}
          disabled={!canToConfirm}
        />
      </div>
    </section>
  );
};

export default TimeSection;
