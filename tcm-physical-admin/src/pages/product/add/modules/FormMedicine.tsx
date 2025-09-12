import { TabsContent } from '#/components/ui';
import { FileText } from 'lucide-react';

export const ProductFormMedicine = () => {
  return (
    <TabsContent value='medicine'>
      <div className='p-8 text-center'>
        <FileText size={48} className='mx-auto text-gray-300 mb-4' />
        <h3 className='text-lg font-medium mb-2'>中药产品表单</h3>
        <p className='text-gray-500'>请在这里填写中药产品相关信息</p>
      </div>
    </TabsContent>
  );
};
