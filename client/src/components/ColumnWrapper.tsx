import { KanbanBoardContext } from "@src/contexts/KanbanBoardContext";
import AddIcon from "@src/icons/AddIcon";
import DeleteIcon from "@src/icons/DeleteIcon";
import { Column } from "@src/types";
import { useContext, useState } from "react";
import TaskCard from "./TaskCard";

interface ColumnWrapperProps {
  column: Column;
}

export default function ColumnWrapper(props: ColumnWrapperProps) {
  const { column } = props;
  const [editMode, setEditMode] = useState(false);
  const { updateColumnTitle, deleteColumn, addTask, tasks } =
    useContext(KanbanBoardContext);

  const columnTasks = tasks.filter((task) => task.columnId === column.id);

  return (
    <div className="bg-secondary rounded-md flex flex-col max-h-[600px] h-[600px] w-[350px]">
      {/* Column title */}
      <div
        onClick={() => {
          setEditMode(true);
        }}
        className="bg-primary text-md h-[60px] cursor-grab rounded-md 
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
              value={column.title}
              onChange={(e) => updateColumnTitle(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
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
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        {columnTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
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
