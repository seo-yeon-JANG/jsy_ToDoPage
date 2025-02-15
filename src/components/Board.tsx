"use client";
import React from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import useBoards from "@/hooks/useBoards";
import SortableItem from "./SortableItem";
import BoardTitle from "./BoardTitle";
import Header from "./common/Header";
import Task from "./Task";

import handleDragEnd from "@/utils/handleDragEnd";

const Board: React.FC = () => {
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

  // 드래그 센서 설정
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px 이상 이동해야 드래그 시작
      },
    })
  );

  return (
    <div>
      <Header onAddBoard={addBoard} />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={(event) =>
          handleDragEnd(event, { boards, reorderBoards, reorderTasks })
        }
      >
        <SortableContext items={boards} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {boards.map((board) => (
              <SortableItem key={board.id} id={board.id}>
                <div
                  className="bg-blue-900 rounded-lg p-4 w-full flex flex-col"
                  style={{ cursor: "grab" }}
                >
                  <BoardTitle
                    boardId={board.id}
                    boardName={board.name}
                    onTitleChange={changeBoardTitle}
                    onDelete={deleteBoard}
                  />
                  <SortableContext
                    items={board.tasks}
                    strategy={verticalListSortingStrategy}
                  >
                    <Task
                      boardId={board.id}
                      tasks={board.tasks}
                      onDeleteTask={deleteTask}
                      onChangeTaskTitle={changeTaskTitle}
                    />
                  </SortableContext>
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
    </div>
  );
};

export default Board;
