interface PageTitleProps {
  title: string;
  desc: string;
  actions?: React.ReactNode;
  className?: string;
}

const PageTitle = ({ title, desc, actions, className }: PageTitleProps) => {
  return (
    <section className={`flex flex-wrap items-center justify-end ${className}`}>
      <article className='flex-1'>
        <h1 className='text-[clamp(1.25rem,3vw,1.75rem)] font-bold'>{title}</h1>
        <p className='mt-1 text-gray-500'>{desc}</p>
      </article>
      <div>{actions}</div>
    </section>
  );
};

export { PageTitle };
