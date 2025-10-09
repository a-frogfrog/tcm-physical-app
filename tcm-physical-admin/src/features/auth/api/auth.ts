import { http } from '#/lib/http';

import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { fetchLoginAdapter } from './adapter';

export const loginSchema = z.object({
  account: z.string().min(1, '请输入账号'),
  password: z.string().min(1, '请输入密码'),
});

export type LoginSchema = z.infer<typeof loginSchema>;

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

const fetchLogin = async (request: LoginSchema) => {
  return http.post<FetchLoginResponse>(
    '/Logins/Logins',
    fetchLoginAdapter(request),
  );
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
