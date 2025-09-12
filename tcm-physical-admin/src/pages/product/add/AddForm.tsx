import { Tabs, TabsList, TabsTrigger, Button, Card } from '#/components/ui';
import { FileText, Package, Tag, Save, Eye } from 'lucide-react';
import { ProductFormMedicine } from './modules/FormMedicine';
import { ProductFormPackage } from './modules/FormPackage';
import { ProductFormTherapy } from './modules/therapy/Therapy';
import { memo } from 'react';

const ProductFormHeader = () => {
  return (
    <div className='mb-8 flex items-center justify-between'>
      <h1 className='text-2xl font-bold text-gray-900'>添加中医理疗产品</h1>
      <div className='flex space-x-2'>
        <Button variant='ghost' size='sm' className='text-gray-600'>
          <Eye size={16} className='mr-1' /> 预览
        </Button>
        <Button variant='ghost' size='sm' className='text-gray-600'>
          <Save size={16} className='mr-1' /> 保存草稿
        </Button>
      </div>
    </div>
  );
};

const ProductFormUI = () => {
  return (
    <Card className='mx-auto h-full w-full max-w-7xl p-6'>
      <ProductFormHeader />
      {/* 产品类型选择 */}
      <div className='mb-8'>
        <Tabs defaultValue='therapy' className='w-full'>
          <TabsList className='mb-6 bg-gray-100 p-1'>
            <TabsTrigger
              value='therapy'
              className='flex-1 data-[state=active]:bg-white'>
              <Package size={16} className='mr-2' /> 理疗服务
            </TabsTrigger>
            <TabsTrigger
              value='medicine'
              className='flex-1 data-[state=active]:bg-white'>
              <FileText size={16} className='mr-2' /> 中药产品
            </TabsTrigger>
            <TabsTrigger
              value='package'
              className='flex-1 data-[state=active]:bg-white'>
              <Tag size={16} className='mr-2' /> 套餐组合
            </TabsTrigger>
          </TabsList>
          <ProductFormTherapy />
          <ProductFormMedicine />
          <ProductFormPackage />
        </Tabs>
      </div>
    </Card>
  );
};

export default memo(ProductFormUI);
