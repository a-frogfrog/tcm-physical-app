import { Loader, PageTitle } from '#/components/common';
import {
  PromotionLink,
  PromotionMethod,
  PromotionStats,
  PromotionTutorial,
} from '#/features/promotion/components';

import { useGenerateLinkAndQRCode } from '#/features/promotion/hooks/useFetchPromotion';

import { usePromotionEvents } from '#/features/promotion/hooks/usePromotionEvents';

export default function PromotionRoute() {
  const { handleSaveImage, handleCopy } = usePromotionEvents();

  const { data: promotion, isPending } = useGenerateLinkAndQRCode();

  return (
    <>
      <PageTitle
        title='我的推广'
        description='分享优质中医服务，赚取丰厚佣金'
      />
      <PromotionStats />
      {isPending ? (
        <Loader className='scale-50' />
      ) : (
        <>
          <PromotionMethod
            onSaveImage={() => handleSaveImage(promotion?.qrCodeUrl || '')}
            photoUrl={promotion?.qrCodeUrl || ''}
          />
          <div className='flex flex-col gap-4 px-4'>
            <PromotionLink
              link={promotion?.shortUrl || ''}
              handleCopy={handleCopy}
            />
            <PromotionTutorial />
          </div>
        </>
      )}
    </>
  );
}
