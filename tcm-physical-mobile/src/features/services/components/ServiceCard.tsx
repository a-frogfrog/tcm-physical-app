import { cn } from '#/lib/utils';
import type { Service } from '../constants/types';

type ServiceCardProps = {
  service: Service;
  selected: boolean;
  onSelect: (id: string) => void;
};
const ServiceCard = ({ service, selected, onSelect }: ServiceCardProps) => {
  return (
    <article
      key={service.id}
      className={cn(
        'card-hover overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md',
        selected ? 'border-[#2E8B57] shadow-lg' : '',
      )}>
      <div className='relative h-40'>
        <img
          src={service.img}
          alt={service.title}
          className='h-full w-full object-cover'
        />
        <div className='absolute top-3 right-3 rounded-full bg-[#2E8B57] px-2 py-1 text-sm text-white'>
          {service.duration}分钟
        </div>
      </div>
      <div className='p-4'>
        <h3 className='text-lg font-bold'>{service.title}</h3>
        <p className='mt-1 text-sm text-gray-600'>{service.description}</p>
        <div className='mt-3 flex items-center justify-between'>
          <span className='font-bold text-[#CD5C5C]'>¥{service.price}</span>
          <button
            onClick={() => onSelect(service.id)}
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
};

export { ServiceCard };
