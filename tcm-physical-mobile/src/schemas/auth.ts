import { z } from 'zod';

/**
 * 登录验证项
 */
const loginSchema = z.object({
  email: z.email('请输入正确的邮箱格式'),
  password: z.string().min(6, '密码最少6个字符').max(32),
});

type LoginSchema = z.infer<typeof loginSchema>;

/**
 * 注册验证项
 */
const registerSchema = z
  .object({
    name: z.string().min(1, '请输入用户名').max(50, '用户名最多50个字符'),
    email: z.email('请输入正确的邮箱格式'),
    password: z.string().min(6, '密码最少6个字符').max(32),
    confirmPassword: z.string().min(6, '确认密码最少6个字符').max(32),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'], // 错误提示挂在 confirmPassword 字段上
  });

type RegisterSchema = z.infer<typeof registerSchema>;

export { loginSchema, type LoginSchema, registerSchema, type RegisterSchema };
