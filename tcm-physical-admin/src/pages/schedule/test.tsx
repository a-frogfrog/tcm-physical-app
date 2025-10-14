import { EmployeeItem } from '#/features/org/components';
import { departments } from '#/features/schedule/mock/emp';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

export default function SortableList() {
  const [items, setItems] = useState(['A', 'B', 'C', 'D']);
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over.id) {
          setItems((items) => {
            const oldIndex = items.indexOf(active.id as string);
            const newIndex = items.indexOf(over.id as string);
            return arrayMove(items, oldIndex, newIndex);
          });
        }
      }}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </SortableContext>
    </DndContext>
  );
}

function SortableItem({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <div
      className='flex cursor-pointer items-center justify-between rounded-xl p-2'
      {...departments[0].employees[0]}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}>
      <EmployeeItem {...departments[0].employees[0]} />
    </div>
  );
}
