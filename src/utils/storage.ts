// utils/storage.ts
import { Board } from "../types";

const initialData: Board[] = [
  {
    id: "1",
    name: "Sample Board 1",
    tasks: [
      { id: "1", text: "Task 1" },
      { id: "2", text: "Task 2" },
    ],
  },
  {
    id: "2",
    name: "Sample Board 1",
    tasks: [
      { id: "1", text: "Task 1" },
      { id: "2", text: "Task 2" },
      { id: "3", text: "Task 1" },
      { id: "4", text: "Task 2" },
      { id: "5", text: "Task 1" },
      { id: "6", text: "Task 2" },
    ],
  },
  {
    id: "3",
    name: "Sample Board 1",
    tasks: [
      { id: "1", text: "Task 1" },
      { id: "2", text: "Task 2" },
    ],
  },
  {
    id: "4",
    name: "Sample Board 1",
    tasks: [
      { id: "1", text: "Task 1" },
      { id: "2", text: "Task 2" },
    ],
  },
  {
    id: "5",
    name: "Sample Board 1",
    tasks: [
      { id: "1", text: "Task 1" },
      { id: "2", text: "Task 2" },
    ],
  },
  {
    id: "6",
    name: "Sample Board 1",
    tasks: [
      { id: "1", text: "Task 1" },
      { id: "2", text: "Task 2" },
    ],
  },
];

export const getStoredData = (): Board[] => {
  const boards = localStorage.getItem("boards");
  if (boards) {
    return JSON.parse(boards);
  } else {
    // 처음 실행 시 초기 데이터를 저장
    localStorage.setItem("boards", JSON.stringify(initialData));
    return initialData;
  }
};

export const saveDataToStorage = (data: Board[]): void => {
  localStorage.setItem("boards", JSON.stringify(data));
};
