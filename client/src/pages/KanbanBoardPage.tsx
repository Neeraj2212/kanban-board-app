import KanbanBoard from "@src/components/KanbanBoard";
import { KanbanBoardProvider } from "@src/contexts/KanbanBoardContext";

export default function KanbanBoardPage() {
  return (
    <KanbanBoardProvider>
      <KanbanBoard />
    </KanbanBoardProvider>
  );
}
