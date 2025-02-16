"use client";
import React from "react";
import Button from "@/components/common/Button";

interface TaskItemProps {
  value: string;
  onDeleteTask : () => void;
  onChangeTaskTitle : (title:string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ value ,onDeleteTask, onChangeTaskTitle }) => {
  return (
    <li className="bg-white rounded-lg p-4 text-black flex place-content-between content-center mt-1">
      <input
        className="w-full text-ellipsis"
        value={value}
        onChange={(e) =>{
          onChangeTaskTitle(e.target.value)
        }}
      />
      <Button onClick={onDeleteTask}>
        -
      </Button>
  </li>
  );
};

export default TaskItem;
