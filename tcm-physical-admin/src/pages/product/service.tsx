import {
  ProductFilter,
  ProductFilterItem,
  ProductFilterItems,
  ProductFilterActions,
  ProductCard,
  ProductHeader,
} from '#/features/product/service/components';
import { Input, SkeletonCard } from '#/components/ui';

import { useProductServiceEvents } from '#/features/product/service/hooks/useServiceEvent';
import { useServiceList } from '#/features/product/service/hooks/useFetchService';

const filterItems = [
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

export default function ProductServiceRoute() {
  const { handleApply, handleReset } = useProductServiceEvents();
  const { data: serviceList, isLoading } = useServiceList();

  return (
    <>
      <ProductHeader />
      <ProductFilter>
        <ProductFilterItems>
          {filterItems.map((item, index) => (
            <ProductFilterItem key={index} {...item} />
          ))}
        </ProductFilterItems>
        <ProductFilterActions onApply={handleApply} onReset={handleReset} />
      </ProductFilter>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {isLoading ? (
          <SkeletonCard />
        ) : (
          serviceList?.map((item) => <ProductCard key={item.id} {...item} />)
        )}
      </div>
    </>
  );
}
