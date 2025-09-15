import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
  Label,
  Checkbox,
} from '#/components/ui';
import { FileTextIcon } from 'lucide-react';
import type { PromotionFormModuleProps } from '../constants';

const FormContent = ({ form }: PromotionFormModuleProps) => {
  return (
    <div className='animate-in fade-in-50 space-y-6 duration-300'>
      <h2 className='flex items-center text-xl font-semibold text-gray-700'>
        <FileTextIcon size={18} className='mr-2' />
        推广内容设置
      </h2>

      <FormField
        control={form.control}
        name='description'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-base'>
              推广活动描述 <span className='text-red-500'>*</span>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder='详细描述推广活动内容，包括活动规则、参与方式、优惠详情等...'
                {...field}
                className='focus:border-primary min-h-[120px] border-gray-300 transition-colors'
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormDescription>
              清晰描述活动内容，帮助客户了解活动详情，减少咨询成本
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='participationConditions'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-base'>参与条件</FormLabel>
            <FormControl>
              <Textarea
                placeholder='例如：新客户首次体验、会员专享、需提前预约等...'
                {...field}
                className='focus:border-primary min-h-[80px] border-gray-300 transition-colors'
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormDescription>
              如有特殊参与条件，请在此说明，无特殊条件可留空
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='applicableItems'
        render={() => (
          <FormItem>
            <FormLabel className='text-base'>
              适用理疗项目 <span className='text-red-500'>*</span>
            </FormLabel>
            <div className='mt-2 flex flex-wrap gap-3'>
              <div className='flex w-[calc(33.333%-8px)] items-center space-x-2 rounded-md border bg-white p-3 transition-colors hover:bg-gray-50'>
                <Checkbox value='acupuncture' id='acupuncture' />
                <Label htmlFor='acupuncture' className='cursor-pointer'>
                  针灸理疗
                </Label>
              </div>
              <div className='flex w-[calc(33.333%-8px)] items-center space-x-2 rounded-md border bg-white p-3 transition-colors hover:bg-gray-50'>
                <Checkbox value='tuina' id='tuina' />
                <Label htmlFor='tuina' className='cursor-pointer'>
                  中医推拿
                </Label>
              </div>
              <div className='flex w-[calc(33.333%-8px)] items-center space-x-2 rounded-md border bg-white p-3 transition-colors hover:bg-gray-50'>
                <Checkbox value='cupping' id='cupping' />
                <Label htmlFor='cupping' className='cursor-pointer'>
                  拔罐疗法
                </Label>
              </div>
              <div className='flex w-[calc(33.333%-8px)] items-center space-x-2 rounded-md border bg-white p-3 transition-colors hover:bg-gray-50'>
                <Checkbox value='moxibustion' id='moxibustion' />
                <Label htmlFor='moxibustion' className='cursor-pointer'>
                  艾灸疗法
                </Label>
              </div>
              <div className='flex w-[calc(33.333%-8px)] items-center space-x-2 rounded-md border bg-white p-3 transition-colors hover:bg-gray-50'>
                <Checkbox value='herb_steam' id='herb_steam' />
                <Label htmlFor='herb_steam' className='cursor-pointer'>
                  中药熏蒸
                </Label>
              </div>
              <div className='flex w-[calc(33.333%-8px)] items-center space-x-2 rounded-md border bg-white p-3 transition-colors hover:bg-gray-50'>
                <Checkbox value='all' id='all' />
                <Label htmlFor='all' className='cursor-pointer'>
                  全部项目
                </Label>
              </div>
            </div>
            <FormDescription className='mt-2'>
              至少选择一项适用的理疗项目
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormContent;
