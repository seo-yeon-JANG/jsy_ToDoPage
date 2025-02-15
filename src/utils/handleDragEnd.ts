import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import type { Board, Task } from "@/types";

interface HandleDragEndParams {
  boards: Board[];
  reorderBoards: (newBoards: Board[]) => void;
  reorderTasks: (boardId: string, newTasks: Task[]) => void;
}

const handleDragEnd = (
  event: DragEndEvent,
  { boards, reorderBoards, reorderTasks }: HandleDragEndParams
) => {
  const { active, over } = event;
  if (!over) return;
  if (active.id === over.id) return;

  const activeBoardIndex = boards.findIndex((b) => b.id === active.id);
  const overBoardIndex = boards.findIndex((b) => b.id === over.id);
  if (activeBoardIndex !== -1 && overBoardIndex !== -1) {
    const newOrder = arrayMove(boards, activeBoardIndex, overBoardIndex);
    reorderBoards(newOrder);
    return;
  }
  const fromBoard = boards.find((b) =>
    b.tasks.some((task) => task.id === active.id)
  );
  const toBoard = boards.find(
    (b) => b.id === over.id || b.tasks.some((task) => task.id === over.id)
  );

  if (!fromBoard || !toBoard) return;
  const fromTasks = [...fromBoard.tasks];
  const toTasks = [...toBoard.tasks];

  const oldIndex = fromTasks.findIndex((t) => t.id === active.id);

  let newIndex = toTasks.findIndex((t) => t.id === over.id);
  if (newIndex === -1) {
    newIndex = toTasks.length;
  }

  if (fromBoard.id === toBoard.id) {
    const reordered = arrayMove(fromTasks, oldIndex, newIndex);
    reorderTasks(fromBoard.id, reordered);
  } else {
    const [movedTask] = fromTasks.splice(oldIndex, 1);
    reorderTasks(fromBoard.id, fromTasks);

    toTasks.splice(newIndex, 0, movedTask);
    reorderTasks(toBoard.id, toTasks);
  }
};

export default handleDragEnd;
