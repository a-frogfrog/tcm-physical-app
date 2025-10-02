import { type Service } from '../constants';
import { useBookingStore } from '../store';

import { ServiceCard } from '#/features/services/components/ServiceCard';
import { BookingTitle } from './BookingTitle';
import { NextButton } from './StepButton';

type ServiceProps = {
  services: Service[];
};

const ServiceSection = ({ services }: ServiceProps) => {
  const booking = useBookingStore((state) => state.booking);
  const setBooking = useBookingStore((state) => state.setBooking);
  const setSelectedService = useBookingStore(
    (state) => state.setSelectedService,
  );
  const setStep = useBookingStore((state) => state.setStep);

  // 验证器
  const canToTime = !!booking.serviceId;

  // 选择服务
  const handleSelectService = (id: string) => {
    setBooking({ ...booking, serviceId: id });
    setSelectedService(services.find((s) => s.id === id) || null);
  };

  // 下一步
  const nextStep = () => {
    if (canToTime) {
      setStep(2);
    }
  };

  return (
    <section className='space-y-6'>
      <BookingTitle title='选择中医服务' />

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {services.map((s) => {
          const selected = s.id === booking.serviceId;
          return (
            <ServiceCard
              key={s.id}
              service={s}
              selected={selected}
              onSelect={handleSelectService}
            />
          );
        })}
      </div>

      <div className='mt-8 flex justify-end'>
        <NextButton onClick={nextStep} disabled={!canToTime} />
      </div>
    </section>
  );
};

export default ServiceSection;
