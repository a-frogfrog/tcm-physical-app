type PageTitleProps = {
  title: string;
  description: string;
};

const PageTitle = ({ title, description }: PageTitleProps) => {
  return (
    <div className='bg-[#E9F5EE] px-6 py-4'>
      <h2 className='text-lg font-bold text-[#2D6A4F]'>{title}</h2>
      <p className='mt-1 text-sm text-green-700'>{description}</p>
    </div>
  );
};

export { PageTitle };
