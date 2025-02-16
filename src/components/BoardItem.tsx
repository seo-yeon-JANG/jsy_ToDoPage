"use client";
import React from "react";
import { SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import BoardTitle from "./BoardTitle";
import TaskContainer from "./TaskContainer";
import type { Board } from "@/types";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";

interface BoardItemProps {
  board: Board;
  addTask: (boardId: string) => void;
  changeBoardTitle: ({boardId,title}: { boardId: string; title: string }) => void;
  deleteBoard: (boardId: string) => void;
  changeTaskTitle: (params: { boardId: string; taskId: string; title: string }) => void;
  deleteTask: (params: { boardId: string; taskId: string }) => void;
}

const BoardItem: React.FC<BoardItemProps> = ({
  board,
  addTask,
  changeBoardTitle,
  deleteBoard,
  changeTaskTitle,
  deleteTask,
}) => {
  return (
    <SortableItem id={board.id}>
      <div className="bg-blue-900 rounded-lg p-4 w-full flex flex-col" style={{ cursor: "grab" }}>
        <BoardTitle
          boardId={board.id}
          boardName={board.name}
          onTitleChange={changeBoardTitle}
          onDelete={deleteBoard}
        />
        <SortableContext items={board.tasks} strategy={verticalListSortingStrategy}>
          <TaskContainer
            boardId={board.id}
            tasks={board.tasks}
            onDeleteTask={deleteTask}
            onChangeTaskTitle={changeTaskTitle}
          />
        </SortableContext>
        <div
          className="mt-4 font-bold text-lg cursor-pointer"
          onClick={() => addTask(board.id)}
        >
          + Add a Card
        </div>
      </div>
    </SortableItem>
  );
};

export default BoardItem;
