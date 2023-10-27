import AddIcon from "@icons/AddIcon";
import { KanbanBoardContext } from "@src/contexts/KanbanBoardContext";
import { useContext } from "react";

export default function KanbanBoard() {
  const { columns, addColumn } = useContext(KanbanBoardContext);

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {columns.map((column) => {
            return <div> {column.title} </div>;
          })}
        </div>
        <button
          className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg
            bg-mainBackground border-2 border-columnBackground
            p-4 ring-rose-500 hover:ring-2 flex gap-2 "
          onClick={() => {
            addColumn();
          }}
        >
          <AddIcon />
          Add Column
        </button>
      </div>
    </div>
  );
}
