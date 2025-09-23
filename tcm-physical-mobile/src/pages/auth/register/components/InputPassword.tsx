import { Input } from '#/components/ui';
import { Check, Eye, EyeOff } from 'lucide-react';

type InputPasswordProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
};
const InputPassword = ({
  value,
  onChange,
  showPassword,
}: InputPasswordProps) => {
  return (
    <div className='relative'>
      <Input
        type={showPassword ? 'text' : 'password'}
        name='password'
        placeholder='Password'
        value={value}
        onChange={onChange}
        className='rounded-2xl border-gray-300 pr-16'
      />
      <button
        type='button'
        className='absolute top-1/2 right-10 -translate-y-1/2 text-gray-500'>
        {showPassword ? (
          <EyeOff className='h-5 w-5' />
        ) : (
          <Eye className='h-5 w-5' />
        )}
      </button>
      <Check className='absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-green-500' />
    </div>
  );
};

export default InputPassword;
