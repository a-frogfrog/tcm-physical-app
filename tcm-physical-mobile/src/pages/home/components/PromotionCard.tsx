import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '#/components/ui';
import { ArrowUp } from 'lucide-react';
// import { motion } from 'motion/react';

type PromotionCardProps = {
  totalUsers: number;
  usersGrowth: number; // 12 表示 +12%
  totalReward: number;
  rewardGrowth: number; // 8 表示 +8%
  withdrawable: number;
};

const PromotionCard = ({
  totalUsers,
  usersGrowth,
  totalReward,
  rewardGrowth,
  withdrawable,
}: PromotionCardProps) => {
  return (
    <Card className='mx-auto w-full max-w-md rounded-2xl bg-gradient-to-b from-blue-500 to-blue-400 text-white shadow-lg'>
      {/* 顶部标题 */}
      <CardHeader className='flex items-center justify-between'>
        <div>
          <CardTitle className='text-lg sm:text-xl'>我的推广数据</CardTitle>
          <p className='text-xs opacity-80 sm:text-sm'>数据实时更新</p>
        </div>
        <Button
          size='sm'
          variant='secondary'
          className='bg-white text-blue-600 hover:bg-gray-100'>
          查看详情
        </Button>
      </CardHeader>

      <CardContent className='space-y-4'>
        {/* 第一行：推广总人数 & 累计奖金 */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='flex flex-col items-center rounded-lg bg-white/20 p-4 text-center'>
            <p className='text-xs sm:text-sm'>推广总人数</p>
            <p className='text-xl font-bold sm:text-2xl'>
              {totalUsers.toLocaleString()}
            </p>
            <span className='mt-1 flex items-center text-xs text-green-200'>
              <ArrowUp className='mr-1 h-3 w-3' />
              {usersGrowth}%
            </span>
          </div>

          <div className='flex flex-col items-center rounded-lg bg-white/20 p-4 text-center'>
            <p className='text-xs sm:text-sm'>累计奖金(元)</p>
            <p className='text-xl font-bold sm:text-2xl'>
              {totalReward.toLocaleString()}
            </p>
            <span className='mt-1 flex items-center text-xs text-green-200'>
              <ArrowUp className='mr-1 h-3 w-3' />
              {rewardGrowth}%
            </span>
          </div>
        </div>

        {/* 第二行：可提现金额 */}
        <div className='flex flex-col items-center rounded-lg bg-white/20 p-4 text-center'>
          <p className='text-xs sm:text-sm'>可提现金额</p>
          <p className='text-xl font-bold sm:text-2xl'>
            {withdrawable.toLocaleString()}
          </p>
          <Button className='mt-3 w-full bg-white text-blue-600 hover:bg-gray-100'>
            立即提现
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromotionCard;
