import { TabsContent } from '#/components/ui';
import { Tag } from 'lucide-react';

export const ProductFormPackage = () => {
  return (
    <TabsContent value='package'>
      <div className='p-8 text-center'>
        <Tag size={48} className='mx-auto mb-4 text-gray-300' />
        <h3 className='mb-2 text-lg font-medium'>套餐组合表单</h3>
        <p className='text-gray-500'>请在这里填写套餐组合相关信息</p>
      </div>
    </TabsContent>
  );
};
