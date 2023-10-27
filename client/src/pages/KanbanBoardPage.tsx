import KanbanBoard from "@src/components/KanbanBoard";
import { KanbanBoardProvider } from "@src/contexts/KanbanBoardContext";

export default function KanbanBoardPage() {
  return (
    <KanbanBoardProvider>
      <div className="overflow-x-auto min-h-screen">
        <KanbanBoard />
      </div>
    </KanbanBoardProvider>
  );
}
