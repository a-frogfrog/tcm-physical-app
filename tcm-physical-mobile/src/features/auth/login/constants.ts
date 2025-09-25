import { z } from 'zod';

export const formSchema = z.object({
  email: z.email('请输入正确的邮箱格式'),
  password: z.string().min(6, '密码最少6个字符').max(32),
});

export type FormSchema = z.infer<typeof formSchema>;
