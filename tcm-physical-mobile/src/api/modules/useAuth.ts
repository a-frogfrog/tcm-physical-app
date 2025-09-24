import { authApi } from './auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAuthLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.fetchAuthLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}
