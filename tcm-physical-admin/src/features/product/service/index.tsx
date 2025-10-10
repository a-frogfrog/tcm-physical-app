import { ProductHeader } from './components/ProductHeader';
import {
  ProductFilter,
  ProductFilterItem,
  ProductFilterItems,
  ProductFilterActions,
} from './components/ProductFilter';
import { filterItems } from './constants';
import { useProductServiceEvents } from './components/useProductService';
import { ProductCard } from './components/ProductCard';
import { productCardData } from './mock';
import { useServiceList } from './hooks/useFetchService';

export default function ProductServicePage() {
  const { handleApply, handleReset } = useProductServiceEvents();
  const { data: serviceList } = useServiceList();
  console.log(serviceList);

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
        {productCardData.map((item, index) => (
          <ProductCard key={index} {...item} />
        ))}
      </div>
    </>
  );
}
