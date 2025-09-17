import {
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Textarea,
  Checkbox,
  Button,
  Label,
  Separator,
} from '#/components/ui';
import { Info } from 'lucide-react';
import { memo } from 'react';

const ProductFormBasic = () => {
  return (
    <>
      {/* <TabsContent value='basic' className='mt-0 space-y-6'> */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='productName' className='text-base font-medium'>
            产品名称 <span className='text-red-500'>*</span>
          </Label>
          <Input
            id='productName'
            placeholder='例如：经络推拿、艾灸调理'
            className='w-full'
          />
          <p className='text-sm text-gray-500'>
            填写准确的产品名称，体现中医特色
          </p>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='productCategory' className='text-base font-medium'>
            产品分类 <span className='text-red-500'>*</span>
          </Label>
          <Select>
            <SelectTrigger id='productCategory'>
              <SelectValue placeholder='请选择产品分类' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='massage'>推拿按摩</SelectItem>
              <SelectItem value='acupuncture'>针灸理疗</SelectItem>
              <SelectItem value='herbal'>中药调理</SelectItem>
              <SelectItem value='moxibustion'>艾灸养生</SelectItem>
              <SelectItem value='comprehensive'>综合调理</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='productCode' className='text-base font-medium'>
            产品编码
          </Label>
          <Input
            id='productCode'
            placeholder='例如：TCM-TN-001'
            className='w-full'
          />
          <div className='flex items-center text-sm text-gray-500'>
            <Info size={14} className='mr-1' />
            <span>系统可自动生成，也可手动输入，用于内部管理</span>
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='serviceDuration' className='text-base font-medium'>
            服务时长 (分钟)
          </Label>
          <div className='relative'>
            <Input
              id='serviceDuration'
              placeholder='例如：60'
              className='w-full pr-10'
              type='number'
            />
            <span className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'>
              分钟
            </span>
          </div>
          <p className='text-sm text-gray-500'>适用于理疗服务，填写服务时长</p>
        </div>
      </div>

      <div className='space-y-3'>
        <Label className='text-base font-medium'>产品图片</Label>
      </div>
    </>
    // </TabsContent>
  );
};

const ProductFormPricing = memo(() => {
  return (
    <>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='originalPrice' className='text-base font-medium'>
            原价 (元) <span className='text-red-500'>*</span>
          </Label>
          <div className='relative'>
            <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'>
              ¥
            </span>
            <Input
              id='originalPrice'
              placeholder='0.00'
              className='w-full pl-8'
              type='number'
              step='0.01'
              defaultValue='0.00'
            />
          </div>
          <p className='text-sm text-gray-500'>产品的标准定价</p>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='memberPrice' className='text-base font-medium'>
            会员价 (元)
          </Label>
          <div className='relative'>
            <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'>
              ¥
            </span>
            <Input
              id='memberPrice'
              placeholder='0.00'
              className='w-full pl-8'
              type='number'
              step='0.01'
              defaultValue='0.00'
            />
          </div>
          <p className='text-sm text-gray-500'>
            会员专享价格，不填写则默认为原价
          </p>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='stockQuantity' className='text-base font-medium'>
            库存数量
          </Label>
          <Input
            id='stockQuantity'
            placeholder='0'
            className='w-full'
            type='number'
            defaultValue='0'
          />
          <p className='text-sm text-gray-500'>
            适用于实物产品，服务类可填写0表示无限制
          </p>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='purchaseLimit' className='text-base font-medium'>
            每人限购数量
          </Label>
          <Select defaultValue='unlimited'>
            <SelectTrigger id='purchaseLimit'>
              <SelectValue placeholder='请选择' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='unlimited'>不限购</SelectItem>
              <SelectItem value='1'>1件</SelectItem>
              <SelectItem value='2'>2件</SelectItem>
              <SelectItem value='3'>3件</SelectItem>
              <SelectItem value='5'>5件</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
});

const ProductFormDetails = () => {
  return (
    <>
      <div className='space-y-2'>
        <Label htmlFor='productIntro' className='text-base font-medium'>
          产品简介 <span className='text-red-500'>*</span>
        </Label>
        <Textarea
          id='productIntro'
          placeholder='简要介绍产品特点和功效...'
          className='min-h-[100px] w-full'
        />
        <p className='text-sm text-gray-500'>简短描述，将显示在产品列表页</p>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='detailedDescription' className='text-base font-medium'>
          详细说明
        </Label>
        <div className='overflow-hidden rounded-md border'>
          {/* 富文本编辑器模拟 */}
          <div className='flex items-center space-x-2 border-b bg-gray-50 p-2'>
            <Button variant='ghost' size='sm'>
              B
            </Button>
            <Button variant='ghost' size='sm'>
              <i>I</i>
            </Button>
            <Button variant='ghost' size='sm'>
              <u>U</u>
            </Button>
            <Separator orientation='vertical' className='h-6' />
            <Button variant='ghost' size='sm'>
              段落
            </Button>
            <Button variant='ghost' size='sm'>
              列表
            </Button>
            <Button variant='ghost' size='sm'>
              图片
            </Button>
          </div>
          <Textarea
            id='detailedDescription'
            placeholder='详细介绍产品的功效、适应症、操作流程、注意事项等...'
            className='min-h-[200px] w-full border-0 p-3 focus-visible:ring-0'
          />
        </div>
        <p className='text-sm text-gray-500'>
          详细描述产品信息，帮助客户全面了解产品
        </p>
      </div>

      <div className='space-y-3'>
        <Label className='text-base font-medium'>适合人群</Label>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3'>
          {[
            '亚健康人群',
            '中老年人群',
            '办公室人群',
            '失眠人群',
            '疼痛人群',
            '其他人群',
          ].map((group) => (
            <div key={group} className='flex items-center space-x-2'>
              <Checkbox id={`group-${group}`} />
              <Label htmlFor={`group-${group}`} className='cursor-pointer'>
                {group}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const ProductFormSettings = () => {
  return (
    <>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='productStatus' className='text-base font-medium'>
            产品状态 <span className='text-red-500'>*</span>
          </Label>
          <Select defaultValue='active'>
            <SelectTrigger id='productStatus'>
              <SelectValue placeholder='请选择' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='active'>上架（可预约/购买）</SelectItem>
              <SelectItem value='inactive'>下架</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label
            htmlFor='technicianRequirement'
            className='text-base font-medium'>
            技师要求
          </Label>
          <Select defaultValue='none'>
            <SelectTrigger id='technicianRequirement'>
              <SelectValue placeholder='请选择' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='none'>无特殊要求</SelectItem>
              <SelectItem value='senior'>高级技师</SelectItem>
              <SelectItem value='specific'>特定技师</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='reservationTip' className='text-base font-medium'>
          预约提示
        </Label>
        <Textarea
          id='reservationTip'
          placeholder='例如：请提前24小时预约，预约后如需取消请提前12小时通知...'
          className='min-h-[100px] w-full'
        />
        <p className='text-sm text-gray-500'>
          显示在预约页面，提醒客户注意事项
        </p>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='internalRemark' className='text-base font-medium'>
          内部备注 (仅员工可见)
        </Label>
        <Textarea
          id='internalRemark'
          placeholder='填写内部管理备注信息...'
          className='min-h-[100px] w-full'
        />
      </div>
    </>
  );
};

export {
  ProductFormBasic,
  ProductFormPricing,
  ProductFormDetails,
  ProductFormSettings,
};
