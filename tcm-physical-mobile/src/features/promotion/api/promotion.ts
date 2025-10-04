import { http } from '#/lib/http';
import { promotionAdapter } from './adapter';

export type PromotionLinkResponse = {
  cvcId: string;
  cvcVipId: string;
  cvcCode: string;
  cvcLongUrl: string;
  cvcShortUrl: string;
  cvcStatus: number;
  cvcCreateTime: Date;
};

const fetchPromotionLink = async () => {
  // TODO: change request body to match the API
  const res = await http.post<PromotionLinkResponse>(
    '/Promotion/Generate_Link',
  );
  return promotionAdapter(res.data);
};

type GetPromotionQRCodeRequest = {
  longUrl: string;
};

const fetchPromotionQRCode = async (request: GetPromotionQRCodeRequest) => {
  return http.get('/Promotion/Get_QRCode', {
    params: request,
  });
};

export const promotionApi = {
  fetchPromotionLink,
  fetchPromotionQRCode,
};
