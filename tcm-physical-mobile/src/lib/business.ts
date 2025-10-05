import type { AxiosResponse } from 'axios';
import { toast } from 'sonner';

/**
 * @description 根据业务码处理业务逻辑
 */
const BUSINESS = {
  0: {
    task: (response: AxiosResponse) => {
      return response.data.data;
    },
  },
  '-1': {
    task: (response: AxiosResponse) => {
      // 处理业务逻辑
      toast.error(response.data.message);
    },
  },
};

export function handleBusiness(response: AxiosResponse) {
  const business = BUSINESS[response.data.code as keyof typeof BUSINESS];
  if (business) {
    business.task(response);
  }
}
