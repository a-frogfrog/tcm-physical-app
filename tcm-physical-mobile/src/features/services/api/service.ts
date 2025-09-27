import { http } from '#/lib/http';

export type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number; // minutes
  img: string;
};

const fetchServiceList = async () => {
  return await http.get<Service[]>('/Service/Get_Service');
};

export const serviceApi = {
  fetchServiceList,
};
