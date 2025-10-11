import { PageTitle, StatCard } from '#/components/common';
import { Button } from '#/components/ui';
import { PackageChart, PackageTable } from '#/features/product/components';

import { cardItems } from '#/features/product/mock/package';

export default function ProductPackageRoute() {
  return (
    <div>
      <PageTitle
        title='产品套餐管理'
        desc='管理所有中医理疗套餐，包括新增、编辑和停用套餐'
        actions={<Button>新增套餐</Button>}
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
      <section className='base-card my-6 flex h-72 max-h-[600px] flex-col'>
        <div className='mb-2 flex justify-end gap-2'>
          <article className='flex-1'>
            <h2 title='产品套餐趋势' className='text-lg font-bold'>
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
      <section className='base-card my-6'>
        <PackageTable />
      </section>
    </div>
  );
}
