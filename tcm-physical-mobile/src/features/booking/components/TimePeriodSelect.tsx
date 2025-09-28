import { cn } from '#/lib/utils';

const TimePeriodSelect = ({ children }: React.ComponentProps<'article'>) => {
  return (
    <div className='rounded-xl bg-white p-4 shadow-md'>
      <h3 className='mb-3 font-bold'>选择时间段</h3>
      <div className='grid grid-cols-3 gap-2'>{children}</div>
    </div>
  );
};

const TimePeriodSelectItem = ({
  onClick,
  disabled,
  selected,
  children,
}: React.ComponentProps<'button'> & { selected: boolean }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'card-hover cursor-pointer rounded-lg border border-gray-200 px-0.5 py-3 text-center text-sm',
        {
          'cursor-not-allowed opacity-50': disabled,
          'border-[#2E8B57] bg-[#2E8B57]/10': selected,
        },
      )}>
      {children}
    </button>
  );
};

export { TimePeriodSelect, TimePeriodSelectItem };
