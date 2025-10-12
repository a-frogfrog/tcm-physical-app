import type { ProductCardProps } from '../constants';
import type { ServiceResponse } from './service';

export const serviceAdapter = (service: ServiceResponse): ProductCardProps => ({
  id: service.id,
  title: service.name,
  imageUrl: 'https://picsum.photos/seed/tuina/640/360',
  price: service.price,
  duration: `${service.duration} 分钟`,
  description: service.desc,
  features: [],
  status: '正常运营',
  servicesCount: 0,
  rating: 0,
  //日期格式：yyyy-MM-dd
  lastUpdated: service.time.toString().split(' ')[0],
});
