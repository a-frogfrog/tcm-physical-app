import { PageTitle, StatCard } from '#/components/common';
import { Bike, Bubbles, Calculator, CloudDrizzle } from 'lucide-react';

const cardItems = [
  {
    title: '套餐总数',
    value: 120,
    trend: {
      percentage: 10,
      isIncrease: true,
      compareText: '较上月增加',
    },
    icon: Bike,
    iconColor: 'bg-amber-00',
  },
  {
    title: '本月销量',
    value: 522,
    trend: {
      percentage: 10,
      isIncrease: true,
      compareText: '较上月增加',
    },
    icon: Bubbles,
  },
  {
    title: '热门套餐',
    value: 4,
    trend: {
      percentage: 10,
      isIncrease: true,
      compareText: '较上月增加',
    },
    icon: Calculator,
  },
  {
    title: '待更新套餐',
    value: 2,
    trend: {
      percentage: 11,
      isIncrease: true,
      compareText: '较上月增加',
    },
    icon: CloudDrizzle,
  },
];

export default function OrderListPage() {
  return (
    <div>
      <PageTitle
        title='订单列表'
        desc='查看和管理所有中医理疗订单，处理预约确认、服务完成等操作'
      />
      <section className='my-6 grid grid-cols-2 gap-4 lg:grid-cols-4'>
        {cardItems.map(({ title, value, trend, icon }) => (
          <StatCard
            className='duration-400 hover:-translate-y-1 hover:scale-101'
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
    </div>
  );
}
