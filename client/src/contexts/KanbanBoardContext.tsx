import { arrayMove } from "@dnd-kit/sortable";
import { Column, Task } from "@src/types";
import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "./UserContext";

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
  moveTask: (
    activeTaskId: string,
    sourceColumnId: string,
    destinationColumnId: string
  ) => void;
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
  moveTask: () => {},
});

export const KanbanBoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useContext(UserContext);

  const fetchTasksFromDB = () =>
    axios
      .get("/api/task")
      .then((response) => {
        setTasks(response.data.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });

  const fetchColumnsFromDB = () =>
    axios
      .get("/api/column")
      .then((response) => {
        setColumns(response.data.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });

  const fetchFromDB = useCallback(async () => {
    await Promise.all([fetchColumnsFromDB(), fetchTasksFromDB()]);
  }, []);

  useEffect(() => {
    if (user) {
      fetchFromDB();
    }
  }, [user, fetchFromDB]);

  // Column functions
  const addColumn = () => {
    const newColumn: Column = {
      id: uuidv4(),
      title: `Column ${columns.length + 1}`,
    };

    axios.post("/api/column", newColumn).catch((error) => {
      toast.error(error.response.data.message);
    });

    setColumns([...columns, newColumn]);
  };

  const deleteColumn = (columnId: string) => {
    const newColumns = columns.filter((column) => column.id !== columnId);
    const newTasks = tasks.filter((task) => task.columnId !== columnId);

    setColumns(newColumns);
    setTasks(newTasks);

    axios.delete(`/api/column/${columnId}`).catch((error) => {
      toast.error(error.response.data.message);
    });
  };

  const updateColumnTitle = async (columnId: string, newTitle: string) => {
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

    axios
      .put(`/api/column/${columnId}`, {
        title: newTitle,
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });

    setColumns(newColumns);
  };

  // Task functions
  const addTask = (columnId: string) => {
    const position = tasks.filter((task) => task.columnId === columnId).length;
    const newTask: Task = {
      columnId,
      id: uuidv4(),
      content: `Task ${position + 1}`,
      position,
    };
    setTasks([...tasks, newTask]);

    axios.post("/api/task", newTask).catch((error) => {
      toast.error(error.response.data.message);
    });
  };

  const deleteTask = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);

    axios
      .delete(`/api/task/${taskId}`)
      .then(() => {
        fetchTasksFromDB();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
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

    axios
      .put(`/api/task/${taskId}`, {
        content: newContent,
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  // Drag functions
  const addTaskOverNewTask = (activeTaskId: string, overTaskId: string) => {
    setTasks((tasks) => {
      const activeIndex = tasks.findIndex((t) => t.id === activeTaskId);
      const overIndex = tasks.findIndex((t) => t.id === overTaskId);

      if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
        tasks[activeIndex].columnId = tasks[overIndex].columnId;
        return arrayMove(tasks, activeIndex, 0);
      }

      return arrayMove(tasks, activeIndex, 0);
    });
  };

  const addTaskOverNewColumn = (activeTaskId: string, overColumnId: string) => {
    setTasks((tasks) => {
      const activeIndex = tasks.findIndex((t) => t.id === activeTaskId);

      tasks[activeIndex].columnId = overColumnId;
      return arrayMove(tasks, activeIndex, 0);
    });
  };

  const moveTask = async (
    activeTaskId: string,
    sourceColumnId: string,
    destinationColumnId: string
  ) => {
    const response = await axios
      .put(`/api/task/move/${activeTaskId}`, {
        sourceColumnId,
        destinationColumnId,
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });

    if (response && response.data) {
      await fetchTasksFromDB();
    }
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
        moveTask,
      }}
    >
      {children}
    </KanbanBoardContext.Provider>
  );
};
