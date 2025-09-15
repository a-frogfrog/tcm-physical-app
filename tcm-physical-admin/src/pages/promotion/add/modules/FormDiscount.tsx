import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
  Checkbox,
} from '#/components/ui';
import { PercentIcon } from 'lucide-react';
import type { PromotionFormModuleProps } from '../constants';

const FormDiscount = ({ form }: PromotionFormModuleProps) => {
  return (
    <div className='animate-in fade-in-50 space-y-6 duration-300'>
      <h2 className='flex items-center text-xl font-semibold text-gray-700'>
        <PercentIcon size={18} className='mr-2' />
        优惠设置
      </h2>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <FormField
          control={form.control}
          name='discountType'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base'>
                优惠方式 <span className='text-red-500'>*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='h-11 border-gray-300'>
                    <SelectValue placeholder='请选择优惠方式' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='percentage'>百分比折扣</SelectItem>
                  <SelectItem value='fixed'>固定金额减免</SelectItem>
                  <SelectItem value='buy_one_get_one'>买一送一</SelectItem>
                  <SelectItem value='package'>套餐优惠</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='discountValue'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base'>
                优惠力度 <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='例如：80表示8折或80元'
                  {...field}
                  className='focus:border-primary h-11 border-gray-300 transition-colors'
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                输入折扣百分比，例如80表示8折优惠
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='maxParticipations'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base'>每人参与次数</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='h-11 border-gray-300'>
                    <SelectValue placeholder='请选择参与次数限制' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='1'>1次</SelectItem>
                  <SelectItem value='2'>2次</SelectItem>
                  <SelectItem value='3'>3次</SelectItem>
                  <SelectItem value='unlimited'>不限次数</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='maxParticipants'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base'>总参与人数限制</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='h-11 border-gray-300'>
                    <SelectValue placeholder='请选择人数限制' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='10'>10人</SelectItem>
                  <SelectItem value='50'>50人</SelectItem>
                  <SelectItem value='100'>100人</SelectItem>
                  <SelectItem value='unlimited'>不限人数</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>

      <div>
        <FormLabel className='mb-3 block text-base'>推广渠道设置</FormLabel>
        <FormField
          control={form.control}
          name='promotionChannels'
          render={() => (
            <FormItem>
              <Checkbox className='flex flex-wrap gap-3'>
                <div className='flex w-[calc(33.333%-8px)] items-center space-x-2 rounded-md border bg-white p-3 transition-colors hover:bg-gray-50'>
                  <Checkbox value='wechat' id='wechat' />
                  <Label
                    htmlFor='wechat'
                    className='flex cursor-pointer items-center'>
                    <span className='mr-2'>微信公众号</span>
                  </Label>
                </div>
                <div className='flex w-[calc(33.333%-8px)] items-center space-x-2 rounded-md border bg-white p-3 transition-colors hover:bg-gray-50'>
                  <Checkbox value='app' id='app' />
                  <Label htmlFor='app' className='cursor-pointer'>
                    手机APP
                  </Label>
                </div>
                <div className='flex w-[calc(33.333%-8px)] items-center space-x-2 rounded-md border bg-white p-3 transition-colors hover:bg-gray-50'>
                  <Checkbox value='website' id='website' />
                  <Label htmlFor='website' className='cursor-pointer'>
                    官方网站
                  </Label>
                </div>
                <div className='flex w-[calc(33.333%-8px)] items-center space-x-2 rounded-md border bg-white p-3 transition-colors hover:bg-gray-50'>
                  <Checkbox value='poster' id='poster' />
                  <Label htmlFor='poster' className='cursor-pointer'>
                    店内海报
                  </Label>
                </div>
                <div className='flex w-[calc(33.333%-8px)] items-center space-x-2 rounded-md border bg-white p-3 transition-colors hover:bg-gray-50'>
                  <Checkbox value='member' id='member' />
                  <Label htmlFor='member' className='cursor-pointer'>
                    会员推送
                  </Label>
                </div>
                <div className='flex w-[calc(33.333%-8px)] items-center space-x-2 rounded-md border bg-white p-3 transition-colors hover:bg-gray-50'>
                  <Checkbox value='other' id='other' />
                  <Label htmlFor='other' className='cursor-pointer'>
                    其他渠道
                  </Label>
                </div>
              </Checkbox>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name='internalNotes'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-base'>推广备注（内部使用）</FormLabel>
            <FormControl>
              <Textarea
                placeholder='填写内部备注信息，如推广策略、预算等...'
                {...field}
                className='focus:border-primary min-h-[100px] border-gray-300 transition-colors'
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormDescription>此信息仅内部可见，不对外部展示</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormDiscount;
