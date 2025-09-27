import { http } from '#/lib/http';

const fetchServiceList = () => {
  return http.get('/Service/Get_Service');
};

export const serviceApi = {
  fetchServiceList,
};
