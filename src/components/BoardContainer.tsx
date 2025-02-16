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
import { SortableContext, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import throttle from "lodash.throttle"
import Header from "./common/Header";
import useBoards from "@/hooks/useBoards";
import BoardItem from "./BoardItem";
import DragPreview from "./DragPreview";
import handleDragEnd from "@/utils/handleDragEnd";
import type { Board } from "@/types";

const areArraysEqual = (a: string[], b: string[]): boolean => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
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
    if (boards.find((b) => b.id === active.id)) {
      setActiveType("board");
    } else {
      setActiveType("task");
    }
  };

  const throttledHandleDragOver = useCallback(
    throttle((event: DragOverEvent) => {
      if (activeType !== "task") return;
      const { active, over } = event;
      if (!over) return;

      const fromBoard = boards.find((b) => b.tasks.some((t) => t.id === active.id));
      const toBoard = boards.find(
        (b) => b.id === over.id || b.tasks.some((t) => t.id === over.id)
      );
      if (!fromBoard || !toBoard) return;

      if (fromBoard.id === toBoard.id) {
        const tasks = [...fromBoard.tasks];
        const oldIndex = tasks.findIndex((t) => t.id === active.id);
        let newIndex = tasks.findIndex((t) => t.id === over.id);
        if (newIndex === -1) newIndex = tasks.length;
        if (oldIndex !== newIndex) {
          const reordered = arrayMove(tasks, oldIndex, newIndex);
          const newOrder = reordered.map((task) => task.id);
          const prevOrder = lastTaskOrderRef.current[fromBoard.id] || fromBoard.tasks.map((task) => task.id);
          if (!areArraysEqual(newOrder, prevOrder)) {
            lastTaskOrderRef.current[fromBoard.id] = newOrder;
            reorderTasks(fromBoard.id, reordered);
          }
        }
      } else {
        const fromTasks = [...fromBoard.tasks];
        const toTasks = [...toBoard.tasks];
        const activeIndex = fromTasks.findIndex((t) => t.id === active.id);
        if (activeIndex === -1) return;
        const activeTask = fromTasks[activeIndex];

        const newFromTasks = fromTasks.filter((t) => t.id !== active.id);

        let newIndex = toTasks.findIndex((t) => t.id === over.id);
        if (newIndex === -1) newIndex = toTasks.length;
        const newToTasks = [...toTasks];
        if (!toTasks.find((t) => t.id === active.id)) {
          newToTasks.splice(newIndex, 0, activeTask);
        }

        const prevFromOrder = lastTaskOrderRef.current[fromBoard.id] || fromBoard.tasks.map((t) => t.id);
        const newFromOrder = newFromTasks.map((t) => t.id);
        if (!areArraysEqual(prevFromOrder, newFromOrder)) {
          lastTaskOrderRef.current[fromBoard.id] = newFromOrder;
          reorderTasks(fromBoard.id, newFromTasks);
        }

        const prevToOrder = lastTaskOrderRef.current[toBoard.id] || toBoard.tasks.map((t) => t.id);
        const newToOrder = newToTasks.map((t) => t.id);
        if (!areArraysEqual(prevToOrder, newToOrder)) {
          lastTaskOrderRef.current[toBoard.id] = newToOrder;
          reorderTasks(toBoard.id, newToTasks);
        }
      }
    }, 100),
    [activeType, boards, reorderTasks]
  );

  const handleDragEndWrapper = (event: DragEndEvent) => {
    handleDragEnd(event, { boards, reorderBoards, reorderTasks });
    setActiveId(null);
    setActiveType(null);
  };

  const handleDragCancel = (_event: DragCancelEvent) => {
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
        {
          <DragOverlay>
            <DragPreview activeType={activeType} activeId={activeId} boards={boards} />
          </DragOverlay>
        }
      </DndContext>
    </div>
  );
};

export default BoardManager;
