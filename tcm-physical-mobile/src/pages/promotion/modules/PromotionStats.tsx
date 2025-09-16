import { Card, CardContent } from '#/components/ui';

type Stat = {
  label: string;
  value: string | number;
};

const stats: Stat[] = [
  { label: '推广订单', value: 128 },
  { label: '推广收益', value: '¥4,580' },
  { label: '本月推广', value: 36 },
  { label: '团队人数', value: 156 },
];

const PromotionStats = () => {
  return (
    <div className='overflow-hidden rounded-lg bg-green-50'>
      {/* Stats */}
      <div className='grid grid-cols-2 gap-4 p-6'>
        {stats.map((stat, idx) => (
          <Card key={idx} className='rounded-xl'>
            <CardContent className='flex flex-col items-center justify-center py-6'>
              <span className='text-xl font-bold text-green-800'>
                {stat.value}
              </span>
              <span className='text-sm text-green-700'>{stat.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PromotionStats;
