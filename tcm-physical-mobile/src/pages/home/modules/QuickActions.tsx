import { Card, CardContent } from '#/components/ui';
import { Share2, Wallet, Calendar, User } from 'lucide-react';

type QuickAction = {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

const actions: QuickAction[] = [
  { title: '我的推广', icon: <Share2 className='h-6 w-6 text-green-700' /> },
  { title: '佣金中心', icon: <Wallet className='h-6 w-6 text-green-700' /> },
  { title: '预约服务', icon: <Calendar className='h-6 w-6 text-green-700' /> },
  { title: '个人中心', icon: <User className='h-6 w-6 text-green-700' /> },
];

const QuickActions = () => {
  return (
    <div className='rounded-lg bg-green-50 p-6'>
      <h2 className='mb-6 text-center text-xl font-bold text-green-800'>
        快速功能入口
      </h2>
      <div className='grid grid-cols-2 gap-4'>
        {actions.map((action, idx) => (
          <Card
            key={idx}
            className='cursor-pointer rounded-2xl transition hover:shadow-md'
            onClick={action.onClick}>
            <CardContent className='flex flex-col items-center justify-center py-6'>
              <div className='mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
                {action.icon}
              </div>
              <span className='text-sm text-green-900'>{action.title}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
