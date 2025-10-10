import { routes } from '#/config/routes';
import { createAxiosRequest } from '#/lib/request';
import { useAuthStore } from '#/store';

import { handleBusiness } from './business';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

export const http = createAxiosRequest({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  handleRequestSuccess: (config) => {
    config.headers['Authorization'] = `Bearer ${useAuthStore.getState().token}`;
    return config;
  },
  handleRequestError: (error) => {
    return Promise.reject(error.response?.data);
  },
  handleResponseSuccess: (response) => {
    const data = response.data;
    handleBusiness(response);
    return data;
  },
  handleResponseError: (error) => {
    const { code } = error;

    const responseError = RESPONSE_ERROR[code as keyof typeof RESPONSE_ERROR];
    if (responseError) {
      responseError.task(error);
    }
    return Promise.reject(error.response?.data);
  },
});

/**
 * @description 响应错误处理
 */
const RESPONSE_ERROR = {
  ERR_NETWORK: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    task: (_error: AxiosError) => {
      // console.log(_error);
      window.location.href = routes.auth.login.path;
      toast.error('网络错误，请稍后重试！ 😵');
    },
  },
  401: {
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    task: (_error: AxiosError) => {
      toast.error('登录过期，请重新登录！ 🔑');
    },
  },
};
