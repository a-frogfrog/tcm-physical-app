function ScheduleTable({
  children,
}: React.PropsWithChildren<{
  children: React.ReactNode;
}>) {
  return (
    <section className='flex h-full w-full flex-col rounded-2xl bg-white p-4 shadow-md'>
      <h2 className='py-2 text-lg font-bold'>排班计划</h2>
      <div className='flex-1'>
        <div className='grid h-full w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7'>
          {children}
        </div>
      </div>
    </section>
  );
}
export { ScheduleTable };
