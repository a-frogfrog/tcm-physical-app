import { Link } from 'react-router-dom';
import { routes } from '#/config/routes';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormHeader, FormRule } from '../components/Form';
import VerifyInput, { useFieldStatus } from '../components/VerifyInput';
import PasswordInput from '../components/PasswordInput';
import {
  Button,
  Form as FormProvider,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui';

const formSchema = z
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

type FormSchema = z.infer<typeof formSchema>;
export default function RegisterPage() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);
  };

  const status = {
    name: useFieldStatus(form, 'name', form.watch('name')),
    email: useFieldStatus(form, 'email', form.watch('email')),
    password: useFieldStatus(form, 'password', form.watch('password')),
    confirmPassword: useFieldStatus(
      form,
      'confirmPassword',
      form.watch('confirmPassword'),
    ),
  };

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <FormHeader>创建账号</FormHeader>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>用户名</FormLabel>
              <FormControl>
                <VerifyInput
                  placeholder='请输入用户名'
                  status={status.name}
                  maxLength={50}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <VerifyInput
                  placeholder='请输入邮箱'
                  status={status.email}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>密码</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder='请输入密码'
                  status={status.password}
                  maxLength={32}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>确认密码</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder='请输入确认密码'
                  status={status.confirmPassword}
                  maxLength={32}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password rules */}
        <FormRule>密码: 6+字符</FormRule>

        {/* Sign up button */}
        <Button className='w-full rounded-full bg-green-500 text-white hover:bg-green-600'>
          创建账号
        </Button>

        <p className='text-center text-sm text-gray-500'>
          已经有账号? {''}
          <Link
            to={routes.auth.login.path}
            className='font-medium text-green-600'>
            登录
          </Link>
        </p>
      </Form>
    </FormProvider>
  );
}
