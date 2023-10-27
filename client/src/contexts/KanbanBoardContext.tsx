import { Column } from "@src/types";
import { createContext } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type KanbanBoardContextType = {
  columns: Column[];
  addColumn: () => void;
  deleteColumn: (columnId: string) => void;
  updateColumnTitle: (columnId: string, newTitle: string) => void;
};

export const KanbanBoardContext = createContext<KanbanBoardContextType>({
  columns: [],
  addColumn: () => {},
  deleteColumn: () => {},
  updateColumnTitle: () => {},
});

export const KanbanBoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [columns, setColumns] = useState<Column[]>([]);

  const addColumn = () => {
    const newColumn: Column = {
      id: uuidv4(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, newColumn]);
  };

  const deleteColumn = (columnId: string) => {
    const newColumns = columns.filter((column) => column.id !== columnId);
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

  return (
    <KanbanBoardContext.Provider
      value={{
        columns,
        addColumn,
        deleteColumn,
        updateColumnTitle,
      }}
    >
      {children}
    </KanbanBoardContext.Provider>
  );
};
