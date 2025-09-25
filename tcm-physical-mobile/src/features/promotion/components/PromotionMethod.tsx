import { Card, CardContent, Button } from '#/components/ui';

type PromotionMethodProps = {
  photoUrl: string;
  onSaveImage?: () => void;
};
const PromotionMethod = ({ photoUrl, onSaveImage }: PromotionMethodProps) => {
  return (
    <div className='p-6'>
      <h2 className='mb-6 text-center text-xl font-bold text-green-800'>
        推广方式
      </h2>

      <Card className='mx-auto max-w-sm rounded-2xl shadow-sm'>
        <CardContent className='flex flex-col items-center justify-center p-6'>
          {/* 示例二维码/图片 */}
          <img
            src={photoUrl || 'https://via.placeholder.com/150'}
            alt='推广二维码'
            className='mb-4 h-40 w-40 rounded-lg shadow'
          />

          {/* 标题 */}
          <p className='text-base font-bold text-green-900'>我的推广二维码</p>
          <p className='mb-4 text-sm text-gray-600'>保存图片分享给好友</p>

          {/* 保存按钮 */}
          <Button
            variant='outline'
            className='bg-green-100 text-green-800 hover:bg-green-200'
            onClick={onSaveImage}>
            保存图片
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromotionMethod;
