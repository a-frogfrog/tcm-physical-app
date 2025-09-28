import { cn } from '#/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type StepButtonProps = {
  direction: 'prev' | 'next';
};

const StepButton = ({
  onClick,
  className,
  direction,
}: React.ComponentProps<'button'> & StepButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full px-6 py-3 font-medium shadow-md transition-all duration-300',
        className,
      )}>
      {direction === 'prev' ? (
        <ArrowLeft className='mr-1 inline-block' />
      ) : (
        <ArrowRight className='ml-1 inline-block' />
      )}
      {direction === 'prev' ? '上一步' : '下一步'}
    </button>
  );
};

const PrevButton = ({ onClick }: React.ComponentProps<'button'>) => {
  return (
    <StepButton
      onClick={onClick}
      direction='prev'
      className='bg-gray-200 text-[#3E2723]'
    />
  );
};

const NextButton = ({ disabled, onClick }: React.ComponentProps<'button'>) => {
  return (
    <StepButton
      onClick={onClick}
      direction='next'
      className={cn('bg-[#8B4513] text-white', {
        'cursor-not-allowed opacity-50': disabled,
      })}
    />
  );
};

export { PrevButton, NextButton };
