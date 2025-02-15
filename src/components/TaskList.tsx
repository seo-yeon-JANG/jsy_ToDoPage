// TaskList.tsx
import React from "react";
import Task from "./Task";
import type { Task as TaskType } from "@/types";

interface TaskListProps {
  tasks: TaskType[];
  boardId: string;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, boardId }) => {
  return (
    <div className="mt-4 text-white flex-grow">
      {tasks.map((task) => (
        <Task key={task.id} boardId={boardId} title={task.text} />
      ))}
    </div>
  );
};

export default TaskList;
