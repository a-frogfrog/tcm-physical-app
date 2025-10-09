import type { LoginRequestParams } from './auth';

export const loginAdapter = (params: LoginRequestParams) => ({
  account: params.email,
  password: params.code,
  code: '',
  //cspell:words vipid
  vipid: '',
  vipCode: '',
});
