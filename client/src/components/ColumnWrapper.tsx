import { KanbanBoardContext } from "@src/contexts/KanbanBoardContext";
import AddIcon from "@src/icons/AddIcon";
import DeleteIcon from "@src/icons/DeleteIcon";
import { Column } from "@src/types";
import { useContext, useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

interface ColumnWrapperProps {
  column: Column;
}

export default function ColumnWrapper(props: ColumnWrapperProps) {
  const { column } = props;
  const [columnTitle, setColumnTitle] = useState(column.title);
  const [editMode, setEditMode] = useState(false);
  const { updateColumnTitle, deleteColumn, addTask, tasks } =
    useContext(KanbanBoardContext);

  const columnTasks = useMemo(
    () => tasks.filter((task) => task.columnId === column.id),
    [column.id, tasks]
  );
  const columnTaskIds = useMemo(
    () => columnTasks.map((task) => task.id.toString()),
    [columnTasks]
  );

  const { setDroppableNodeRef } = useSortable({
    id: column.id.toString(),
    disabled: editMode,
    data: {
      type: "column",
      column: column,
    },
  });

  return (
    <div className="bg-secondary rounded-md flex flex-col max-h-[600px] h-[600px] w-[350px]">
      {/* Column title */}
      <div
        onClick={() => {
          setEditMode(true);
        }}
        className="bg-primary text-md h-[60px] rounded-md 
        rounded-b-none p-3 font-bold flex items-center justify-between"
      >
        <div className="flex gap-2">
          <div
            className="flex justify-center items-center bg-secondary
            px-2 py-1 text-sm rounded-full"
          >
            {columnTasks.length}
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              className="bg-transparent focus:border-rose-500 border rounded outline-none px-2"
              value={columnTitle}
              onChange={(e) => setColumnTitle(e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
                updateColumnTitle(column.id, columnTitle);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
                updateColumnTitle(column.id, columnTitle);
              }}
            />
          )}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="stroke-gray-500 hover:stroke-rose-500 hover:bg-columnColor 
          rounded px-1 py-2"
        >
          <DeleteIcon />
        </button>
      </div>

      {/* Column tasks */}
      <div
        className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto"
        ref={setDroppableNodeRef}
      >
        <SortableContext items={columnTaskIds}>
          {columnTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>

      {/* Add task */}
      <button
        className="flex gap-2 items-center rounded-md p-4 rounded-t-none hover:bg-primary hover:font-bold active:bg-[#4392bf]"
        onClick={() => {
          addTask(column.id);
        }}
      >
        <AddIcon />
        Add task
      </button>
    </div>
  );
}
