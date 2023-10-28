export type Id = string;

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  position: number;
  columnId: Id;
  content: string;
};

export type User = {
  id: Id;
  username: string;
};
