import { ProductHeader } from './ProductHeader';
import {
  ProductFilter,
  ProductFilterItem,
  ProductFilterItems,
  ProductFilterActions,
} from './ProductFilter';
import { filterItems, tableData } from './constants';
import { useProductListEvents } from './useProductList';
import ProductTable from './ProductTable';

export default function ProductServicePage() {
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
      <ProductTable data={tableData} />
    </div>
  );
}
