import { Button } from '#/components/ui';
import { createElement } from 'react';

type LoginMethodItems = {
  icon: ReturnType<typeof createElement> | React.ReactNode;
  text: string;
};

type LoginMethodProps = {
  methods: LoginMethodItems[];
};

export default function LoginMethod({ methods }: LoginMethodProps) {
  return (
    <div className='flex flex-col gap-3'>
      {methods.map(({ icon, text }, index) => (
        <Button
          key={index}
          type='button'
          variant='outline'
          className='flex w-full items-center justify-center gap-2 rounded-full'>
          {icon} {text}
        </Button>
      ))}
    </div>
  );
}
