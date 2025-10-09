import { http } from '#/lib/http';

type FetchLoginRequest = {
  account: string;
  password: string;
  code: string;
  vipId: string;
  vipCode: string;
};

type FetchLoginResponse = {
  token: string;
};

const fetchLogin = async (request: FetchLoginRequest) => {
  return http.post<FetchLoginResponse>('/Logins/Logins', request);
};

export const authApi = {
  fetchLogin,
};
