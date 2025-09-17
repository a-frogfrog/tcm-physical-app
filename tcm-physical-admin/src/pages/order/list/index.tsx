import { PageTitle, StatCard } from '#/components/common';
import OrderTrendChart from './OrderTrendChart';
import OrderTable from './OrderTable';
import { useOrderList } from './useOrderList';

export default function OrderListPage() {
  const { cardItems } = useOrderList();
  return (
    <>
      <PageTitle
        title='订单列表'
        desc='查看和管理所有中医理疗订单，处理预约确认、服务完成等操作'
      />
      <section className='my-6 grid grid-cols-2 gap-4 lg:grid-cols-4'>
        {cardItems.map(({ title, value, trend, icon }) => (
          <StatCard
            className='duration-400 hover:scale-101 hover:-translate-y-1'
            key={title}
            title={title}
            value={value}
            trend={{
              percentage: trend.percentage,
              isIncrease: trend.isIncrease,
              compareText: trend.compareText,
            }}
            icon={icon}
          />
        ))}
      </section>
      <OrderTrendChart />
      <OrderTable className='my-6' />
    </>
  );
}
