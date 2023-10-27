import { arrayMove } from "@dnd-kit/sortable";
import { Column, Task } from "@src/types";
import { createContext } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type KanbanBoardContextType = {
  columns: Column[];
  tasks: Task[];
  addColumn: () => void;
  deleteColumn: (columnId: string) => void;
  updateColumnTitle: (columnId: string, newTitle: string) => void;
  addTask: (columnId: string) => void;
  deleteTask: (taskId: string) => void;
  updateTaskContent: (taskId: string, newContent: string) => void;
  addTaskOverNewTask: (activeTaskId: string, overTaskId: string) => void;
  addTaskOverNewColumn: (activeTaskId: string, overColumnId: string) => void;
};

export const KanbanBoardContext = createContext<KanbanBoardContextType>({
  columns: [],
  tasks: [],
  addColumn: () => {},
  deleteColumn: () => {},
  updateColumnTitle: () => {},
  addTask: () => {},
  deleteTask: () => {},
  updateTaskContent: () => {},
  addTaskOverNewTask: () => [],
  addTaskOverNewColumn: () => [],
});

export const KanbanBoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Column functions
  const addColumn = () => {
    const newColumn: Column = {
      id: uuidv4(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, newColumn]);
  };

  const deleteColumn = (columnId: string) => {
    const newColumns = columns.filter((column) => column.id !== columnId);
    const newTasks = tasks.filter((task) => task.columnId !== columnId);

    setTasks(newTasks);
    setColumns(newColumns);
  };

  const updateColumnTitle = (columnId: string, newTitle: string) => {
    const newColumns = columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          title: newTitle,
        };
      } else {
        return column;
      }
    });
    setColumns(newColumns);
  };

  // Task functions
  const addTask = (columnId: string) => {
    const newTask: Task = {
      columnId,
      id: uuidv4(),
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  const updateTaskContent = (taskId: string, newContent: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          content: newContent,
        };
      } else {
        return task;
      }
    });
    setTasks(newTasks);
  };

  // Drag functions
  const addTaskOverNewTask = (activeTaskId: string, overTaskId: string) => {
    setTasks((tasks) => {
      const activeIndex = tasks.findIndex((t) => t.id === activeTaskId);
      const overIndex = tasks.findIndex((t) => t.id === overTaskId);

      if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
        tasks[activeIndex].columnId = tasks[overIndex].columnId;
        return arrayMove(tasks, activeIndex, overIndex - 1);
      }

      return arrayMove(tasks, activeIndex, overIndex);
    });
  };

  const addTaskOverNewColumn = (activeTaskId: string, overColumnId: string) => {
    setTasks((tasks) => {
      const activeIndex = tasks.findIndex((t) => t.id === activeTaskId);

      tasks[activeIndex].columnId = overColumnId;
      return arrayMove(tasks, activeIndex, activeIndex);
    });
  };

  return (
    <KanbanBoardContext.Provider
      value={{
        columns,
        tasks,
        addColumn,
        deleteColumn,
        updateColumnTitle,
        addTask,
        deleteTask,
        updateTaskContent,
        addTaskOverNewTask,
        addTaskOverNewColumn,
      }}
    >
      {children}
    </KanbanBoardContext.Provider>
  );
};
