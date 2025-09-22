import { Card, CardContent } from '#/components/ui';

type Step = {
  number: number;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: 1,
    title: '选择要推广的商品',
    description: '从推广商品列表中选择您想推广的中医服务套餐',
  },
  {
    number: 2,
    title: '获取推广链接或二维码',
    description: '点击“分享推广”按钮，获取您的专属推广链接或二维码',
  },
  {
    number: 3,
    title: '分享给潜在客户',
    description: '将推广链接或二维码分享给亲友或社交平台上的潜在客户',
  },
  {
    number: 4,
    title: '赚取佣金',
    description: '当客户通过您的链接或二维码成功购买服务后，您将获得相应佣金',
  },
];

export default function PromotionTutorial() {
  return (
    <div className='p-6'>
      <h2 className='mb-6 text-center text-xl font-bold text-green-800'>
        推广教程
      </h2>

      <Card className='mx-auto max-w-lg rounded-2xl shadow-sm'>
        <CardContent className='space-y-6 p-6'>
          {steps.map((step) => (
            <div key={step.number} className='flex items-start gap-4'>
              {/* 圆形步骤编号 */}
              <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-700'>
                {step.number}
              </div>
              {/* 内容 */}
              <div>
                <p className='font-bold text-green-900'>{step.title}</p>
                <p className='mt-1 text-sm text-gray-600'>{step.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
