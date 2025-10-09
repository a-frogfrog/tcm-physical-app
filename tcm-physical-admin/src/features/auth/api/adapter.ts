import type { FetchLoginRequest, LoginSchema } from './auth';

const fetchLoginAdapter = (request: LoginSchema): FetchLoginRequest => ({
  account: request.account,
  password: request.password,
  code: '',
  vipId: '',
  vipCode: '',
});

export { fetchLoginAdapter };
