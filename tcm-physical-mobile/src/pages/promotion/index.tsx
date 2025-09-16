import { PageTitle } from '#/components/common';
import PromotionLink from './modules/PromotionLink';
import PromotionMethod from './modules/PromotionMethod';
import PromotionStats from './modules/PromotionStats';
import PromotionTutorial from './modules/PromotionTutorial';

/**
 *
 * @returns 推广页面
 */
export default function PromotionPage() {
  return (
    <>
      <PageTitle
        title='我的推广'
        description='分享优质中医服务，赚取丰厚佣金'
      />
      <PromotionStats />
      <PromotionMethod />
      <PromotionLink />
      <PromotionTutorial />
    </>
  );
}
