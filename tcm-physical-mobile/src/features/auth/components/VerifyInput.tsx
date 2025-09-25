import { Input } from '#/components/ui';
import { Check, ShieldX } from 'lucide-react';
import type { UseFormReturn, Path } from 'react-hook-form';

export type VerifyInputStatus = 'default' | 'success' | 'error';

type VerifyInputProps = {
  status?: VerifyInputStatus;
};
const VerifyInput = ({
  status = 'default',
  ...props
}: React.ComponentProps<typeof Input> & VerifyInputProps) => {
  return (
    <div className='relative'>
      <Input {...props} className='rounded-2xl border-gray-300 pr-16' />
      {status === 'success' && (
        <Check className='absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-green-500' />
      )}
      {status === 'error' && (
        <ShieldX className='absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-red-500' />
      )}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useFieldStatus<T extends Record<string, any>>(
  form: UseFormReturn<T>,
  name: Path<T>,
  value: T[keyof T],
): VerifyInputStatus {
  if (form.formState.errors[name]) return 'error';
  if (value) return 'success';
  return 'default';
}

export default VerifyInput;
export { useFieldStatus };
