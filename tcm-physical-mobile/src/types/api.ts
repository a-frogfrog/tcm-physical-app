export type ApiResponsePageRequest = {
  page: number;
  limit: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiResponsePageResponse<T = any> = {
  total: number;
  data: T[];
};
