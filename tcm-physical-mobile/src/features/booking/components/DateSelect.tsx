const DateSelect = ({ children }: React.ComponentProps<'article'>) => {
  return (
    <div className='rounded-xl bg-white p-4 shadow-md'>
      <h3 className='mb-3 font-bold'>选择日期</h3>
      <div className='scrollbar-hide overflow-x-auto'>
        <div className='flex min-w-max space-x-3 pb-2'>{children}</div>
      </div>
    </div>
  );
};

type DateSelectItemProps = {
  iso: string;
  day: string;
  date: string;
  month: string;
  selected: boolean;
  onSelect: (iso: string) => void;
};
const DateSelectItem = ({
  iso,
  day,
  date,
  month,
  selected,
  onSelect,
}: DateSelectItemProps) => {
  return (
    <div
      key={iso}
      onClick={() => onSelect(iso)}
      className={`card-hover flex h-24 w-20 cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 ${selected ? 'border-[#2E8B57] bg-[#2E8B57]/10' : ''}`}>
      <span className='text-sm text-gray-500'>{day}</span>
      <span className='mt-1 text-xl font-bold'>{date}</span>
      <span className='mt-1 text-xs text-gray-500'>{month}</span>
    </div>
  );
};

export { DateSelect, DateSelectItem };
