import { KanbanBoardContext } from "@src/contexts/KanbanBoardContext";
import DeleteIcon from "@src/icons/DeleteIcon";
import { Column } from "@src/types";
import { useContext, useState } from "react";

interface ColumnContainerProps {
  column: Column;
}

export default function ColumnContainer(props: ColumnContainerProps) {
  const { column } = props;
  const [editMode, setEditMode] = useState(false);
  const { updateColumnTitle, deleteColumn } = useContext(KanbanBoardContext);

  return (
    <div className="bg-columnBackground rounded-md flex flex-col max-h-[600px] h-[600px] w-[350px]">
      {/* Column title */}
      <div
        onClick={() => {
          setEditMode(true);
        }}
        className="bg-mainBackground text-md h-[60px] cursor-grab rounded-md 
        rounded-b-none p-3 font-bold flex items-center justify-between"
      >
        <div className="flex gap-2">
          <div
            className="flex justify-center items-center bg-columnBackground
            px-2 py-1 text-sm rounded-full"
          >
            0
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
          className="stroke-gray-500 hover:stroke-rose-500 hover:bg-columnBackgroundColor 
          rounded px-1 py-2"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}
