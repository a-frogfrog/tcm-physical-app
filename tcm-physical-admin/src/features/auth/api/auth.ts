import { http } from '#/lib/http';

import { useMutation } from '@tanstack/react-query';

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

const useFetchLogin = () => {
  return useMutation({
    mutationKey: ['auth_login'],
    mutationFn: fetchLogin,
  });
};

export const authApi = {
  fetchLogin,
};

export type { FetchLoginRequest, FetchLoginResponse };

export { useFetchLogin };
