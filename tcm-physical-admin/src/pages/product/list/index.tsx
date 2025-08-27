import { ProductHeader } from './ProductHeader';
import { ProductFilter, ProductFilterItem } from './ProductFilter';
import { filterItems } from './constants';

export default function ProductListPage() {
  return (
    <div>
      <ProductHeader />
      <ProductFilter>
        {filterItems.map((item) => (
          <ProductFilterItem
            key={item.name}
            name={item.name}
            group={item.group}
            options={item.options}
          />
        ))}
      </ProductFilter>
    </div>
  );
}
