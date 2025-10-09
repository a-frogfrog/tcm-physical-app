import { cn } from '#/lib/utils';

import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui';

import { type UseFormReturn } from 'react-hook-form';
import { type LoginSchema } from '../constants';

type LoginFormProps = {
  onSubmit: (data: LoginSchema) => void;
  form: UseFormReturn<LoginSchema>;
};

function LoginForm({
  onSubmit,
  form,
  ...props
}: Omit<React.ComponentProps<'form'>, 'onSubmit'> & LoginFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form?.handleSubmit(onSubmit)}
        className={cn('flex flex-col gap-6')}
        {...props}>
        <div className='flex flex-col items-center gap-2 text-center'>
          <h1 className='text-2xl font-bold'>登录你的账号</h1>
          <p className='text-muted-foreground text-sm text-balance'>
            输入你的账号登录
          </p>
        </div>
        <FormField
          control={form.control}
          name='account'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='account'>账号</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id='account'
                  aria-label='账号'
                  type='tel'
                  placeholder='请输入账号'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='password'>密码</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id='password'
                  aria-label='密码'
                  type='password'
                  placeholder='请输入密码'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          登录
        </Button>
        <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
          <span className='bg-background text-muted-foreground relative z-10 px-2'>
            或者使用
          </span>
        </div>
      </form>
    </Form>
  );
}

export { LoginForm };
