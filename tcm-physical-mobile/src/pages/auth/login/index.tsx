import { Button } from '#/components/ui';
import { KeySquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { routes } from '#/config/routes';
import VerifyInput from '../components/VerifyInput';
import PasswordInput from '../components/PasswordInput';
import { Form, FormHeader } from '../components/Form';

export default function LoginPage() {
  return (
    <Form>
      <FormHeader>登录账号</FormHeader>

      <VerifyInput
        type='cellphone'
        placeholder='账号/手机号'
        defaultValue='123-456-7890'
        required
      />
      <PasswordInput placeholder='密码' required />

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

      {/* Footer */}
      <p className='text-center text-sm text-gray-500'>
        还没有账号?{' '}
        <Link
          to={routes.auth.register.path}
          className='font-medium text-green-600'>
          创建账号
        </Link>
      </p>
    </Form>
  );
}
