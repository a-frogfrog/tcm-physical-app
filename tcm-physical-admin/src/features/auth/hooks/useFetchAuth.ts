import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { routes } from '#/config/routes';

const useFetchLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['auth_login'],
    mutationFn: authApi.fetchLogin,
    onSuccess: () => {
      navigate(routes.core.dashboard.workbench.path);
      toast.success('登录成功');
    },
  });
};

export { useFetchLogin };
