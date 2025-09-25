import { http } from '#/lib/http';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export type LoginRequestParams = {
  email: string;
  code: string;
};

export type CodeRequestParams = {
  email: LoginRequestParams['email'];
};

/**
 * 登录
 * @param params 登录参数
 * @returns
 */
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

/**
 * 获取登录验证码
 * @param params 邮箱
 * @returns
 */
const fetchAuthCode = (params: CodeRequestParams) => {
  return http.post('/Email/SendVerificationCode', params);
};

export const authApi = {
  fetchAuthLogin,
  fetchAuthCode,
};

export function useAuthLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.fetchAuthLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth_login'] });
    },
  });
}

export function useAuthCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.fetchAuthCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth_code'] });
    },
  });
}
