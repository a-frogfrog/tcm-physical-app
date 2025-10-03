import { http } from '#/lib/http';

const fetchPromotionLink = async () => {
  return http.post('/Promotion/Generate_Link');
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
