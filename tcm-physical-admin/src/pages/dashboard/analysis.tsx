import {
  BestSellerCard,
  CustomerAnalysisChart,
  TransactionsCard,
} from '#/features/customer/components';
import { TrendsChart } from '#/features/customer/components/TrendsChart';

export default function AnalysisRoute() {
  return (
    <div className='grid grid-cols-3 gap-4'>
      <section className='col-span-1'>
        <BestSellerCard />
      </section>
      <section className='col-span-2'>
        <TransactionsCard />
      </section>
      <section className='col-span-3'>
        <TrendsChart />
      </section>
      <section className='col-span-3'>
        <CustomerAnalysisChart />
      </section>
    </div>
  );
}
