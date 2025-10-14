function ScheduleTable({
  children,
}: React.PropsWithChildren<{
  children: React.ReactNode;
}>) {
  return (
    <section className='flex h-full w-full flex-col rounded-2xl bg-white p-4 shadow-md'>
      <h2 className='py-2 text-lg font-bold'>排班计划</h2>
      <div className='flex flex-1'>{children}</div>
    </section>
  );
}
export { ScheduleTable };
