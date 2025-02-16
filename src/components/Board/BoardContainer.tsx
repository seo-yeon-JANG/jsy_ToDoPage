"use client";
import React, { useState, useRef, useCallback } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  DragCancelEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import throttle from "lodash.throttle";
import Header from "../common/Header";
import useBoards from "@/hooks/useBoards";
import BoardItem from "./BoardItem";
import DragPreview from "../common/DragPreview";
import type { Board, Task } from "@/types";

const areArraysEqual = (a: string[], b: string[]): boolean =>
  a.length === b.length && a.every((el, idx) => el === b[idx]);

const handleBoardDragEnd = (
  activeId: string,
  overId: string,
  boards: Board[],
  reorderBoards: (newBoards: Board[]) => void
) => {
  const activeBoardIndex = boards.findIndex((b) => b.id === activeId);
  const overBoardIndex = boards.findIndex((b) => b.id === overId);
  if (activeBoardIndex !== -1 && overBoardIndex !== -1) {
    const newOrder = arrayMove(boards, activeBoardIndex, overBoardIndex);
    reorderBoards(newOrder);
  }
};

const handleTaskDragEnd = (
  activeId: string,
  overId: string,
  boards: Board[],
  reorderTasks: (boardId: string, newTasks: Task[]) => void
) => {
  const fromBoard = boards.find((b) =>
    b.tasks.some((task) => task.id === activeId)
  );
  const toBoard = boards.find(
    (b) => b.id === overId || b.tasks.some((task) => task.id === overId)
  );
  if (!fromBoard || !toBoard) return;

  const fromTasks = [...fromBoard.tasks];
  const toTasks = [...toBoard.tasks];

  const oldIndex = fromTasks.findIndex((t) => t.id === activeId);
  let newIndex = toTasks.findIndex((t) => t.id === overId);
  if (newIndex === -1) newIndex = toTasks.length;

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

const BoardManager: React.FC = () => {
  const {
    boards,
    addBoard,
    deleteBoard,
    changeBoardTitle,
    reorderBoards,
    addTask,
    deleteTask,
    changeTaskTitle,
    reorderTasks,
  } = useBoards();

  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<"board" | "task" | null>(null);
  const lastTaskOrderRef = useRef<{ [boardId: string]: string[] }>({});

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id.toString());
    setActiveType(boards.find((b) => b.id === active.id) ? "board" : "task");
  };

  const throttledHandleDragOver = useCallback(
    throttle((event: DragOverEvent) => {
      if (activeType !== "task") return;
      const { active, over } = event;
      if (!over) return;

      const fromBoard = boards.find((b) =>
        b.tasks.some((t) => t.id === active.id)
      );
      const toBoard = boards.find(
        (b) => b.id === over.id || b.tasks.some((t) => t.id === over.id)
      );
      if (!fromBoard || !toBoard) return;

      const tasks = [...fromBoard.tasks];
      const oldIndex = tasks.findIndex((t) => t.id === active.id);
      let newIndex = tasks.findIndex((t) => t.id === over.id);
      if (newIndex === -1) newIndex = tasks.length;

      if (oldIndex !== newIndex) {
        const reordered = arrayMove(tasks, oldIndex, newIndex);
        const newOrder = reordered.map((task) => task.id);
        const prevOrder =
          lastTaskOrderRef.current[fromBoard.id] ||
          fromBoard.tasks.map((task) => task.id);
        if (!areArraysEqual(newOrder, prevOrder)) {
          lastTaskOrderRef.current[fromBoard.id] = newOrder;
          reorderTasks(fromBoard.id, reordered);
        }
      }
    }, 100),
    [activeType, boards, reorderTasks]
  );

  const handleDragEndWrapper = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    if (activeType === "board") {
      handleBoardDragEnd(
        active.id.toString(),
        over.id.toString(),
        boards,
        reorderBoards
      );
    } else if (activeType === "task") {
      handleTaskDragEnd(
        active.id.toString(),
        over.id.toString(),
        boards,
        reorderTasks
      );
    }

    setActiveId(null);
    setActiveType(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setActiveType(null);
  };

  return (
    <div>
      <Header onAddBoard={addBoard} />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={throttledHandleDragOver}
        onDragEnd={handleDragEndWrapper}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={boards} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {boards.map((board) => (
              <BoardItem
                key={board.id}
                board={board}
                addTask={addTask}
                changeBoardTitle={changeBoardTitle}
                deleteBoard={deleteBoard}
                changeTaskTitle={changeTaskTitle}
                deleteTask={deleteTask}
              />
            ))}
          </div>
        </SortableContext>
        <DragOverlay>
          <DragPreview
            activeType={activeType}
            activeId={activeId}
            boards={boards}
          />
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default BoardManager;
