import { useQuery } from '@tanstack/react-query';
import { promotionApi } from '../api/promotion';

export function useFetchPromotionLink() {
  return useQuery({
    queryKey: ['promotionLink'],
    queryFn: promotionApi.fetchPromotionLink,
  });
}

export function useFetchPromotionQRCode() {
  return useQuery({
    queryKey: ['promotionQRCode'],
    queryFn: () => promotionApi.fetchPromotionQRCode,
  });
}
