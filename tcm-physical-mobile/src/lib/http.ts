import { createAxiosRequest } from '#/lib/request';
import { useAuthStore } from '#/store';

export const http = createAxiosRequest({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  handleRequestSuccess: (config) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const token = useAuthStore((state) => state.token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
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
