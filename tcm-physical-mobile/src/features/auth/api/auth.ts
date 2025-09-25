import { http } from '#/lib/http';

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
  const adaptedData = {
    account: params.email,
    password: params.code,
    code: '',
    //cspell:words vipid
    vipid: '',
    vipCode: '',
  };
  return http.post('/Logins/Customer_Logins', adaptedData);
};

/**
 * 获取登录验证码
 * @param params 邮箱
 * @returns
 */
const fetchAuthCode = async (params: CodeRequestParams) => {
  return await http.post('/Email/SendVerificationCode', params);
};

export const authApi = {
  fetchAuthLogin,
  fetchAuthCode,
};
