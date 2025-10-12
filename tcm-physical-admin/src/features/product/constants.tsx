export interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  duration: string;
  features: string[];
  description: string;
  imageUrl: string;
  status: '正常运营' | '休息中' | '已下架';
  servicesCount: number;
  rating: number;
  lastUpdated: string;
}

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
