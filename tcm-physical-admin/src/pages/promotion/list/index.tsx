import { PageTitle } from '#/components/common';
import PromotionFilter from './PromotionFilter';
import PromotionTable from './PromotionTable';

export default function PromotePage() {
  return (
    <>
      <PageTitle title='促销管理' desc='管理促销活动' />
      <PromotionFilter className='base-card my-6' />
      <PromotionTable className='base-card my-6' />
    </>
  );
}
