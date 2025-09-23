import {
  Button,
  Form as FormProvider,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui';
import { Link } from 'react-router-dom';
import { routes } from '#/config/routes';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormHeader } from '../components/Form';
import VerifyInput, { useFieldStatus } from '../components/VerifyInput';
import PasswordInput from '../components/PasswordInput';

const formSchema = z.object({
  name: z.string().min(5, '请输入用户名').max(50, '用户名最多50个字符'),
  account: z.string().min(11, '账号/手机号最少11个字符').max(11),
  password: z.string().min(8, '密码最少8个字符').max(32),
  confirmPassword: z.string().min(8, '确认密码最少8个字符').max(32),
});

type FormSchema = z.infer<typeof formSchema>;
export default function RegisterPage() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      account: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);
  };

  const status = {
    name: useFieldStatus(form, 'name', form.watch('name')),
    account: useFieldStatus(form, 'account', form.watch('account')),
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
          name='account'
          render={({ field }) => (
            <FormItem>
              <FormLabel>账号/手机号</FormLabel>
              <FormControl>
                <VerifyInput
                  placeholder='请输入账号/手机号'
                  status={status.account}
                  maxLength={11}
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
        <p className='text-sm text-gray-500'>
          8+ characters, 1 uppercase, 1 number
        </p>

        {/* Sign up button */}
        <Button className='w-full rounded-full bg-green-500 text-white hover:bg-green-600'>
          创建账号
        </Button>

        <p className='text-center text-sm text-gray-500'>
          Already have an account?{' '}
          <Link
            to={routes.auth.login.path}
            className='font-medium text-green-600'>
            Log in
          </Link>
        </p>
      </Form>
    </FormProvider>
  );
}
