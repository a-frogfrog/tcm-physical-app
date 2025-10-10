import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { routes } from '#/config/routes';

import { useAuthStore } from '#/stores';

const useFetchLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationKey: ['auth_login'],
    mutationFn: authApi.fetchLogin,
    onSuccess: async (data) => {
      setToken(data.data.token);

      //获取用户信息
      const res = await authApi.fetchAuthCheck();
      setUser(res.data);

      navigate(routes.core.dashboard.workbench.path);
      toast.success('登录成功');
      queryClient.invalidateQueries({ queryKey: ['auth_login'] });
    },
  });
};

export { useFetchLogin };
