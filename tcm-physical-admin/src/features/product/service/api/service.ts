import { http } from '#/lib/http';
import { serviceAdapter } from './adapter';

export type ServiceResponse = {
  id: string;
  name: string;
  duration: number; // minutes
  price: number;
  time: Date;
  desc: string;
};

const fetchServiceList = async () => {
  const res = await http.get<ServiceResponse[]>('/Service/Get_Service');
  const services = res.data.map((item) => serviceAdapter(item));
  return services;
};

export const serviceApi = {
  fetchServiceList,
};
