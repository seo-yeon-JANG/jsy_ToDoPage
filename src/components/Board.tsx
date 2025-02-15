"use client";
import React from "react";
import Task from "./Task";
import BoardTitle from "./BoardTitle";
import Header from "./common/Header";
import useBoards from "@/hooks/useBoards";

const Board: React.FC = () => {
  const {
    boards,
    addBoard,
    deleteBoard,
    changeBoardTitle,
    addTask,
    deleteTask,
    changeTaskTitle,
  } = useBoards();

  return (
    <div>
      <Header onAddBoard={addBoard} />
      <div className="grid grid-cols-4 gap-5">
        {boards.map((board) => (
          <div
            key={board.id}
            className="bg-blue-900 rounded-lg p-4 w-full flex flex-col"
          >
            <BoardTitle
              boardId={board.id}
              boardName={board.name}
              onTitleChange={changeBoardTitle}
              onDelete={deleteBoard}
            />
            {/* tasks 영역 */}
            <Task
              boardId={board.id}
              tasks={board.tasks}
              onDeleteTask={deleteTask}
              onChangeTaskTitle={changeTaskTitle}
            />
            {/* 푸터 */}
            <div
              className="mt-4 font-bold text-lg"
              onClick={() => {
                addTask(board.id);
              }}
            >
              + Add a Card
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
