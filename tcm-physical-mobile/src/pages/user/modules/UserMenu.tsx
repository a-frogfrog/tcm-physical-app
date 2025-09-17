import { Card } from '#/components/ui';
import { Share2, Wallet, ClipboardList, Users } from 'lucide-react';

const menus = [
  { icon: <Share2 className='h-6 w-6' />, label: '我的推广' },
  { icon: <Wallet className='h-6 w-6' />, label: '佣金中心' },
  { icon: <ClipboardList className='h-6 w-6' />, label: '我的订单' },
  { icon: <Users className='h-6 w-6' />, label: '我的团队' },
];

export default function UserMenu() {
  return (
    <Card className='my-4 p-4'>
      <div className='grid grid-cols-2 gap-4'>
        {menus.map((menu, idx) => (
          <div
            key={idx}
            className='flex cursor-pointer flex-col items-center justify-center space-y-2 rounded-lg p-4 transition hover:bg-gray-50'>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-green-700'>
              {menu.icon}
            </div>
            <span className='text-sm font-medium text-gray-700'>
              {menu.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
