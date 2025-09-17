import { TabsContent, Button, Alert } from '#/components/ui';
import {
  FileText,
  Info,
  Tag,
  AlertCircle,
  CheckCircle2,
  Send,
  Plus,
} from 'lucide-react';
import {
  ProductFormBasic,
  ProductFormDetails,
  ProductFormPricing,
  ProductFormSettings,
} from './TherapyItems';
import { useFormTherapy } from './useFormTherapy';
import { useFormTherapyStore } from './therapyStore';
import { memo } from 'react';

export const ProductFormTherapy = memo(() => {
  const { activeTab, isSuccess } = useFormTherapyStore();

  return (
    <TabsContent value='therapy' className='space-y-6'>
      {/* 步骤指示器 */}
      <ProductFormStepIndicator />
      {/* 提交成功提示 */}
      <SubmitSuccessUI isSuccess={isSuccess} />
      {/* 基础信息 */}
      {activeTab === 'basic' && <ProductFormBasic />}
      {/* 价格设置 */}
      {activeTab === 'pricing' && <ProductFormPricing />}
      {/* 产品详情 */}
      {activeTab === 'details' && <ProductFormDetails />}
      {/* 其他设置 */}
      {activeTab === 'settings' && <ProductFormSettings />}
      {/* 导航按钮 */}
      <NavigationButtons />
    </TabsContent>
  );
});

const SubmitSuccessUI = ({ isSuccess }: { isSuccess: boolean }) => {
  if (!isSuccess) {
    return null;
  }
  return (
    <Alert className='mb-6 border-green-200 bg-green-50 text-green-800'>
      <CheckCircle2 size={18} className='mr-2' />
      产品信息提交成功！
    </Alert>
  );
};

const NavigationButtons = () => {
  const { activeTab, isSubmitting, goToNextTab, goToPrevTab, handleSubmit } =
    useFormTherapy();

  return (
    <div className='mt-10 flex justify-between'>
      <Button
        variant='outline'
        onClick={goToPrevTab}
        disabled={activeTab === 'basic'}>
        上一步
      </Button>

      {activeTab === 'settings' ? (
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className='bg-primary hover:bg-primary/90 text-white'>
          {isSubmitting ? (
            <>
              <svg
                className='-ml-1 mr-2 h-4 w-4 animate-spin text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'>
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
              </svg>
              提交中...
            </>
          ) : (
            <>
              <Send size={16} className='mr-2' />
              确认提交
            </>
          )}
        </Button>
      ) : (
        <Button
          onClick={goToNextTab}
          className='bg-primary hover:bg-primary/90 text-white'>
          下一步
          <Plus size={16} className='ml-2' />
        </Button>
      )}
    </div>
  );
};

const ProductFormStepIndicator = () => {
  const { activeTab } = useFormTherapyStore();
  const tabs = [
    { id: 'basic', label: '基础信息', icon: <Info size={18} /> },
    { id: 'pricing', label: '价格设置', icon: <Tag size={18} /> },
    {
      id: 'details',
      label: '产品详情',
      icon: <FileText size={18} />,
    },
    {
      id: 'settings',
      label: '其他设置',
      icon: <AlertCircle size={18} />,
    },
  ];
  return (
    <div className='relative mb-8 flex items-center justify-between'>
      <div className='absolute left-0 right-0 top-1/2 z-0 h-1 -translate-y-1/2 bg-gray-200'></div>
      <div
        className='bg-primary absolute left-0 top-1/2 z-10 h-1 -translate-y-1/2'
        style={{
          width: `${(['basic', 'pricing', 'details', 'settings'].indexOf(activeTab) + 1) * 25}%`,
        }}></div>
      {tabs.map((step, index) => (
        <div key={step.id} className='relative z-20 flex flex-col items-center'>
          <div
            className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
              activeTab === step.id ||
              ['basic', 'pricing', 'details', 'settings'].indexOf(activeTab) >
                index
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-600'
            } `}>
            {step.icon}
          </div>
          <span className='text-sm font-medium'>{step.label}</span>
        </div>
      ))}
    </div>
  );
};
