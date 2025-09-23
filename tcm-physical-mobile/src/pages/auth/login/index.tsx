import { Button, Input } from '#/components/ui';
import { KeySquare, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '#/config/routes';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='flex min-h-screen items-center justify-center bg-white px-4'>
      <form className='w-full max-w-md rounded-3xl border-0 shadow-none'>
        <div className='flex flex-col gap-6 p-6'>
          {/* Header */}
          <div className='space-y-2'>
            <h1 className='text-center text-xl font-semibold'>登录账号</h1>
            <p className='text-2xl font-bold'>Welcome back</p>
          </div>

          {/* Email */}
          <div className='space-y-4'>
            <Input
              type='cellphone'
              placeholder='账号/手机号'
              defaultValue='123-456-7890'
              className='h-12 rounded-2xl border-gray-300'
              required
            />

            {/* Password with toggle icon */}
            <div className='relative'>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder='密码'
                className='h-12 rounded-2xl pr-10'
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute inset-y-0 right-3 flex items-center text-green-600'>
                {showPassword ? (
                  <EyeOff className='h-5 w-5' />
                ) : (
                  <Eye className='h-5 w-5' />
                )}
              </button>
            </div>

            {/* Forgot password */}
            <a
              href='#'
              className='font-smiley text-sm font-medium text-green-600'>
              忘记密码?
            </a>

            {/* Sign in button */}
            <Button
              type='submit'
              className='my-4 h-10 w-full rounded-full bg-green-500 text-white hover:bg-green-600'>
              登录账号
            </Button>
          </div>

          {/* Divider */}
          <div className='flex items-center gap-2'>
            <hr className='flex-1 border-gray-200' />
            <span className='text-sm text-gray-400'>or</span>
            <hr className='flex-1 border-gray-200' />
          </div>

          {/* Social buttons */}
          <div className='flex flex-col gap-3'>
            <Button
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
        </div>
      </form>
    </div>
  );
}
