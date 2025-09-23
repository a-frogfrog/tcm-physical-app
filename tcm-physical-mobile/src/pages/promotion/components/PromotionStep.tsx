import {
  Card,
  CardContent,
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '#/components/ui';
import { MoreVertical } from 'lucide-react';

type PromotionStepType = {
  id: number;
  name: string;
  amount: number;
  date: string;
};

const donations: PromotionStepType[] = [
  { id: 1, name: 'Alex therapy', amount: 50, date: '7d' },
  { id: 2, name: 'John Smith', amount: 250, date: '7d' },
  { id: 3, name: 'sam lee', amount: 100, date: '7d' },
];

const PromotionStep = () => {
  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardContent className='p-4'>
        <h2 className='mb-4 font-medium text-gray-600'>All donations</h2>
        <div className='space-y-6'>
          {donations.map((donation) => (
            <div
              key={donation.id}
              className='flex items-center justify-between'>
              {/* 左边部分 */}
              <div className='flex items-center space-x-3'>
                <Avatar>
                  <AvatarImage src='/placeholder.png' alt={donation.name} />
                  <AvatarFallback>👤</AvatarFallback>
                </Avatar>
                <div>
                  <p className='text-sm font-semibold'>
                    {donation.name}{' '}
                    <span className='font-normal text-gray-500'>
                      donated{' '}
                      <span className='font-semibold text-green-600'>
                        ${donation.amount}
                      </span>
                    </span>
                  </p>
                  <span className='text-xs text-gray-400'>{donation.date}</span>
                </div>
              </div>

              {/* 右边菜单 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className='rounded-full p-2 hover:bg-gray-100'>
                    <MoreVertical className='h-4 w-4 text-gray-500' />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem>View</DropdownMenuItem>
                  <DropdownMenuItem>Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PromotionStep;
