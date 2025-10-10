import type { Service } from '../constants';
import type { ServiceResponse } from './service';

export const serviceAdapter = (service: ServiceResponse): Service => ({
  id: service.id,
  title: service.name,
  img: 'https://picsum.photos/seed/tuina/640/360',
  price: Number(service.price),
  duration: service.duration,
  description: service.desc,
});
