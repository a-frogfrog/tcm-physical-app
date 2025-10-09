import { Input } from '#/components/ui/input';

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

export const tableData = [
  {
    id: 1,
    productName: 'Product 1',
    productInfo: 'Product 1 Info',
    photo: 'https://picsum.photos/200/300',
    category: 'Category 1',
    price: '￥100.00',
    stock: 10,
    status: 'Active',
    description: 'Product 1 Description',
  },
  {
    id: 2,
    productName: 'Product 2',
    productInfo: 'Product 2 Info',
    photo: 'https://picsum.photos/200/300',
    category: 'Category 2',
    price: '￥200.00',
    stock: 20,
    status: 'Active',
    description: 'Product 2 Description',
  },
  {
    id: 3,
    productName: 'Product 3',
    productInfo: 'Product 3 Info',
    photo: 'https://picsum.photos/200/300',
    category: 'Category 3',
    price: '￥300.00',
    stock: 30,
    status: 'Active',
    description: 'Product 3 Description',
  },
  {
    id: 4,
    productName: 'Product 4',
    productInfo: 'Product 4 Info',
    photo: 'https://picsum.photos/200/300',
    category: 'Category 4',
    price: '￥400.00',
    stock: 40,
    status: 'Active',
    description: 'Product 4 Description',
  },
  {
    id: 5,
    productName: 'Product 5',
    productInfo: 'Product 5 Info',
    photo: 'https://picsum.photos/200/300',
    category: 'Category 5',
    price: '￥500.00',
    stock: 50,
    status: 'Active',
    description: 'Product 5 Description',
  },
  {
    id: 6,
    productName: 'Product 6',
    productInfo: 'Product 6 Info',
    photo: 'https://picsum.photos/200/300',
    category: 'Category 6',
    price: '￥600.00',
    stock: 60,
    status: 'Active',
    description: 'Product 6 Description',
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
