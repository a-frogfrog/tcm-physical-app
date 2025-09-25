const Form = ({ children, ...props }: React.ComponentProps<'form'>) => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4'>
      <form
        {...props}
        role='form'
        className='w-full max-w-md rounded-3xl border-0'>
        <div className='flex flex-col gap-6 p-3'>
          <div className='space-y-4'>{children}</div>

          {/* Footer */}
        </div>
      </form>
    </div>
  );
};

const FormHeader = ({ children }: { children: React.ReactNode }) => {
  return <h1 className='text-center text-xl font-semibold'>{children}</h1>;
};

const FormFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mt-4 flex flex-col items-center gap-4'>{children}</div>
  );
};

const FormRule = ({ children }: { children: React.ReactNode }) => {
  return <p className='text-sm text-gray-500'>{children}</p>;
};

export { Form, FormHeader, FormFooter, FormRule };
