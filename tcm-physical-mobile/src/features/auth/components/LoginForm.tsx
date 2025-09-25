import VerifyInput, { type VerifyInputStatus } from './VerifyInput';
import PasswordInput from './PasswordInput';
import { Form, FormFooter, FormHeader } from './Form';

import type { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { type LoginSchema, loginMethods } from '#/schemas';

import {
  Button,
  Form as FormProvider,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '#/components/ui';

type FieldStatusMap<T> = {
  [K in keyof T]: VerifyInputStatus;
};
type LoginFormProps = {
  form: ReturnType<typeof useForm<LoginSchema>>;
  status: Omit<FieldStatusMap<LoginSchema>, 'loginType'>;
  registerLink: string;
  loginType: LoginSchema['loginType'];
  onSubmit: (data: LoginSchema) => void;
  onChangeLoginType: (type: LoginSchema['loginType']) => void;
  onGetCode: () => void;
  isPending: boolean;
};

export default function LoginForm({
  form,
  status,
  registerLink,
  loginType,
  onSubmit,
  onChangeLoginType,
  onGetCode,
  isPending,
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

        {loginType === 'password' && (
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
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {loginType === 'code' && (
          <FormField
            control={form.control}
            name='code'
            render={({ field }) => (
              <FormItem>
                <FormLabel>验证码</FormLabel>
                <section className='flex justify-between'>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className='size-9' />
                        <InputOTPSlot index={1} className='size-9' />
                        <InputOTPSlot index={2} className='size-9' />
                        <InputOTPSlot index={3} className='size-9' />
                        <InputOTPSlot index={4} className='size-9' />
                        <InputOTPSlot index={5} className='size-9' />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <Button
                    type='button'
                    onClick={() => {
                      onGetCode();
                    }}>
                    获取验证码
                  </Button>
                </section>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Forgot password */}
        <a href='#' className='font-smiley text-sm font-medium text-green-600'>
          忘记密码?
        </a>

        {/* Sign in button */}
        <Button
          type='submit'
          disabled={isPending}
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
          {loginMethods.map(({ icon, text, name }, index) => {
            if (loginType !== name)
              return (
                <Button
                  onClick={() => {
                    onChangeLoginType(name);
                  }}
                  key={index}
                  type='button'
                  variant='outline'
                  className='flex w-full items-center justify-center gap-2 rounded-full'>
                  {icon} {text}
                </Button>
              );
          })}
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
