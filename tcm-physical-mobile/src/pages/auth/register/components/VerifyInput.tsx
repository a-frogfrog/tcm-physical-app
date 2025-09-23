import { Input } from '#/components/ui';
import { Check } from 'lucide-react';

type VerifyInputProps = {
  isShow?: boolean;
};
const VerifyInput = ({
  isShow = false,
  ...props
}: React.ComponentProps<'input'> & VerifyInputProps) => {
  return (
    <div className='relative'>
      <Input {...props} className='rounded-2xl border-gray-300 pr-10' />
      {isShow && (
        <Check className='absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-green-500' />
      )}
    </div>
  );
};

export default VerifyInput;
