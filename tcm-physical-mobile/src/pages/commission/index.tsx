import { PageTitle } from '#/components/common';
import CommissionCenter from './modules/CommissionCenter';
import RevenueChart from './modules/RevenueChart';

/**
 *
 * @returns 佣金页面
 */
export default function CommissionPage() {
  return (
    <>
      <PageTitle title='佣金中心' description='查看您的佣金明细和收益情况' />
      <CommissionCenter />
      <RevenueChart />
    </>
  );
}
