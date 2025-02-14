import Button from "./common/Button";
import type { Task } from "@/types";
const Task = ({ tasks }: { tasks: Task[] }) => {
  console.log(tasks);
  return (
    // 할 일 이동
    // 할 일 삭제
    // 할 일 밑줄
    <ul>
      {tasks.map((task) => (
        <li
          key={task.id}
          className="bg-white rounded-lg p-4 text-black flex place-content-between content-center mt-1"
        >
          <input value={task.text} onChange={() => {}} />
          <Button>-</Button>
        </li>
      ))}
    </ul>
  );
};
export default Task;
