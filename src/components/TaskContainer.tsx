import React from "react";
import { Task as TaskType } from "@/types";
import SortableItem from "./SortableItem";
import TaskItem from "./TaskItem";

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

const TaskContainer: React.FC<TaskProps> = ({
  tasks,
  boardId,
  onDeleteTask,
  onChangeTaskTitle,
}) => {

  return (
    <div className="mt-4 text-white flex-grow">
      <ul>
        {tasks.map((task) => (
          <SortableItem key={task.id} id={task.id}>
            <TaskItem
              value={task.text}
              onDeleteTask={()=>{
                onDeleteTask({ boardId, taskId:task.id});
              }}
              onChangeTaskTitle={(title:string) =>{
                onChangeTaskTitle({title, boardId, taskId:task.id});
              }}
            />
          </SortableItem>
        ))}
      </ul>
    </div>
  );
};
export default TaskContainer;
