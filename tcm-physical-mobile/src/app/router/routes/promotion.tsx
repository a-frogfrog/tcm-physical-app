import { PageTitle } from '#/components/common';
import PromotionLink from '#/features/promotion/components/PromotionLink';
import PromotionMethod from '#/features/promotion/components/PromotionMethod';
import PromotionStats from '#/features/promotion/components/PromotionStats';
import PromotionStep from '#/features/promotion/components/PromotionStep';
import PromotionTutorial from '#/features/promotion/components/PromotionTutorial';
import {
  useFetchPromotionData,
  usePromotionEvents,
} from '#/features/promotion/hooks';

export default function PromotionRoute() {
  const { handleSaveImage } = usePromotionEvents();
  const { imageUrl } = useFetchPromotionData();

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
        <PromotionLink link={location.origin + '/auth/register'} />
        <PromotionTutorial />
        <PromotionStep />
      </div>
    </>
  );
}
