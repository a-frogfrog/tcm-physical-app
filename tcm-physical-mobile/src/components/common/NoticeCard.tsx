import { Info } from 'lucide-react';

type NoticeCardProps = {
  title: string;
  contents: string[];
};
const NoticeCard = ({
  title,
  contents,
}: React.ComponentProps<'article'> & NoticeCardProps) => {
  return (
    <article className='rounded-xl border border-[#2E8B57]/20 bg-[#2E8B57]/10 p-4'>
      <h3 className='flex items-center font-bold text-[#2E8B57]'>
        <Info className='mr-2' /> {title}
      </h3>
      <ul className='mt-2 list-inside list-disc space-y-1 text-sm text-gray-700'>
        {contents.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </article>
  );
};

export { NoticeCard };
