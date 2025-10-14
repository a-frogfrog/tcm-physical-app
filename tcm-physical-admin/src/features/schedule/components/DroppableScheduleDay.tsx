import { useDroppable } from '@dnd-kit/core';
import { ScheduleDay } from './ScheduleDay';
import { cn } from '#/lib/utils';

type DroppableScheduleDayProps = {
  droppableId: string;
};

function DroppableScheduleDay({
  droppableId,
  ...props
}: DroppableScheduleDayProps & React.ComponentProps<typeof ScheduleDay>) {
  const { isOver, setNodeRef } = useDroppable({
    id: droppableId,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn('h-full w-full border', {
        'border border-green-300 bg-gray-100': isOver,
      })}>
      <ScheduleDay {...props} />
    </div>
  );
}

export { DroppableScheduleDay };
