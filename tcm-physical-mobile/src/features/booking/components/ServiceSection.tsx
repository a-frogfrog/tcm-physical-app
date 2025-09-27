import { ArrowRight } from 'lucide-react';
import { type Service } from '../constants';
import { useBookingStore } from '../store';
import { cn } from '#/lib/utils';

type ServiceProps = {
  services: Service[];
};

const ServiceSection = ({ services }: ServiceProps) => {
  const booking = useBookingStore((state) => state.booking);
  const setBooking = useBookingStore((state) => state.setBooking);
  const setStep = useBookingStore((state) => state.setStep);

  // 验证器
  const canToTime = !!booking.serviceId;

  // 选择服务
  const handleSelectService = (id: string) => {
    setBooking({ ...booking, serviceId: id });
  };

  // 下一步
  const nextStep = () => {
    if (canToTime) {
      setStep(2);
    }
  };

  return (
    <section className='space-y-6'>
      <h2 className='border-b-2 border-[#8B4513]/30 pb-2 text-xl font-bold text-[#8B4513]'>
        选择中医服务
      </h2>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {services.map((s) => {
          const selected = s.id === booking.serviceId;
          return (
            <article
              key={s.id}
              className={cn(
                'card-hover overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md',
                selected ? 'border-[#2E8B57] shadow-lg' : '',
              )}>
              <div className='relative h-40'>
                <img
                  src={s.img}
                  alt={s.title}
                  className='h-full w-full object-cover'
                />
                <div className='absolute top-3 right-3 rounded-full bg-[#2E8B57] px-2 py-1 text-sm text-white'>
                  {s.duration}分钟
                </div>
              </div>
              <div className='p-4'>
                <h3 className='text-lg font-bold'>{s.title}</h3>
                <p className='mt-1 text-sm text-gray-600'>{s.description}</p>
                <div className='mt-3 flex items-center justify-between'>
                  <span className='font-bold text-[#CD5C5C]'>¥{s.price}</span>
                  <button
                    onClick={() => handleSelectService(s.id)}
                    className={cn(
                      'rounded-full px-3 py-1 text-sm font-medium',
                      selected
                        ? 'bg-[#2E8B57] text-white'
                        : 'bg-[#8B4513]/10 text-[#8B4513]',
                    )}>
                    {selected ? '已选择' : '选择'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className='mt-8 flex justify-end'>
        <button
          onClick={nextStep}
          disabled={!canToTime}
          className={cn(
            'rounded-full bg-[#8B4513] px-6 py-3 font-medium text-white shadow-md transition-all duration-300',
            !canToTime ? 'cursor-not-allowed opacity-50' : '',
          )}>
          下一步 <ArrowRight className='ml-1 inline-block' />
        </button>
      </div>
    </section>
  );
};

export default ServiceSection;
