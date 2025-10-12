import { GalleryVerticalEnd } from 'lucide-react';
import { Link } from 'react-router-dom';

type LogoProps = {
  name: string;
};

const Logo = ({ name }: LogoProps) => {
  return (
    <Link to='#' className='flex items-center gap-2 font-medium'>
      <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
        <GalleryVerticalEnd className='size-4' />
      </div>
      {name}.
    </Link>
  );
};

export { Logo };
