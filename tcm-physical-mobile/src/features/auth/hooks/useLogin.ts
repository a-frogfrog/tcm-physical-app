import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { routes } from '#/config/routes';

import { loginSchema, type LoginSchema } from '#/schemas';

import { useAuthCode, useAuthLogin } from '#/features/auth/hooks/useAuth';
import { useFieldStatus } from '#/features/auth/components/VerifyInput';

export function useLogin() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      loginType: 'code',
      email: '',
      code: '',
    },
  });
  const { mutate: loginApi, isPending } = useAuthLogin();
  const { mutate: codeApi } = useAuthCode();

  const passwordStatus = {
    email: useFieldStatus(form, 'email', form.watch('email')),
    password: useFieldStatus(form, 'password', form.watch('password')),
  };

  const codeStatus = {
    email: useFieldStatus(form, 'email', form.watch('email')),
    code: useFieldStatus(form, 'code', form.watch('code')),
  };

  const loginType = form.watch('loginType');

  const handleChangeLoginType = (type: typeof loginType) => {
    form.setValue('loginType', type);
  };

  const handleSubmit = (data: LoginSchema) => {
    loginApi({
      email: data.email,
      code: data.loginType === 'code' ? data.code : '',
    });
  };

  const handleGetCode = () => {
    codeApi({ email: form.watch('email') });
  };

  return {
    form,
    passwordStatus,
    codeStatus,
    loginType,
    handleChangeLoginType,
    handleSubmit,
    handleGetCode,
    link: routes.auth.register.path,
    isPending,
  };
}
