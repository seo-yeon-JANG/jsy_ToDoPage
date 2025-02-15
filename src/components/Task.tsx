import Button from "./common/Button";
import type { Task } from "@/types";
const Task = ({
  boardId,
  tasks,
  onDeleteTask,
  onChangeTaskTitle,
}: {
  boardId: string;
  tasks: Task[];
  onDeleteTask: (boardId: string, taskId: string) => void;
  onChangeTaskTitle: (
    e: React.ChangeEvent<HTMLInputElement>,
    boardId: string,
    taskId: string
  ) => void;
}) => {
  return (
    <div className="mt-4 text-white flex-grow">
      <ul>
        {tasks.map((task: Task) => (
          <li
            key={task.id}
            className="bg-white rounded-lg p-4 text-black flex place-content-between content-center mt-1"
            onChange={(e) => onChangeTaskTitle(e, boardId, task.id)} // 수정된 부분
          >
            <input value={task.text} onChange={() => {}} />
            <Button onClick={() => onDeleteTask(boardId, task.id)}>-</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Task;
