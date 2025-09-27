import { http } from '#/lib/http';

const newBooking = () => {
  return http.post('/booking/newBooking');
};

export const bookingApi = {
  newBooking,
};
