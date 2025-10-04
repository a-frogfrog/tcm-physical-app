import { useQuery } from '@tanstack/react-query';
import { promotionApi } from '../api/promotion';

export function usePromotionLink() {
  return useQuery({
    queryKey: ['promotionLink'],
    queryFn: promotionApi.fetchPromotionLink,
  });
}
