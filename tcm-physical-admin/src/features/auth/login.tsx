import { LoginForm } from './components';
import { Link } from 'react-router-dom';

import { GalleryVerticalEnd } from 'lucide-react';
import { AuthLayout } from '#/components/layout';

const Logo = () => {
  return (
    <Link to='#' className='flex items-center gap-2 font-medium'>
      <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
        <GalleryVerticalEnd className='size-4' />
      </div>
      Acme Inc.
    </Link>
  );
};

export default function LoginRoute() {
  return (
    <AuthLayout logo={<Logo />} imgSrc='/login_background.webp'>
      <LoginForm />
    </AuthLayout>
  );
}
