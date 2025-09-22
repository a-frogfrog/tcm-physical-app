import { Card, CardContent, Button, Input } from '#/components/ui';
import { Link2 } from 'lucide-react';
import { useState } from 'react';

const shareOptions = [
  { name: '微信', icon: <Link2 className='h-5 w-5 text-green-500' /> },
  { name: '微博', icon: <Link2 className='h-5 w-5 text-red-500' /> },
  { name: 'QQ', icon: <Link2 className='h-5 w-5 text-blue-500' /> },
  { name: '更多', icon: <Link2 className='h-5 w-5 text-gray-500' /> },
];

const PromotionLink = () => {
  const [link] = useState('https://bencaotang.com/share/');
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
            className='rounded-l-none bg-green-700 hover:bg-green-800'>
            复制
          </Button>
        </div>

        {/* 分享方式 */}
        <p className='mb-3 font-bold text-green-900'>分享到</p>
        <div className='flex gap-4'>
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
