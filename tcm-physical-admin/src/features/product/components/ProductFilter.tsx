import { Button } from '#/components/ui/button';
import { useChildren } from '#/hooks';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select';
import type {
  ProductFilterActionsProps,
  ProductFilterItemPropsPartial,
  ProductFilterProps,
} from '../types';

const ProductFilter = ({ className, children }: ProductFilterProps) => {
  //获取子元素
  const items = useChildren(children, ProductFilterItems);
  const actions = useChildren(children, ProductFilterActions);

  return (
    <form className={`my-4 rounded-md bg-white p-4 shadow ${className}`}>
      <article className='flex flex-wrap justify-between gap-6 md:flex-nowrap'>
        {items}
      </article>
      {actions}
    </form>
  );
};

const ProductFilterActions = ({
  onReset,
  onApply,
}: Partial<ProductFilterActionsProps>) => {
  return (
    <section className='mt-5 flex justify-end gap-2 py-2'>
      <Button type='reset' variant='outline' onClick={onReset}>
        重置
      </Button>
      <Button type='submit' onClick={onApply}>
        筛选
      </Button>
    </section>
  );
};

const ProductFilterItems = ({ children }: { children: React.ReactNode[] }) => {
  return <>{children}</>;
};

const ProductFilterItem = ({
  name,
  group,
  placeholder,
  options,
  element,
  onChange,
}: ProductFilterItemPropsPartial) => {
  const SelectFilter = () => {
    return (
      <Select onValueChange={onChange}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder={placeholder} />
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
    );
  };

  return (
    <section className='w-full'>
      <label
        aria-label={name}
        className='font-inter px-1 py-1 text-sm text-gray-700'>
        {name}
      </label>
      {element ? element : <SelectFilter />}
    </section>
  );
};

//挂载到ProductFilter组件属性.
ProductFilter.Item = ProductFilterItem;
ProductFilter.Items = ProductFilterItems;
ProductFilter.Actions = ProductFilterActions;

export {
  ProductFilter,
  ProductFilterItem,
  ProductFilterItems,
  ProductFilterActions,
};
