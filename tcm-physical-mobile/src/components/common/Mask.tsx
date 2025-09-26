import { cn } from '#/lib/utils';

type MaskProps = {
  backdrop: boolean;
};

const Mask = ({
  className,
  children,
  backdrop,
}: React.ComponentProps<'div'> & Partial<MaskProps>) => {
  return (
    <div
      className={cn(
        'bg-opacity-50 absolute inset-0 z-50 bg-black/25',
        className,
        {
          'backdrop-blur-md': backdrop,
        },
      )}>
      {children}
    </div>
  );
};

export { Mask };
