import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';
import { authApi } from '../api/auth';
import { useAuthStore } from '#/store';

import { useNavigate } from 'react-router-dom';
import { routes } from '#/config/routes';

export function useAuthLogin() {
  const queryClient = useQueryClient();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.fetchAuthLogin,
    // 登录成功后，刷新登录查询，设置 token，并重定向到首页
    onSuccess: async (data) => {
      setToken(data.data.token);

      //获取用户信息
      const res = await authApi.fetchAuthCheck();
      setUser(res.data);

      queryClient.invalidateQueries({ queryKey: ['auth_login'] });

      navigate(routes.tabbar.home.path);
    },
  });
}

export function useAuthCode() {
  return useMutation({
    mutationFn: authApi.fetchAuthCode,
    onMutate: () => {
      toast.info('获取验证码中', {
        description: '请稍后',
      });
    },
    onSuccess: () => {
      toast.success('获取验证码成功', {
        description: '验证码已发送，请查收',
      });
    },
    onError(error) {
      toast.error(error.message);
    },
  });
}
