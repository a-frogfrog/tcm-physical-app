import { ProductHeader } from './ProductHeader';
import {
  ProductFilter,
  ProductFilterItem,
  ProductFilterItems,
  ProductFilterActions,
} from './ProductFilter';
import { filterItems } from './constants';
import { useProductListEvents } from './useProductList';

export default function ProductListPage() {
  const { handleApply, handleReset } = useProductListEvents();

  return (
    <div>
      <ProductHeader />
      <ProductFilter>
        <ProductFilterItems>
          {filterItems.map((item) => (
            <ProductFilterItem
              key={item.name}
              name={item.name}
              group={item.group}
              placeholder={item.placeholder}
              options={item.options}
              element={item.element}
              onChange={item.handleChange}
            />
          ))}
        </ProductFilterItems>
        <ProductFilterActions onApply={handleApply} onReset={handleReset} />
      </ProductFilter>
    </div>
  );
}
