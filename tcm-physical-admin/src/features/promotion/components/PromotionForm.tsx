import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Button, Card, Form } from '#/components/ui';
import StepIndicator from './StepIndicator';
import FormBasic from './FormBasic';
import FormContent from './FormContent';
import FormDiscount from './FormDiscount';
import FormActions from './FormActions';
import { formSchema, type PromotionFormData } from '../constants';

const PromotionForm = () => {
  // 状态管理
  const [activeTab, setActiveTab] = useState('basic');
  // 初始化表单
  const form = useForm<PromotionFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      promotionName: '',
      promotionType: '',
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 默认一周后结束
      status: 'not_started',
      promotionImage: '',
      description: '',
      participationConditions: '',
      applicableItems: [],
      discountType: '',
      discountValue: 0,
      maxParticipations: '1',
      maxParticipants: 'unlimited',
      promotionChannels: ['wechat', 'app'],
      internalNotes: '',
    },
  });

  // 处理表单提交
  const onSubmit = (values: PromotionFormData) => {
    console.log('表单提交:', values);
    // 这里可以添加API调用等提交逻辑
    alert('表单提交成功！');
  };

  // 检查当前步骤是否有效
  const isStepValid = (step: string) => {
    const fields = {
      basic: [
        'promotionName',
        'promotionType',
        'startDate',
        'endDate',
        'status',
      ],
      content: ['description', 'applicableItems'],
      discount: ['discountType', 'discountValue'],
    };

    const result = fields[step as keyof typeof fields].every((field) => {
      const fieldState = form.getFieldState(field as keyof PromotionFormData);
      return !fieldState.invalid;
    });

    return result;
  };

  // 导航到下一步
  const goToNextStep = () => {
    if (activeTab === 'basic' && isStepValid('basic')) {
      setActiveTab('content');
    } else if (activeTab === 'content' && isStepValid('content')) {
      setActiveTab('discount');
    }
  };

  // 导航到上一步
  const goToPrevStep = () => {
    if (activeTab === 'content') {
      setActiveTab('basic');
    } else if (activeTab === 'discount') {
      setActiveTab('content');
    }
  };

  return (
    <Card className='mx-auto my-8 max-w-5xl p-6 shadow-lg'>
      <h1 className='mb-6 text-2xl font-bold text-gray-800'>创建推广活动</h1>
      {/* 步骤指示器 */}
      <StepIndicator activeTab={activeTab} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          {/* 基础信息 */}
          {activeTab === 'basic' && <FormBasic form={form} />}

          {/* 推广内容设置 */}
          {activeTab === 'content' && <FormContent form={form} />}

          {/* 优惠设置 */}
          {activeTab === 'discount' && <FormDiscount form={form} />}

          {/* 导航和提交按钮 */}
          <NavigationButtons
            activeTab={activeTab}
            goToPrevStep={goToPrevStep}
            goToNextStep={goToNextStep}
            isStepValid={isStepValid}
          />
        </form>
      </Form>
    </Card>
  );
};

const NavigationButtons = ({
  activeTab,
  goToPrevStep,
  goToNextStep,
  isStepValid,
}: {
  activeTab: string;
  goToPrevStep: () => void;
  goToNextStep: () => void;
  isStepValid: (step: string) => boolean;
}) => {
  return (
    <div className='flex justify-between border-t pt-4'>
      {activeTab !== 'basic' ? (
        <Button
          type='button'
          variant='outline'
          onClick={goToPrevStep}
          className='transition-all'>
          上一步
        </Button>
      ) : (
        <></>
      )}

      {activeTab !== 'discount' ? (
        <Button
          type='button'
          onClick={goToNextStep}
          disabled={!isStepValid(activeTab)}
          className='transition-all disabled:opacity-50'>
          下一步
        </Button>
      ) : (
        <FormActions />
      )}
    </div>
  );
};

export default PromotionForm;
