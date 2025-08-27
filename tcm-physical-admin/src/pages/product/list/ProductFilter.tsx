import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select';

interface ProductFilterItemProps {
  name: string;
  group: string;
  options: string[];
}

const ProductFilterItem = ({
  name,
  group,
  options,
}: ProductFilterItemProps) => {
  return (
    <section className='w-full'>
      <p className='text-gray-700 px-1 py-1 '>{name}</p>
      <Select>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Select a fruit' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{group}</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
  );
};

const ProductFilter = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={`bg-white my-4 p-4 rounded-md shadow flex justify-between gap-6 ${className}`}>
      {children}
    </div>
  );
};

export { ProductFilter, ProductFilterItem };
