"use client";
import React from "react";
import Task from "./Task";
import BoardTitle from "./BoardTitle";
import Header from "./common/Header";
import useBoards from "@/hooks/useBoards";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const Board: React.FC = () => {
  const {
    boards,
    addBoard,
    deleteBoard,
    changeBoardTitle,
    reorderBoards,
    addTask,
    deleteTask,
  } = useBoards();

  // 드래그 센서 설정
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px 이상 이동해야 드래그 시작
      },
    })
  );

  // 드래그 종료 후 처리
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = boards.findIndex((item) => item.id === active.id);
      const newIndex = boards.findIndex((item) => item.id === over.id);

      const newOrder = arrayMove(boards, oldIndex, newIndex);
      reorderBoards(newOrder);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Header onAddBoard={addBoard} />
      <SortableContext items={boards} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {boards.map((board) => (
            <SortableItem key={board.id} id={board.id}>
              <div
                className="bg-blue-900 rounded-lg p-4 w-full flex flex-col"
                style={{
                  cursor: "grab",
                }}
              >
                <BoardTitle
                  boardId={board.id}
                  boardName={board.name}
                  onTitleChange={changeBoardTitle}
                  onDelete={deleteBoard}
                />
                <Task
                  boardId={board.id}
                  tasks={board.tasks}
                  onDeleteTask={deleteTask}
                  onChangeTaskTitle={changeBoardTitle}
                />
                <div
                  className="mt-4 font-bold text-lg cursor-pointer"
                  onClick={() => addTask(board.id)}
                >
                  + Add a Card
                </div>
              </div>
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default Board;
