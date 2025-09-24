import { createAxiosRequest } from '#/lib/request';

export const http = createAxiosRequest({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
