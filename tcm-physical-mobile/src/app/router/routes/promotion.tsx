import { PageTitle } from '#/components/common';
import {
  PromotionLink,
  PromotionMethod,
  PromotionStats,
  PromotionStep,
  PromotionTutorial,
} from '#/features/promotion/components';
import { useFetchPromotion } from '#/features/promotion/hooks/useFetchPromotion';
import { usePromotionEvents } from '#/features/promotion/hooks/usePromotionEvents';

export default function PromotionRoute() {
  const { handleSaveImage } = usePromotionEvents();

  const { promotionLink, promotionQRCode, isPending } = useFetchPromotion();

  return (
    <>
      <PageTitle
        title='我的推广'
        description='分享优质中医服务，赚取丰厚佣金'
      />
      <PromotionStats />
      {isPending ? null : (
        <>
          <PromotionMethod
            onSaveImage={() => handleSaveImage(promotionQRCode || '')}
            photoUrl={promotionQRCode || ''}
          />
          <div className='flex flex-col gap-4 px-4'>
            <PromotionLink link={promotionLink?.shortUrl || ''} />
            <PromotionTutorial />
            <PromotionStep />
          </div>
        </>
      )}
    </>
  );
}
