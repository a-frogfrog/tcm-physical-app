import { http } from '../http';

export type LoginRequestParams = {
  account: string;
  password: string;
};

const fetchAuthLogin = (params: LoginRequestParams) => {
  return http.post('/auth/login', params);
};

export const authApi = {
  fetchAuthLogin,
};
