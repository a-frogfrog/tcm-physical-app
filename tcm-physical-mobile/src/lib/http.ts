import { createAxiosRequest } from '#/lib/request';

export const http = createAxiosRequest({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  handleRequestSuccess: (config) => {
    return config;
  },
  handleRequestError: (error) => {
    return Promise.reject(error.response?.data);
  },
  handleResponseSuccess: (response) => {
    const data = response.data;
    return data;
  },
  handleResponseError: (error) => {
    console.log('请求失败', error);
    return Promise.reject(error.response?.data);
  },
});
