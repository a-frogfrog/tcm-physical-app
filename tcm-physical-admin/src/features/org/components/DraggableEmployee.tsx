import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { EmployeeItem } from './Employee';
import { cn } from '#/lib/utils';

type DraggableEmployeeItemProps = {
  draggableId: string;
};

function DraggableEmployeeItem({
  draggableId,
  ...props
}: DraggableEmployeeItemProps & React.ComponentProps<typeof EmployeeItem>) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: draggableId,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn('cursor-move rounded-2xl', {
        'border border-gray-400 bg-gray-100': isDragging,
      })}
      {...attributes}
      {...listeners}>
      <EmployeeItem {...props} />
    </div>
  );
}

export { DraggableEmployeeItem };
