import { Button } from '#/components/ui/button';
import React from 'react';
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
} from './constants';

const ProductFilter = ({ className, children }: ProductFilterProps) => {
  //获取子元素
  const items = useChildren(children, ProductFilterItems);
  const actions = useChildren(children, ProductFilterActions);

  return (
    <div className={`bg-white my-4 p-4 rounded-md shadow  ${className}`}>
      <article className='flex justify-between gap-6'>{items}</article>
      {actions}
    </div>
  );
};

const ProductFilterActions = ({
  onReset,
  onApply,
}: Partial<ProductFilterActionsProps>) => {
  return (
    <section className='py-2 mt-5 flex justify-end gap-2'>
      <Button variant='outline' onClick={onReset}>
        重置
      </Button>
      <Button onClick={onApply}>筛选</Button>
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
      <p className='text-gray-700 px-1 py-1 font-inter text-sm'>{name}</p>
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
