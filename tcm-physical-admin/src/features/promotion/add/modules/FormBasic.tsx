import {
  Button,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '#/components/ui';
import { CalendarIcon, InfoIcon } from 'lucide-react';
import type { PromotionFormModuleProps } from '../constants';

const FormBasic = ({ form }: PromotionFormModuleProps) => {
  return (
    <div className='animate-in fade-in-50 space-y-6 duration-300'>
      <h2 className='flex items-center text-xl font-semibold text-gray-700'>
        <InfoIcon size={18} className='mr-2' />
        基础信息
      </h2>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <FormField
          control={form.control}
          name='promotionName'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base'>
                推广活动名称 <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='例如：夏季三伏贴特惠活动'
                  {...field}
                  className='focus:border-primary h-11 border-gray-300 transition-colors'
                />
              </FormControl>
              <FormDescription>
                填写清晰易懂的活动名称，便于客户识别和系统管理
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='promotionType'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base'>
                推广类型 <span className='text-red-500'>*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='h-11 border-gray-300'>
                    <SelectValue placeholder='请选择推广类型' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='discount'>折扣活动</SelectItem>
                  <SelectItem value='gift'>赠品活动</SelectItem>
                  <SelectItem value='membership'>会员专享</SelectItem>
                  <SelectItem value='limited'>限时抢购</SelectItem>
                  <SelectItem value='new'>新品推广</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                选择适合的推广类型，将影响后续表单选项
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='startDate'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel className='text-base'>
                活动开始日期 <span className='text-red-500'>*</span>
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      className='h-11 w-full border-gray-300 pl-3 text-left font-normal'>
                      {field.value
                        ? field.value.toLocaleDateString()
                        : '选择日期'}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    className='rounded-md border'
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>设置活动开始的日期，最早为今日</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='endDate'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel className='text-base'>
                活动结束日期 <span className='text-red-500'>*</span>
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      className='h-11 w-full border-gray-300 pl-3 text-left font-normal'>
                      {field.value
                        ? field.value.toLocaleDateString()
                        : '选择日期'}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    className='rounded-md border'
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                设置活动结束的日期，必须晚于开始日期
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <FormField
          control={form.control}
          name='promotionImage'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='promotionImage' className='text-base'>
                推广活动图片
              </FormLabel>
              <FormControl>
                <Input id='promotionImage' type='file' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base'>
                活动状态 <span className='text-red-500'>*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='h-11 border-gray-300'>
                    <SelectValue placeholder='请选择活动状态' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='not_started'>
                    未开始（保存后不立即生效）
                  </SelectItem>
                  <SelectItem value='active'>
                    已开始（保存后立即生效）
                  </SelectItem>
                  <SelectItem value='completed'>已结束</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                设置活动的初始状态，可在活动列表中修改
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default FormBasic;
