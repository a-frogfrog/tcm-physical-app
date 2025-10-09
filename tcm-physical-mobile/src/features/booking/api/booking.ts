import { http } from '#/lib/http';

type NewBookingRequest = {
  customerId: string;
  serviceId: string;
  productPackageId?: string;
  bookingStartTime: string;
  bookingEndTime: string;
  remark?: string;
};

const newBooking = (data: NewBookingRequest) => {
  return http.post('/Appointments/Add_Appointment', data);
};

export const bookingApi = {
  newBooking,
};
