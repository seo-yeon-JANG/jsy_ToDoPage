// useBoards.ts
import { useState, useEffect } from "react";
import type { Board } from "@/types";
import type { Task } from "@/types";
import uuid from "react-uuid";

const useBoards = () => {
  const [boards, setBoards] = useState<Board[]>([]);

  // 로컬스토리지에서 boards 데이터를 가져옴
  useEffect(() => {
    const savedBoards = localStorage.getItem("boards");
    if (savedBoards) {
      setBoards(JSON.parse(savedBoards));
    }
  }, []);

  // boards 상태 변경 시 로컬스토리지에 저장
  useEffect(() => {
    if (boards.length > 0) {
      localStorage.setItem("boards", JSON.stringify(boards));
    }
  }, [boards]);

  // 보드 추가
  const addBoard = () => {
    const newBoard: Board = {
      id: uuid(),
      name: "New Board",
      tasks: [],
    };
    setBoards((prevBoards) => [...prevBoards, newBoard]);
  };

  // 보드 삭제
  const deleteBoard = (id: string) => {
    setBoards((prevBoards) => prevBoards.filter((board) => board.id !== id));
  };

  // 보드 제목 변경
  const changeBoardTitle = ({
    title,
    boardId,
  }: {
    title: string;
    boardId: string;
  }) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === boardId ? { ...board, name: title } : board
      )
    );
  };

  // Task 추가
  const addTask = (boardId: string) => {
    const newTask: Task = {
      id: uuid(),
      text: "New Task",
    };
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === boardId
          ? { ...board, tasks: [...board.tasks, newTask] }
          : board
      )
    );
  };

  // Task 삭제
  const deleteTask = (boardId: string, taskId: string) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              tasks: board.tasks.filter((task) => task.id !== taskId),
            }
          : board
      )
    );
  };
  // Task 수정
  const changeTaskTitle = (title: string, boardId: string, taskId: string) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              tasks: board.tasks.map((task) =>
                task.id === taskId ? { ...task, text: title } : task
              ),
            }
          : board
      )
    );
  };

  return {
    boards,
    addBoard,
    deleteBoard,
    changeBoardTitle,
    addTask,
    deleteTask,
    changeTaskTitle,
  };
};

export default useBoards;
