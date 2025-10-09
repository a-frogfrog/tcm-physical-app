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

const fetchPromotionQRCode = async (longUrl: string) => {
  const res = await http.get<string>('/Promotion/Get_QRCode', {
    params: { longUrl },
  });
  return res.data;
};

export const promotionApi = {
  fetchPromotionLink,
  fetchPromotionQRCode,
};
