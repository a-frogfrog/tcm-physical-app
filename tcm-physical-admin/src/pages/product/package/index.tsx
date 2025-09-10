import { PageTitle, StatCard } from '#/components/common';
import { Button } from '#/components/ui/button';
import PackageChart from './PackageChart';
import PackageTable from './PackageTable';
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

      <section className='grid grid-cols-4 gap-4 my-6'>
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
      <section className='my-6 h-72 max-h-[600px] base-card flex flex-col'>
        <div className='mb-2 flex gap-2 justify-end'>
          <article className='flex-1'>
            <h2 title='产品套餐趋势' className='text-lg font-bold '>
              产品套餐趋势
            </h2>
            <p className='text-sm text-gray-500'>
              展示产品套餐的销售趋势，帮助用户了解产品的受欢迎程度和销售情况。
            </p>
          </article>
          <Button size='sm'>月度</Button>
          <Button size='sm' variant='outline'>
            季度
          </Button>
          <Button size='sm' variant='outline'>
            年度
          </Button>
        </div>
        <PackageChart />
      </section>
      <section className='my-6 base-card'>
        <PackageTable />
      </section>
    </div>
  );
}
