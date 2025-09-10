import { cn } from '#/lib/utils';
import { ChevronDown, Sunrise } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  trend: {
    percentage: number; // 变化百分比
    isIncrease: boolean; // 是否增长
    compareText: string; // 比较文本，如“较上月”
  };
  icon: React.ComponentType;
  iconColor?: string;
  className?: string;
}

const StatCard = ({
  title,
  value,
  trend,
  icon: Icon,
  iconColor = 'bg-amber-100',
  className,
}: StatCardProps) => {
  return (
    <article
      className={`bg-white rounded-md shadow p-4 flex justify-end ${className}`}>
      <div className='flex-1'>
        <h2 className='text-gray-500'>{title}</h2>
        <strong className='text-4xl'>{value}</strong>
        <p className='flex items-center gap-2'>
          {trend.isIncrease ? <Sunrise size={14} /> : <ChevronDown size={14} />}
          {trend.percentage}% {trend.compareText}
        </p>
      </div>
      <div
        className={cn(
          'flex items-center h-fit p-2 rounded-full w-fit',
          iconColor,
        )}>
        {Icon && <Icon />}
      </div>
    </article>
  );
};

export { StatCard };
