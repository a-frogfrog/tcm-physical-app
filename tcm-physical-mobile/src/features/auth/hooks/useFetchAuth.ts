import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';
import { authApi } from '../api/auth';
import { useAuthStore } from '#/store';

export function useAuthLogin() {
  const queryClient = useQueryClient();
  const setToken = useAuthStore((state) => state.setToken);
  return useMutation({
    mutationFn: authApi.fetchAuthLogin,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['auth_login'] });
      setToken(data.data.token);
    },
  });
}

export function useAuthCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.fetchAuthCode,
    onMutate: () => {
      toast.info('获取验证码中', {
        description: '请稍后',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth_code'] });
      toast.success('获取验证码成功', {
        description: '验证码已发送，请查收',
      });
    },
    onError(error) {
      toast.error(error.message);
    },
  });
}

export function useAuthCheck() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: authApi.fetchAuthCheck,
    onSuccess: (data) => {
      console.log(data);
      setUser(data.data);
      queryClient.invalidateQueries({ queryKey: ['auth_check'] });
    },
  });
}
