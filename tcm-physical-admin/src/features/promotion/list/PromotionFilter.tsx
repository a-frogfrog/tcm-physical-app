import { CalendarIcon, RefreshCwIcon } from 'lucide-react';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Calendar,
} from '#/components/ui';

export default function PromotionFilter({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-xl font-semibold text-gray-800'>筛选条件</h2>
        <button className='hover:text-primary flex items-center text-sm font-medium text-gray-500 transition-colors'>
          <RefreshCwIcon className='mr-1 h-4 w-4' />
          重置筛选
        </button>
      </div>

      <div className='mb-6 grid grid-cols-4 gap-6'>
        {/* 推广类型 */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-700'>推广类型</label>
          <Select>
            <SelectTrigger className='w-full rounded-md border-gray-300'>
              <SelectValue placeholder='全部类型' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>全部类型</SelectItem>
              <SelectItem value='type1'>类型一</SelectItem>
              <SelectItem value='type2'>类型二</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 推广状态 */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-700'>推广状态</label>
          <Select>
            <SelectTrigger className='w-full rounded-md border-gray-300'>
              <SelectValue placeholder='全部状态' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>全部状态</SelectItem>
              <SelectItem value='active'>活跃</SelectItem>
              <SelectItem value='inactive'>非活跃</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 开始日期 */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-700'>开始日期</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='ghost'
                className='h-10 w-full justify-start rounded-md border border-gray-300 bg-white px-3 text-left font-normal'>
                <CalendarIcon className='mr-2 h-4 w-4 text-gray-500' />
                <span>年 / 月 / 日</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={undefined}
                onSelect={undefined}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* 结束日期 */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-700'>结束日期</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='ghost'
                className='h-10 w-full justify-start rounded-md border border-gray-300 bg-white px-3 text-left font-normal'>
                <CalendarIcon className='mr-2 h-4 w-4 text-gray-500' />
                <span>年 / 月 / 日</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={undefined}
                onSelect={undefined}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className='flex justify-end gap-4'>
        <Button variant='default' className='px-6 py-2'>
          搜索
        </Button>
        <Button variant='outline' className='px-6 py-2'>
          取消
        </Button>
      </div>
    </div>
  );
}
