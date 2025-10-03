import { PageTitle } from '#/components/common';
import {
  PromotionLink,
  PromotionMethod,
  PromotionStats,
  PromotionStep,
  PromotionTutorial,
} from '#/features/promotion/components';
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
