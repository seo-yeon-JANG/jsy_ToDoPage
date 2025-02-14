// types.ts
export interface Task {
  id: string;
  text: string;
}

export interface Board {
  id: string;
  name: string;
  tasks: Task[];
}
