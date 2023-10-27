import { KanbanBoardContext } from "@src/contexts/KanbanBoardContext";
import { Task } from "@src/types";
import { useContext, useState } from "react";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard(props: TaskCardProps) {
  const { task } = props;
  const [editMode, setEditMode] = useState(false);

  const { deleteTask, updateTaskContent } = useContext(KanbanBoardContext);

  const toggleEditMode = () => {
    setEditMode((prev: boolean) => !prev);
  };

  return (
    <div
      className={`bg-white border-2 border-[#d8d8d8] p-2.5 h-[50px] min-h-[50px] items-center 
    flex text-left rounded-md hover:ring-2 hover:ring-inset hover:ring-rose-500 gap-2
    cursor-grab relative ${editMode ? "" : "task"}`}
      onClick={() => !editMode && toggleEditMode()}
    >
      {/* Task Checkbox */}
      <div className="flex items-center h-full ">
        <input
          type="checkbox"
          className="w-5 h-5"
          onChange={() => {
            deleteTask(task.id);
          }}
          defaultChecked={false}
        />
      </div>

      {/* Task content */}
      {!editMode && (
        <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
          {task.content}
        </p>
      )}

      {/* Task edit mode */}
      {editMode && (
        <textarea
          className="bg-transparent focus:border-rose-500 border rounded resize-none outline-none px-2 w-full h-[90%]"
          value={task.content}
          placeholder="Task Content Here"
          onChange={(e) => {
            updateTaskContent(task.id, e.target.value);
          }}
          autoFocus
          onBlur={() => {
            toggleEditMode();
          }}
        />
      )}
    </div>
  );
}
