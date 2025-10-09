import z from 'zod';

export const loginSchema = z.object({
  account: z.string().min(1, '请输入账号'),
  password: z.string().min(1, '请输入密码'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
