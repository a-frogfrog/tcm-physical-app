import { PageTitle } from '#/components/common';
import PromotionLink from './components/PromotionLink';
import PromotionMethod from './components/PromotionMethod';
import PromotionStats from './components/PromotionStats';
import PromotionStep from './components/PromotionStep';
import PromotionTutorial from './components/PromotionTutorial';
import { useFetchPromotionData, usePromotionEvents } from './hooks';

/**
 *
 * @returns 推广页面
 */
export default function PromotionPage() {
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
