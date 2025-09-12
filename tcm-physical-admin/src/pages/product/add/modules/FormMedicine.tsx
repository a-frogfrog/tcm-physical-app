import { TabsContent } from '#/components/ui';
import { FileText } from 'lucide-react';

export const ProductFormMedicine = () => {
  return (
    <TabsContent value='medicine'>
      <div className='p-8 text-center'>
        <FileText size={48} className='mx-auto mb-4 text-gray-300' />
        <h3 className='mb-2 text-lg font-medium'>中药产品表单</h3>
        <p className='text-gray-500'>请在这里填写中药产品相关信息</p>
      </div>
    </TabsContent>
  );
};
