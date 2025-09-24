import { useFieldStatus } from '../components/VerifyInput';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import LoginForm from './LoginForm';
import { formSchema, type FormSchema } from './constants';
import { routes } from '#/config/routes';

export default function LoginPage() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      account: '',
      password: '',
    },
  });

  const status = {
    account: useFieldStatus(form, 'account', form.watch('account')),
    password: useFieldStatus(form, 'password', form.watch('password')),
  };

  return (
    <LoginForm
      form={form}
      status={status}
      registerLink={routes.auth.register.path}
    />
  );
}
