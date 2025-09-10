import { PageTitle, StatCard } from '#/components/common';
import { Button } from '#/components/ui/button';
import { useProductPackageData } from './useProductPackage';

export default function ProductPackagePage() {
  const { cardItems } = useProductPackageData();
  return (
    <div>
      <PageTitle
        title='产品套餐管理'
        desc='管理所有中医理疗套餐，包括新增、编辑和停用套餐'
        actions={<Button>新增套餐</Button>}
      />

      <section className='grid grid-cols-4 gap-4 mt-4'>
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
