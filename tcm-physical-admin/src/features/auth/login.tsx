import { AuthLayout } from '#/components/layout';
import { LoginForm } from './components';
import { Link } from 'react-router-dom';

import { GalleryVerticalEnd } from 'lucide-react';

import { useApplication } from '#/hooks';

import { type LoginSchema } from './constants';
import { useFetchLogin } from './hooks/useFetchAuth';

import { useForm } from 'react-hook-form';

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
