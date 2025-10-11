import { Badge, Button } from '#/components/ui';
import { Eye, Pencil, Star, Trash, UserRound } from 'lucide-react';
import type { ProductCardProps } from '../types';

const getStatusClasses = (status: ProductCardProps['status']) => {
  switch (status) {
    case '正常运营':
      return 'bg-green-100 text-green-800 border-green-200';
    case '休息中':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case '已下架':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const ProductCard = ({
  title,
  price,
  duration,
  features,
  description,
  imageUrl,
  status,
  servicesCount,
  rating,
  lastUpdated,
}: ProductCardProps) => {
  return (
    <div className='bg-card text-card-foreground mx-auto w-full rounded-lg border shadow-sm'>
      {/* 图片部分 */}
      <div className='relative h-48 overflow-hidden rounded-t-lg'>
        <img
          src={imageUrl}
          alt={title}
          className='h-full w-full object-cover'
        />
        {/* 状态 Badge */}
        <div
          className={`absolute top-4 left-4 inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors ${getStatusClasses(status)}`}>
          {status}
        </div>
      </div>

      {/* 内容主体 */}
      <div className='p-6'>
        {/* 标题和价格 */}
        <div className='mb-3 flex items-start justify-between'>
          <h2 className='text-xl font-semibold tracking-tight'>{title}</h2>
          <span className='text-xl font-bold whitespace-nowrap text-amber-700'>
            ¥{price}
            <span className='text-muted-foreground text-sm font-normal'>
              /次
            </span>
          </span>
        </div>

        {/* 标签/特色 */}
        <div className='text-muted-foreground mb-4 flex gap-2 text-sm'>
          <Badge variant='secondary'>{duration}</Badge>
          {features.map((feature, index) => (
            <Badge key={index} variant='secondary'>
              {feature}
            </Badge>
          ))}
        </div>

        {/* 描述 */}
        <p className='text-muted-foreground mb-4 text-sm leading-relaxed'>
          {description}
        </p>

        {/* 统计数据 */}
        <div className='text-muted-foreground mb-6 flex items-center gap-4 text-sm'>
          <div className='flex items-center gap-1'>
            {/* 假设的小人图标 */}
            <UserRound />
            <span className='text-foreground font-medium'>
              {servicesCount}
            </span>{' '}
            人已服务
          </div>
          <div className='flex items-center gap-1'>
            {/* 假设的星星图标 */}
            <Star />
            <span className='text-foreground font-medium'>{rating}</span> 分
          </div>
          <div className='flex-1 text-right text-xs'>更新于 {lastUpdated}</div>
        </div>

        {/* 底部按钮组 */}
        <div className='flex justify-end gap-3 border-t pt-4'>
          <Button variant='outline'>
            <Eye />
            查看详情
          </Button>

          <Button variant='outline'>
            <Pencil />
            编辑
          </Button>
          <Button variant='destructive'>
            <Trash />
            下架
          </Button>
        </div>
      </div>
    </div>
  );
};

export { ProductCard };
