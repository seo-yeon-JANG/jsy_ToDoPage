"use client";
import React from "react";
import BoardDragPreview from "./BoardDragPreview";
import TaskDragPreview from "./TaskDragPreview";
import type { Board } from "@/types";

interface DragPreviewProps {
  activeType: "board" | "task" | null;
  activeId: string | null;
  boards: Board[];
}

const DragPreview: React.FC<DragPreviewProps> = ({ activeType, activeId, boards }) => {
  if (!activeId || !activeType) return null;

  if (activeType === "board") {
    const activeBoard = boards.find((board) => board.id === activeId);
    return activeBoard ? <BoardDragPreview board={activeBoard} /> : null;
  }

  const boardWithTask = boards.find((board) =>
    board.tasks.some((task) => task.id === activeId)
  );
  const activeTask = boardWithTask?.tasks.find((task) => task.id === activeId);
  return activeTask ? <TaskDragPreview task={activeTask} /> : null;
};

export default DragPreview;
