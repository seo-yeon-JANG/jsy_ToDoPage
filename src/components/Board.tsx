"use client";
import { useState, useEffect } from "react";
import { getStoredData, saveDataToStorage } from "@/utils/storage";
import { Board as BoardType } from "@/types";
import Button from "@/components/common/Button";
import Task from "./Task";

const Board = () => {
  const [boards, setBoards] = useState<BoardType[]>([]);

  const [boardTitle, setBoardTitle] = useState<string>("");

  useEffect(() => {
    setBoards(getStoredData());
  }, []);

  return (
    <>
      {boards.map((board) => (
        <div key={board.id} className="bg-blue-900 rounded-lg p-4 w-full">
          {/* 헤더 */}
          <div className="flex w-full place-content-between">
            <input
              className="focus:outline-none bg-transparent text-2xl"
              value={board.name}
              onChange={() => {}}
            />
            <Button>delete</Button>
          </div>
          {/* tasks 영역 */}
          <div className="mt-4 text-white">
            <Task tasks={board.tasks} />
          </div>
          {/* 푸터 */}
          <div className="mt-4 font-bold text-lg">+ Add a Card</div>
        </div>
      ))}
    </>
  );
};

export default Board;
