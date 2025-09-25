import { Card, CardContent } from '#/components/ui';
import { ArrowRight } from 'lucide-react';

type CommissionCardProps = {
  title: string;
  amount: string;
  description: string;
  variant?: 'primary' | 'success' | 'default';
  action?: string;
};

const CommissionCard = ({
  title,
  amount,
  description,
  variant = 'default',
  action,
}: CommissionCardProps) => {
  const bgColors = {
    primary: 'bg-green-700 text-white',
    success: 'bg-green-50 text-green-800',
    default: 'bg-gray-50 text-green-900',
  };

  return (
    <Card className='overflow-hidden rounded-2xl shadow-sm'>
      <CardContent className={`space-y-2 p-6 text-center ${bgColors[variant]}`}>
        <p className='text-sm'>{title}</p>
        <p className='text-2xl font-bold'>{amount}</p>
        <p className='text-xs'>{description}</p>
        {action && (
          <button className='mt-2 inline-flex items-center text-sm font-medium text-green-800 hover:underline'>
            {action} <ArrowRight className='ml-1 h-4 w-4' />
          </button>
        )}
      </CardContent>
    </Card>
  );
};

export { CommissionCard };
