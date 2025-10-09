import { http } from '#/lib/http';
import { loginAdapter } from './adapter';

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
  return http.post('/Logins/Customer_Logins', loginAdapter(params));
};

/**
 * 获取登录验证码
 * @param params 邮箱
 * @returns
 */
const fetchAuthCode = async (params: CodeRequestParams) => {
  return await http.post('/Email/SendVerificationCode', params);
};

const fetchAuthCheck = async () => {
  return await http.get('/Logins/Customer_Check_Login');
};

export const authApi = {
  fetchAuthLogin,
  fetchAuthCode,
  fetchAuthCheck,
};
