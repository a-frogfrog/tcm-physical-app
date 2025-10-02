import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

type CreateAxiosRequestOptions = AxiosRequestConfig & {
  handleRequestError?: (error: AxiosError) => Promise<AxiosError>;
  handleResponseError?: (error: AxiosError) => Promise<AxiosError>;
  handleRequestSuccess?: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig;
  handleResponseSuccess?: (response: AxiosResponse) => AxiosResponse;
};

/**
 * 创建 axios 基础实例
 * @param options 配置选项
 * @returns axios 实例
 */
export function createAxiosRequest(options: CreateAxiosRequestOptions) {
  // 创建 axios 实例
  const instance = axios.create({
    baseURL: options.baseURL || '/api',
    timeout: options.timeout || 10000,
    headers: options.headers || {},
    ...options,
  });

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      return options.handleRequestSuccess?.(config) || config;
    },
    (error) => {
      return options.handleRequestError?.(error) || Promise.reject(error);
    },
  );

  // 响应拦截器
  instance.interceptors.response.use(
    (response) => {
      return options.handleResponseSuccess?.(response) || response;
    },
    (error) => {
      return options.handleResponseError?.(error) || Promise.reject(error);
    },
  );

  return instance;
}
