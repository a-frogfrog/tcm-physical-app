import { createAxiosRequest } from '#/lib/request';

export const http = createAxiosRequest({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  handleResponseSuccess: (response) => {
    return response.data?.data;
  },
  handleResponseError: (error) => {
    console.log('请求失败', error);
    return Promise.reject(error.response?.data);
  },
});
