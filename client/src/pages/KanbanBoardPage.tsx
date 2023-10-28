import KanbanBoard from "@src/components/KanbanBoard";
import NavBar from "@src/components/NavBar";
import { KanbanBoardProvider } from "@src/contexts/KanbanBoardContext";

export default function KanbanBoardPage() {
  return (
    <KanbanBoardProvider>
      <NavBar />
      <div className="overflow-x-auto min-h-screen">
        <KanbanBoard />
      </div>
    </KanbanBoardProvider>
  );
}
