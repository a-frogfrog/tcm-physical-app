import { http } from '#/lib/http';
import type {
  ApiResponsePageRequest,
  ApiResponsePageResponse,
} from '#/types/api';

type NewBookingRequest = {
  customerId: string;
  serviceId: string;
  productPackageId?: string;
  bookingStartTime: string;
  bookingEndTime: string;
  remark?: string;
};

/**
 * @description 新增预约
 * @param data 新预约请求参数
 * @returns 新预约响应
 */
const newBooking = (data: NewBookingRequest) => {
  return http.post('/Appointments/Add_Appointment', data);
};

type MyBookingResponse = ApiResponsePageResponse<{
  bookingStartTime: string;
  bookingEndTime: string;
  bookingStatus: number;
}>;

/**
 * @description 获取我的预约列表
 * @param params 分页参数
 * @returns 我的预约列表
 */
const fetchMyBookings = async (params: ApiResponsePageRequest) => {
  const res = await http.get<MyBookingResponse>(
    '/Appointments/Get_My_Appointment',
    { params },
  );
  return res.data;
};

export const bookingApi = {
  newBooking,
  fetchMyBookings,
};
