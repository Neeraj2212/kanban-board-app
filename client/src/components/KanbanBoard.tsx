import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import AddIcon from "@icons/AddIcon";
import { KanbanBoardContext } from "@src/contexts/KanbanBoardContext";
import { Task } from "@src/types";
import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import ColumnWrapper from "./ColumnWrapper";
import TaskCard from "./TaskCard";

export default function KanbanBoard() {
  const { columns, addColumn, addTaskOverNewColumn, addTaskOverNewTask } =
    useContext(KanbanBoardContext);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type !== "task") return;
    setActiveTask(event.active.data.current.task);
  };

  const onDragEnd = () => {
    setActiveTask(null);
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "task";
    const isOverATask = over.data.current?.type === "task";

    if (!isActiveATask) return;

    // Dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      return addTaskOverNewTask(activeId.toString(), overId.toString());
    }

    const isOverAColumn = over.data.current?.type === "column";

    // Dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      return addTaskOverNewColumn(activeId.toString(), overId.toString());
    }
  };

  return (
    <div className="flex w-full px-[40px] py-10 ">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <div className="flex gap-4">
          <div className="flex gap-4">
            {columns.map((column) => {
              return <ColumnWrapper key={column.id} column={column} />;
            })}
          </div>
          <button
            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg
            bg-primary text-md font-bold p-4 ring-rose-500 hover:ring-2 flex gap-2 active:bg-[#4392bf] "
            onClick={() => {
              addColumn();
            }}
          >
            <AddIcon />
            Add Column
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}
