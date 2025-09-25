import { Button, Card, CardContent, CardFooter } from '#/components/ui';
import { ArrowRight, CheckCircle, Leaf } from 'lucide-react';

type Highlight = {
  id?: string | number;
  text: string;
  icon?: React.ReactNode;
};

type HealthArticleCardProps = {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  highlights?: Highlight[];
  ctaText?: string;
  onCta?: () => void;
  className?: string;
};

export default function HealthArticleCard({
  title,
  subtitle,
  imageUrl = 'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?auto=format&fit=crop&w=1200&q=80',
  highlights = [],
  ctaText = '查看更多养生文章',
  onCta,
  className = '',
}: HealthArticleCardProps) {
  return (
    <Card
      className={`mx-auto max-w-xl overflow-hidden rounded-2xl pt-0 shadow-lg ${className}`}>
      {/* 图片：移动端高度较小，桌面端显示宽幅 */}
      <div className='h-44 w-full overflow-hidden bg-gray-100 sm:h-56 md:h-64'>
        <img
          src={imageUrl}
          alt={`${title} 封面`}
          className='h-full w-full object-cover contrast-95 grayscale-[10%]'
        />
      </div>

      <CardContent className='p-6'>
        <div className='flex items-start gap-4'>
          <div className='flex-shrink-0'>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100'>
              <Leaf className='h-6 w-6 text-emerald-600' />
            </div>
          </div>

          <div className='flex-1'>
            <h3 className='text-2xl font-semibold text-emerald-700'>{title}</h3>
            {subtitle && (
              <p className='mt-1 text-sm text-gray-500'>{subtitle}</p>
            )}
          </div>
        </div>

        <p className='mt-4 leading-relaxed text-gray-700'>
          探索专业的健康养生知识，包括饮食调理、运动健身、心理调节等实用内容，助您养成健康生活习惯，提升生活质量。
        </p>

        {/* 亮点列表 */}
        {highlights.length > 0 && (
          <ul className='mt-4 space-y-3'>
            {highlights.map((h, idx) => (
              <li key={h.id ?? idx} className='flex items-start gap-3'>
                <span className='mt-0.5'>
                  {/* 默认图标为绿色勾 */}
                  {h.icon ?? (
                    <CheckCircle className='h-5 w-5 text-emerald-600' />
                  )}
                </span>
                <span className='text-gray-800'>{h.text}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <CardFooter className='p-6 pt-0'>
        <div className='w-full'>
          <Button
            onClick={onCta}
            className='w-full justify-center bg-emerald-600 text-white hover:bg-emerald-700'>
            <span>{ctaText}</span>
            <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
