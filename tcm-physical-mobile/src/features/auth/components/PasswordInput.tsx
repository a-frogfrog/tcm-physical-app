import { Eye, EyeOff } from 'lucide-react';
import VerifyInput from './VerifyInput';
import { useState } from 'react';

const PasswordInput = ({
  ...props
}: React.ComponentProps<typeof VerifyInput>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative'>
      <VerifyInput {...props} type={showPassword ? 'text' : 'password'} />
      <button
        onClick={() => setShowPassword(!showPassword)}
        type='button'
        className='absolute top-1/2 right-10 -translate-y-1/2 text-gray-500'>
        {showPassword ? (
          <EyeOff className='h-5 w-5' />
        ) : (
          <Eye className='h-5 w-5' />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
