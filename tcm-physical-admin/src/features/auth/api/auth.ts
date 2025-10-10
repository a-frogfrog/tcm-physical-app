import { http } from '#/lib/http';

import { fetchLoginAdapter } from './adapter';

import type { LoginSchema } from '../constants';

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

const fetchLogin = (request: LoginSchema) => {
  return http.post<FetchLoginResponse>(
    '/Logins/Logins',
    fetchLoginAdapter(request),
  );
};

const fetchAuthCheck = () => {
  return http.get('/Logins/Check_Login');
};

export const authApi = {
  fetchLogin,
  fetchAuthCheck,
};

export type { FetchLoginRequest, FetchLoginResponse };
