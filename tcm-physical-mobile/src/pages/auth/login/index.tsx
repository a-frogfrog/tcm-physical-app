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
      email: '',
      password: '',
    },
  });

  const status = {
    email: useFieldStatus(form, 'email', form.watch('email')),
    password: useFieldStatus(form, 'password', form.watch('password')),
  };

  const handleSubmit = (data: FormSchema) => {
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
