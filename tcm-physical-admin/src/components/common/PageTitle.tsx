interface PageTitleProps {
  title: string;
  desc: string;
  actions?: React.ReactNode;
  className?: string;
}

const PageTitle = ({ title, desc, actions, className }: PageTitleProps) => {
  return (
    <section className={`flex items-center justify-end flex-wrap ${className}`}>
      <article className='flex-1'>
        <h1 className='text-[clamp(1.25rem,3vw,1.75rem)] font-bold'>{title}</h1>
        <p className='text-gray-500 mt-1'>{desc}</p>
      </article>
      <div>{actions}</div>
    </section>
  );
};

export { PageTitle };
