import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { EmployeeItem } from './Employee';

type DraggableEmployeeItemProps = {
  draggableId: string;
};

function DraggableEmployeeItem({
  draggableId,
  ...props
}: DraggableEmployeeItemProps & React.ComponentProps<typeof EmployeeItem>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: draggableId,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    cursor: 'move',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <EmployeeItem {...props} />
    </div>
  );
}

export { DraggableEmployeeItem };
