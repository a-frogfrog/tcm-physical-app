import { PageTitle } from '#/components/common';
import {
  PromotionFilter,
  PromotionTable,
} from '#/features/promotion/components';

export default function PromotionListRoute() {
  return (
    <>
      <PageTitle title='促销管理' desc='管理促销活动' />
      <PromotionFilter className='base-card my-6' />
      <PromotionTable className='base-card my-6' />
    </>
  );
}
