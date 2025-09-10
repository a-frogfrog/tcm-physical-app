import { PageTitle, StatCard } from '#/components/common';
import { Button } from '#/components/ui/button';
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
    icon: <Bike />,
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
    icon: <Bubbles />,
  },
  {
    title: '热门套餐',
    value: 4,
    trend: {
      percentage: 10,
      isIncrease: true,
      compareText: '较上月增加',
    },
    icon: <Calculator />, 
  },
  {
    title: '待更新套餐',
    value: 2,
    trend: {
      percentage: 10,
      isIncrease: true,
      compareText: '较上月增加',
    },
    icon: <CloudDrizzle />,
  },
];

export default function ProductPackagePage() {
  return (
    <div>
      <PageTitle
        title='产品套餐管理'
        desc='管理所有中医理疗套餐，包括新增、编辑和停用套餐'
        actions={<Button>新增套餐</Button>}
      />

      <section className='grid grid-cols-4 gap-4'>
        {cardItems.map(({ title, value, trend, icon }) => (
          <StatCard
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
