import { useFieldStatus } from '../components/VerifyInput';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import LoginForm from './components/LoginForm';
import { routes } from '#/config/routes';
import { loginSchema, type LoginSchema } from '#/schemas';

export default function LoginPage() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      loginType: 'code',
      email: '',
      code: '',
    },
  });

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
    console.log(type);
    form.setValue('loginType', type);
  };

  const handleSubmit = (data: LoginSchema) => {
    console.log(data);
  };

  return (
    <LoginForm
      form={form}
      loginType={loginType}
      status={loginType === 'code' ? codeStatus : passwordStatus}
      registerLink={routes.auth.register.path}
      onSubmit={handleSubmit}
      onChangeLoginType={handleChangeLoginType}
    />
  );
}
