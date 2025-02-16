"use client";
import React from "react";
import type { Task } from "@/types";

interface TaskDragPreviewProps {
  task: Task;
}

const TaskDragPreview: React.FC<TaskDragPreviewProps> = ({ task }) => {
  return (
    <div
      className="bg-white rounded-lg p-4 text-black flex place-content-between content-center mt-1"
      style={{ width: "100%" }}
    >
      <input className="w-full text-ellipsis" value={task.text} readOnly />
    </div>
  );
};

export default TaskDragPreview;
