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

export const authApi = {
  fetchLogin,
};

export type { FetchLoginRequest, FetchLoginResponse };
