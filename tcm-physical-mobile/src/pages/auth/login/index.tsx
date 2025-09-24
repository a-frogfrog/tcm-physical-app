import { useFieldStatus } from '../components/VerifyInput';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import LoginForm from './LoginForm';
import { routes } from '#/config/routes';
import { loginSchema, type LoginSchema } from '#/schemas';

export default function LoginPage() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const status = {
    email: useFieldStatus(form, 'email', form.watch('email')),
    password: useFieldStatus(form, 'password', form.watch('password')),
  };

  const handleSubmit = (data: LoginSchema) => {
    console.log(data);
  };

  return (
    <LoginForm
      form={form}
      status={status}
      onSubmit={handleSubmit}
      registerLink={routes.auth.register.path}
    />
  );
}
