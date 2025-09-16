import ProductList from './modules/ProductList';
import PromotionCard from './modules/PromotionCard';
import QuickActions from './modules/QuickActions';

export default function HomePage() {
  return (
    <>
      <PromotionCard />
      <ProductList />
      <QuickActions />
    </>
  );
}
