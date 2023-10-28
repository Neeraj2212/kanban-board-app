export interface Task {
  id: string;
  position: number;
  content: string;
  userId: string | null;
  columnId: string | null;
}
