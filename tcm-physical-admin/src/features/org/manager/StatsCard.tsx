import { Button, Card, CardContent } from '#/components/ui';
import type { StatsCardProps } from './constants';

const StatsCard = ({
  companyName,
  location,
  total,
  active,
  managers,
  newThisMonth,
}: StatsCardProps) => {
  return (
    <Card className='rounded-2xl shadow-sm'>
      <CardContent className='p-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-xl font-semibold'>{companyName}</h3>
            <div className='mt-1 text-sm text-slate-500'>
              {location} / {total}名员工
            </div>
          </div>

          <div className='flex items-center space-x-3'>
            <Button variant='outline'>编辑部门</Button>
            <Button>添加成员</Button>
          </div>
        </div>

        <div className='mt-6 grid grid-cols-4 gap-4'>
          <div className='rounded-lg bg-slate-50 p-4'>
            <div className='text-sm text-slate-500'>总人数</div>
            <div className='mt-1 text-2xl font-bold'>{total}</div>
          </div>
          <div className='rounded-lg bg-slate-50 p-4'>
            <div className='text-sm text-slate-500'>在职人员</div>
            <div className='mt-1 text-2xl font-bold text-green-500'>
              {active}
            </div>
          </div>
          <div className='rounded-lg bg-slate-50 p-4'>
            <div className='text-sm text-slate-500'>管理人员</div>
            <div className='mt-1 text-2xl font-bold'>{managers}</div>
          </div>
          <div className='rounded-lg bg-slate-50 p-4'>
            <div className='text-sm text-slate-500'>本月新增</div>
            <div className='mt-1 text-2xl font-bold text-blue-500'>
              {newThisMonth}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
