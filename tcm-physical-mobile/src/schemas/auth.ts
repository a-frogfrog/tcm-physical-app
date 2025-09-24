import { KeySquare } from 'lucide-react';
import React from 'react';
import { z } from 'zod';

/**
 * 登录验证项
 */

const emailLoginSchema = z.email('请输入正确的邮箱格式');

const passwordLoginSchema = z.object({
  loginType: z.literal('password'),
  email: emailLoginSchema,
  password: z.string().min(6, '密码最少6个字符').max(32, '密码最多32位'),
});

const codeLoginSchema = z.object({
  loginType: z.literal('code'),
  email: emailLoginSchema,
  code: z.string().length(6, '验证码必须是6位'),
});

const googleLoginSchema = z.object({
  loginType: z.literal('google'),
  email: emailLoginSchema,
  code: z.string().length(6, '验证码必须是6位'),
});

const loginSchema = z.discriminatedUnion('loginType', [
  passwordLoginSchema,
  codeLoginSchema,
  googleLoginSchema,
]);

type LoginSchema = z.infer<typeof loginSchema>;

type LoginMethod = {
  name: LoginSchema['loginType'];
  icon: ReturnType<typeof React.createElement> | React.ReactNode;
  text: string;
};

//登录类型配置
const loginMethods: LoginMethod[] = [
  {
    name: 'code',
    icon: React.createElement(KeySquare),
    text: '验证码登录',
  },
  {
    name: 'password',
    icon: React.createElement(KeySquare),
    text: '密码登录',
  },
  {
    name: 'google',
    icon: React.createElement(KeySquare),
    text: 'Google登录',
  },
];

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

export { loginSchema, registerSchema, loginMethods };

export type { RegisterSchema, LoginSchema };
