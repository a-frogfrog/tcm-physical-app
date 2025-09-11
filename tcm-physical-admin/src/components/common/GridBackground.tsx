import { cn } from '#/lib/utils';

const GridBackground = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'w-full h-full bg-[#F3F3F3] [--color:#E1E1E1] bg-[size:55px_55px] bg-[image:linear-gradient(0deg,transparent_24%,var(--color)_25%,var(--color)_26%,transparent_27%,transparent_74%,var(--color)_75%,var(--color)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,var(--color)_25%,var(--color)_26%,transparent_27%,transparent_74%,var(--color)_75%,var(--color)_76%,transparent_77%,transparent)]',
        className,
      )}>
      {children}
    </div>
  );
};

export { GridBackground };
