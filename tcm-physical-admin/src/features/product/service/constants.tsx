import { Input } from '#/components/ui/input';

export type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number; // minutes
  img: string;
};

export const filterItems = [
  {
    name: '产品分类',
    group: '分类',
    placeholder: '选择产品分类',
    options: ['分类1', '分类2', '分类3'],
    handleChange: (value: string) => {
      console.log('Selected category:', value);
    },
  },
  {
    name: '品牌',
    group: '品牌',
    placeholder: '选择品牌',
    options: ['品牌1', '品牌2', '品牌3'],
    handleChange: (value: string) => {
      console.log('Selected brand:', value);
    },
  },
  {
    name: '价格区间',
    group: '价格',
    placeholder: '选择价格区间',
    options: ['0-100', '100-200', '200-300'],
    handleChange: (value: string) => {
      console.log('Selected price range:', value);
    },
  },
  {
    name: '产品搜索',
    options: ['0-100', '100-200', '200-300'],
    element: <Input type='search' placeholder='产品搜索' />,
  },
];

export type ProductFilterItemProps = {
  name: string;
  group: string;
  placeholder: string;
  options: string[];
  element: React.ReactNode;
  onChange: (value: string) => void;
};

//除去options属性外,其余属性可选.
export type ProductFilterItemPropsPartial = Partial<ProductFilterItemProps> &
  Pick<Required<ProductFilterItemProps>, 'options'>;

export type ProductFilterActionsProps = {
  onReset: () => void;
  onApply: () => void;
};

export type ProductFilterProps = {
  className?: string;
  children: React.ReactNode[];
};
