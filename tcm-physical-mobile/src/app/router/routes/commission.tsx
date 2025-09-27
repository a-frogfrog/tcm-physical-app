import { PageTitle } from '#/components/common';

import {
  CommissionCenter,
  RevenueChart,
} from '#/features/commission/components';

export default function CommissionRoute() {
  return (
    <>
      <PageTitle title='佣金中心' description='查看您的佣金明细和收益情况' />
      <CommissionCenter />
      <RevenueChart />
    </>
  );
}
