import { LoginForm } from './components';
import { Link } from 'react-router-dom';

import { GalleryVerticalEnd } from 'lucide-react';
import { AuthLayout } from '#/components/layout';
import { useApplication } from '#/hooks';
import { loginSchema, type LoginSchema } from './constants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFetchLogin } from './api/auth';

const Logo = () => {
  const { name } = useApplication();
  return (
    <Link to='#' className='flex items-center gap-2 font-medium'>
      <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
        <GalleryVerticalEnd className='size-4' />
      </div>
      {name}.
    </Link>
  );
};

export default function LoginRoute() {
  const loginForm = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
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
    <AuthLayout logo={<Logo />} imgSrc='/login_background.webp'>
      <LoginForm form={loginForm} onSubmit={onSubmit} />
    </AuthLayout>
  );
}
