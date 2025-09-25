import { Card, CardContent, Button } from '#/components/ui';

type UserProfile = {
  avatar: string;
  name: string;
  level: string;
  promotionCount: number;
  teamSize: number;
};

const user: UserProfile = {
  avatar: 'https://picsum.photos/100', // 模拟头像
  name: '张健康',
  level: '黄金会员',
  promotionCount: 328,
  teamSize: 156,
};

export default function UserProfileCard() {
  return (
    <Card className='p-6 text-center'>
      <CardContent className='space-y-4'>
        <img
          src={user.avatar}
          alt={user.name}
          className='mx-auto h-20 w-20 rounded-full shadow-md'
        />
        <div className='text-xl font-bold'>{user.name}</div>
        <div className='text-gray-600'>推广等级: {user.level}</div>

        <div className='flex justify-center gap-4 whitespace-nowrap'>
          <span className='rounded-full bg-green-100 px-3 py-1 text-sm text-green-700'>
            累计推广: {user.promotionCount} 单
          </span>
          <span className='rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700'>
            团队人数: {user.teamSize} 人
          </span>
        </div>

        <Button variant='outline' className='mt-4'>
          编辑资料
        </Button>
      </CardContent>
    </Card>
  );
}
