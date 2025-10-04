import type { PromotionLinkResponse } from './promotion';

export const promotionAdapter = (item: PromotionLinkResponse) => ({
  id: item.cvcId,
  vipId: item.cvcVipId,
  code: item.cvcCode,
  longUrl: item.cvcLongUrl,
  shortUrl: item.cvcShortUrl,
  status: item.cvcStatus,
  createTime: item.cvcCreateTime,
});
