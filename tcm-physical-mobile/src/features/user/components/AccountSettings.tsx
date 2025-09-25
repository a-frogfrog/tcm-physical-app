import { Card } from '#/components/ui';
import {
  User,
  Bell,
  HelpCircle,
  Shield,
  LogOut,
  ChevronRight,
} from 'lucide-react';

const settings = [
  { icon: <User className='h-5 w-5' />, label: '个人资料' },
  { icon: <Bell className='h-5 w-5' />, label: '消息通知' },
  { icon: <HelpCircle className='h-5 w-5' />, label: '帮助中心' },
  { icon: <Shield className='h-5 w-5' />, label: '关于我们' },
];

export default function AccountSettings() {
  return (
    <Card className='p-4'>
      <h2 className='mb-4 text-lg font-semibold'>账户设置</h2>
      <div className='divide-y'>
        {settings.map((item, idx) => (
          <div
            key={idx}
            className='flex cursor-pointer items-center justify-between rounded-md px-2 py-3 transition hover:bg-gray-50'>
            <div className='flex items-center space-x-3 text-gray-700'>
              <span className='flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-green-700'>
                {item.icon}
              </span>
              <span className='text-sm'>{item.label}</span>
            </div>
            <ChevronRight className='h-4 w-4 text-gray-400' />
          </div>
        ))}
        {/* 退出登录 */}
        <div className='flex cursor-pointer items-center justify-between rounded-md px-2 py-3 transition hover:bg-red-50'>
          <div className='flex items-center space-x-3 text-red-600'>
            <span className='flex h-9 w-9 items-center justify-center rounded-full bg-red-100'>
              <LogOut className='h-5 w-5' />
            </span>
            <span className='text-sm font-medium'>退出登录</span>
          </div>
          <ChevronRight className='h-4 w-4 text-red-400' />
        </div>
      </div>
    </Card>
  );
}
