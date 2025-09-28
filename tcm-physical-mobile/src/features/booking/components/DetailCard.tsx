const DetailCard = ({ children }: React.ComponentProps<'article'>) => {
  return (
    <article className='rounded-xl bg-white p-6 shadow-md'>{children}</article>
  );
};

const DetailCardHeader = ({ children }: React.ComponentProps<'header'>) => {
  return <h3 className='mb-4 border-b pb-2 text-lg font-bold'>{children}</h3>;
};

const DetailCardFooter = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <div className='border-t border-gray-200 pt-4'>
      <div className='flex justify-between text-lg font-bold'>
        <span>{title}</span>
        <span className='text-[#CD5C5C]'>{value}</span>
      </div>
    </div>
  );
};

const DetailCardItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className='flex justify-between py-2'>
      <span className='text-gray-600'>{label}：</span>
      <span className='font-medium'>{value}</span>
    </div>
  );
};

export { DetailCard, DetailCardItem, DetailCardHeader, DetailCardFooter };
