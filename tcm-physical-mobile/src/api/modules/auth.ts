import { http } from '../http';

const fetchAuthLogin = () => {
  return http.post('/auth/login');
};

export const authApi = {
  fetchAuthLogin,
};
