import { Card, CardContent, Button, Input } from '#/components/ui';
import { shareOptions } from '../constants';

type PromotionLinkProps = {
  link: string;
};

const PromotionLink = ({ link }: PromotionLinkProps) => {
  const handleCopy = async () => {
    location.href = 'weixin://';
    await navigator.clipboard.writeText(link);
  };

  return (
    <Card className='mx-auto max-w-md rounded-2xl shadow-sm'>
      <CardContent className='p-6'>
        {/* 标题 */}
        <p className='mb-3 font-bold text-green-900'>我的推广链接</p>

        {/* 输入框 + 复制按钮 */}
        <div className='mb-6 flex'>
          <Input value={link} readOnly className='rounded-r-none' />
          <Button
            onClick={handleCopy}
            className='min-h-12 rounded-l-none bg-green-700 hover:bg-green-800'>
            复制
          </Button>
        </div>

        {/* 分享方式 */}
        <p className='mb-3 font-bold text-green-900'>分享到</p>
        <div className='flex justify-center gap-4'>
          {shareOptions.map((item, idx) => (
            <div
              key={idx}
              className='flex cursor-pointer flex-col items-center justify-center'>
              <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 shadow-sm hover:bg-gray-100'>
                {item.icon}
              </div>
              <span className='mt-1 text-xs text-gray-700'>{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PromotionLink;
