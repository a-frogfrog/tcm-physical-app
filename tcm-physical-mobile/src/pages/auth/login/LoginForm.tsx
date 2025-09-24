import VerifyInput, { type VerifyInputStatus } from '../components/VerifyInput';
import PasswordInput from '../components/PasswordInput';
import { Form, FormFooter, FormHeader } from '../components/Form';

import { KeySquare } from 'lucide-react';

import {
  Button,
  Form as FormProvider,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui';
import type { useForm } from 'react-hook-form';
import type { FormSchema } from './constants';
import { Link } from 'react-router-dom';

type FieldStatusMap<T> = {
  [K in keyof T]: VerifyInputStatus;
};
type LoginFormProps = {
  form: ReturnType<typeof useForm<FormSchema>>;
  status: FieldStatusMap<FormSchema>;
  registerLink: string;
  onSubmit: (data: FormSchema) => void;
};

export default function LoginForm({
  form,
  status,
  registerLink,
  onSubmit,
}: LoginFormProps) {
  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <FormHeader>登录账号</FormHeader>

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <VerifyInput
                  type='email'
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
                  maxLength={32}
                  placeholder='请输入密码'
                  status={status.password}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Forgot password */}
        <a href='#' className='font-smiley text-sm font-medium text-green-600'>
          忘记密码?
        </a>

        {/* Sign in button */}
        <Button
          type='submit'
          className='my-4 h-10 w-full rounded-full bg-green-500 text-white hover:bg-green-600'>
          登录账号
        </Button>

        {/* Divider */}
        <div className='flex items-center gap-2'>
          <hr className='flex-1 border-gray-200' />
          <span className='text-sm text-gray-400'>or</span>
          <hr className='flex-1 border-gray-200' />
        </div>

        {/* Social buttons */}
        <div className='flex flex-col gap-3'>
          <Button
            type='button'
            variant='outline'
            className='flex w-full items-center justify-center gap-2 rounded-full'>
            <KeySquare className='h-5 w-5 text-blue-500' /> 使用验证码登录
          </Button>
        </div>

        <FormFooter>
          {/* Footer */}
          <p className='text-center text-sm text-gray-500'>
            还没有账号?{' '}
            <Link to={registerLink} className='font-medium text-green-600'>
              创建账号
            </Link>
          </p>
        </FormFooter>
      </Form>
    </FormProvider>
  );
}
