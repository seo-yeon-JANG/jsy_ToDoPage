import React from "react";
import BoardTitle from "./BoardTitle";
import type { Board } from "@/types";
import TaskDragPreview from "../Task/TaskDragPreview";

interface BoardDragPreviewProps {
  board: Board;
}

const BoardDragPreview: React.FC<BoardDragPreviewProps> = ({ board }) => {
  return (
    <div
      className="bg-blue-900 rounded-lg p-4 w-full flex flex-col"
      style={{ cursor: "grab" }}
    >
      <BoardTitle boardId={board.id} boardName={board.name} />
      <div className="mt-2 flex flex-col gap-1">
        {board.tasks.map((task) => (
          <TaskDragPreview key={task.id} task={task} />
        ))}
      </div>
      <div className="mt-4 font-bold text-lg cursor-pointer">+ Add a Card</div>
    </div>
  );
};

export default BoardDragPreview;
