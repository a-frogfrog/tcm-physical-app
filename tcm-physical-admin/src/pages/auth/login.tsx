import { AuthLayout } from '#/components/layout';
import { LoginForm } from '#/features/auth/components';

import { useApplication } from '#/hooks';

import { type LoginSchema } from '#/features/auth/constants';
import { useFetchLogin } from '#/features/auth/hooks/useFetchAuth';

import { useForm } from 'react-hook-form';
import { Logo } from '#/components/common';

export default function LoginRoute() {
  const { name } = useApplication();
  const loginForm = useForm<LoginSchema>({
    defaultValues: {
      account: '',
      password: '',
    },
  });
  const { mutate: login } = useFetchLogin();

  const onSubmit = (data: LoginSchema) => {
    login(data);
  };

  return (
    <AuthLayout logo={<Logo name={name} />} imgSrc='/login_background.webp'>
      <LoginForm form={loginForm} onSubmit={onSubmit} />
    </AuthLayout>
  );
}
