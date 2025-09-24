import { z } from 'zod';

export const formSchema = z.object({
  account: z.string().min(11, '账号/手机号最少11个字符').max(11),
  password: z.string().min(6, '密码最少6个字符').max(32),
});

export type FormSchema = z.infer<typeof formSchema>;
