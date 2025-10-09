type AuthLayoutProps = {
  logo: React.ReactNode;
  imgSrc: string;
};

const AuthLayout = ({
  children,
  logo,
  imgSrc,
}: React.ComponentProps<'div'> & AuthLayoutProps) => {
  return (
    <main className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          {logo}
          {/* <Link to='#' className='flex items-center gap-2 font-medium'>
            <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
              <GalleryVerticalEnd className='size-4' />
            </div>
            Acme Inc.
          </Link> */}
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>{children}</div>
        </div>
      </div>
      <figure className='bg-muted relative hidden lg:block'>
        <img
          src={imgSrc}
          alt='Image'
          className='absolute inset-0 h-full w-full bg-cover object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </figure>
    </main>
  );
};

export { AuthLayout };
