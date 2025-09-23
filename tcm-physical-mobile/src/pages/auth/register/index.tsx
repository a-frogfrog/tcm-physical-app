import { useState } from 'react';
import { Input, Button } from '#/components/ui';
import { Check } from 'lucide-react';
import InputPassword from './components/InputPassword';
import VerifyInput from './components/VerifyInput';
export default function RegisterPage() {
  const [showPassword] = useState(false);
  const [form, setForm] = useState({
    userName: 'Jen',
    account: 'jendoe.mobbin@gmail.com',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateUserName = (value: string) => {
    return value.length >= 3; // Example rule: username must be at least 3 characters
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4'>
      <form className='w-full max-w-md rounded-3xl border-0'>
        <div className='flex flex-col gap-6 p-6'>
          {/* Header */}
          <h1 className='text-center text-xl font-semibold'>创建新账号</h1>

          <div className='space-y-4'>
            {/* user name */}
            <VerifyInput
              type='text'
              name='userName'
              placeholder='用户名'
              value={form.userName}
              onChange={handleChange}
              isShow={validateUserName(form.userName)}
            />

            {/* Email */}
            <div className='relative'>
              <Input
                type='cell'
                name='account'
                placeholder='账号/手机号'
                value={form.account}
                onChange={handleChange}
                className='rounded-2xl border-gray-300 pr-10'
              />
              <Check className='absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-green-500' />
            </div>

            {/* Password */}
            <InputPassword
              value={form.password}
              onChange={handleChange}
              showPassword={showPassword}
            />

            {/*  Enter password here   */}
            <InputPassword
              value={form.password}
              onChange={handleChange}
              showPassword={showPassword}
            />

            {/* Password rules */}
            <p className='text-sm text-gray-500'>
              8+ characters, 1 uppercase, 1 number
            </p>

            {/* Sign up button */}
            <Button className='w-full rounded-full bg-green-500 text-white hover:bg-green-600'>
              Sign up
            </Button>
          </div>

          {/* Footer */}
          <p className='text-center text-sm text-gray-500'>
            Already have an account?{' '}
            <a href='#' className='font-medium text-green-600'>
              Log in
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
