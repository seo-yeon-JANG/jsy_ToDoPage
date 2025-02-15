// useBoards.ts
import { useState, useEffect } from "react";
import type { Board } from "@/types";
import type { Task } from "@/types";
import uuid from "react-uuid";

const useBoards = () => {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    const savedBoards = localStorage.getItem("boards");
    if (savedBoards) {
      setBoards(JSON.parse(savedBoards));
    }
  }, []);

  useEffect(() => {
    if (boards.length > 0) {
      localStorage.setItem("boards", JSON.stringify(boards));
    } else {
      localStorage.removeItem("boards");
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

  // 보드 순서 변경
  const reorderBoards = (newBoard: Board[]) => {
    setBoards(newBoard);
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
  const deleteTask = ({
    boardId,
    taskId,
  }: {
    boardId: string;
    taskId: string;
  }) => {
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
  const changeTaskTitle = ({
    title,
    boardId,
    taskId,
  }: {
    title: string;
    boardId: string;
    taskId: string;
  }) => {
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

  // task 순서 변경
  const reorderTasks = (boardId: string, newTasks: Task[]) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === boardId ? { ...board, tasks: [...newTasks] } : board
      )
    );
  };

  return {
    boards,
    addBoard,
    deleteBoard,
    changeBoardTitle,
    reorderBoards,
    addTask,
    deleteTask,
    changeTaskTitle,
    reorderTasks,
  };
};

export default useBoards;
