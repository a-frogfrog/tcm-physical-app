import { createAxiosRequest } from '#/lib/request';

export const http = createAxiosRequest({
  baseURL: '/api',
});
