import z from 'zod';
import { useForm } from 'react-hook-form';

export type PromotionFormModuleProps = {
  form: PromotionFormType;
};
export type PromotionFormData = z.infer<typeof formSchema>;
export type PromotionFormType = ReturnType<typeof useForm<PromotionFormData>>;

// 表单验证 schema
export const formSchema = z.object({
  // 基础信息
  promotionName: z
    .string()
    .min(2, '活动名称至少2个字符')
    .max(50, '活动名称不能超过50个字符'),
  promotionType: z.string().min(1, '请选择推广类型'),
  startDate: z.date(),
  endDate: z.date(),
  promotionImage: z.any().optional(),
  status: z.enum(['not_started', 'active', 'completed']),

  // 推广内容设置
  description: z
    .string()
    .min(10, '活动描述至少10个字符')
    .max(500, '活动描述不能超过500个字符'),
  participationConditions: z.string().optional(),
  applicableItems: z.array(z.string()).min(1, '至少选择一项适用项目'),

  // 优惠设置
  discountType: z.string().min(1, '请选择优惠方式'),
  discountValue: z
    .number()
    .min(1, '优惠力度必须大于0')
    .max(100, '优惠力度不能超过100'),
  maxParticipations: z.enum(['1', '2', '3', 'unlimited']),
  maxParticipants: z.enum(['10', '50', '100', 'unlimited']),
  promotionChannels: z.array(z.string()),
  internalNotes: z.string().optional(),
});
