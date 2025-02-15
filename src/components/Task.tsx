"use client";

import React from "react";
import Button from "@/components/common/Button";
import { Task as TaskType } from "@/types";
import SortableItem from "./SortableItem";

interface TaskProps {
  boardId: string;
  tasks: TaskType[];
  onDeleteTask: ({
    boardId,
    taskId,
  }: {
    boardId: string;
    taskId: string;
  }) => void;
  onChangeTaskTitle: ({
    title,
    boardId,
    taskId,
  }: {
    title: string;
    boardId: string;
    taskId: string;
  }) => void;
}

const Task: React.FC<TaskProps> = ({
  boardId,
  tasks,
  onDeleteTask,
  onChangeTaskTitle,
}) => {
  return (
    <div className="mt-4 text-white flex-grow">
      <ul>
        {tasks.map((task) => (
          <SortableItem key={task.id} id={task.id}>
            <li className="bg-white rounded-lg p-4 text-black flex place-content-between content-center mt-1">
              <input
                className="w-full text-ellipsis"
                value={task.text}
                onChange={(e) =>
                  onChangeTaskTitle({
                    title: e.target.value,
                    boardId,
                    taskId: task.id,
                  })
                }
              />
              <Button
                onClick={() => onDeleteTask({ boardId, taskId: task.id })}
              >
                -
              </Button>
            </li>
          </SortableItem>
        ))}
      </ul>
    </div>
  );
};

export default Task;
