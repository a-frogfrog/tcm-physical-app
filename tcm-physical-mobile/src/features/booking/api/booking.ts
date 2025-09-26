import { http } from '#/lib/http';

const newBooking = () => {
  return http.post('/booking/newBooking');
};

const fetchServiceList = () => {
  return http.get('/booking/serviceList');
};

export const bookingApi = {
  newBooking,
  fetchServiceList,
};
