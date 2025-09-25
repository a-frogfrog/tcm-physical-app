import { http } from '../http';

export type LoginRequestParams = {
  email: string;
  code: string;
};

const fetchAuthLogin = (params: LoginRequestParams) => {
  const a = {
    account: params.email,
    password: params.code,
    code: '',
    //cspell:words vipid
    vipid: '',
    vipCode: '',
  };
  return http.post('/Logins/Customer_Logins', a);
};

export const authApi = {
  fetchAuthLogin,
};
