import React from "react";
import Button from "@/components/common/Button";

interface BoardTitleProps {
  boardId: string;
  boardName: string;
  onTitleChange: ({
    boardId,
    title,
  }: {
    boardId: string;
    title: string;
  }) => void;
  onDelete: (boardId: string) => void;
}

const BoardTitle: React.FC<BoardTitleProps> = ({
  boardId,
  boardName,
  onTitleChange,
  onDelete,
}) => {
  return (
    <div className="flex w-full items-center overflow-hidden">
      <input
        className="focus:outline-none bg-transparent text-2xl flex-grow w-full text-ellipsis"
        value={boardName}
        onChange={(e) => onTitleChange({ boardId, title: e.target.value })}
      />
      <Button onClick={() => onDelete(boardId)}>Delete</Button>
    </div>
  );
};

export default BoardTitle;
