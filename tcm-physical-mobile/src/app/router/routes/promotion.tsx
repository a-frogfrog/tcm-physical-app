import { PageTitle } from '#/components/common';
import {
  PromotionLink,
  PromotionMethod,
  PromotionStats,
  PromotionStep,
  PromotionTutorial,
} from '#/features/promotion/components';
import { usePromotionLink } from '#/features/promotion/hooks/usePromotion';
import {
  useFetchPromotionData,
  usePromotionEvents,
} from '#/features/promotion/hooks/usePromotionEvents';

export default function PromotionRoute() {
  const { handleSaveImage } = usePromotionEvents();
  const { imageUrl } = useFetchPromotionData();

  const { data: promotionLink } = usePromotionLink();

  return (
    <>
      <PageTitle
        title='我的推广'
        description='分享优质中医服务，赚取丰厚佣金'
      />
      <PromotionStats />
      <PromotionMethod
        onSaveImage={() => handleSaveImage(imageUrl)}
        photoUrl={imageUrl}
      />
      <div className='flex flex-col gap-4 px-4'>
        <PromotionLink link={promotionLink?.shortUrl || ''} />
        <PromotionTutorial />
        <PromotionStep />
      </div>
    </>
  );
}
