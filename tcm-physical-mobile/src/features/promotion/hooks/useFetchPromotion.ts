import { useQuery } from '@tanstack/react-query';
import { promotionApi } from '../api/promotion';

export function useFetchPromotionLink() {
  return useQuery({
    queryKey: ['promotionLink'],
    queryFn: promotionApi.fetchPromotionLink,
  });
}

export function useFetchPromotionQRCode(longUrl: string) {
  return useQuery({
    queryKey: ['promotionQRCode', longUrl],
    queryFn: ({ queryKey }) => promotionApi.fetchPromotionQRCode(queryKey[1]),
    enabled: !!longUrl,
  });
}

export function useGenerateLinkAndQRCode() {
  return useQuery({
    queryKey: ['generateLinkAndQRCode'],
    queryFn: promotionApi.fetchGenerateLinkAndQRCode,
  });
}

export function useFetchPromotion() {
  const promotionLinkQuery = useFetchPromotionLink();

  // 确保 longUrl 存在时才传递给第二个 Hook
  const longUrl = promotionLinkQuery.data?.longUrl || '';

  // 第二个查询是依赖查询
  const promotionQRCodeQuery = useFetchPromotionQRCode(longUrl);

  // 1. 合并状态：主数据正在加载 或 依赖数据正在加载
  // 注意：使用 isPending 更准确地表示首次加载
  const isPending =
    promotionLinkQuery.isPending ||
    (promotionLinkQuery.isSuccess && promotionQRCodeQuery.isPending);

  // 2. 只有当两个查询都成功时，数据才算加载完毕
  const isSuccess =
    promotionLinkQuery.isSuccess && promotionQRCodeQuery.isSuccess;

  // 3. 任何一个查询失败，都返回错误
  const error = promotionLinkQuery.error || promotionQRCodeQuery.error;

  return {
    promotionLink: promotionLinkQuery.data,
    promotionQRCode: promotionQRCodeQuery.data,
    isPending,
    isSuccess,
    error,
  };
}
