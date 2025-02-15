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
}) => {
  return (
    <div className="mt-4 text-white flex-grow">
      <ul>
        {tasks.map((task: Task) => (
          <li
            key={task.id}
            className="bg-white rounded-lg p-4 text-black flex place-content-between content-center mt-1"
          >
            <input
              value={task.text}
              onChange={(e) =>
                onChangeTaskTitle({
                  title: e.target.value,
                  boardId,
                  taskId: task.id,
                })
              }
            />
            <Button onClick={() => onDeleteTask({ boardId, taskId: task.id })}>
              -
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Task;
