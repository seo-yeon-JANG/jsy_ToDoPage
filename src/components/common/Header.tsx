"use client";
import Button from "@/components/common/Button";

const Header = ({ onAddBoard }: { onAddBoard: () => void }) => {
  return (
    <div className="flex gap-3 m-3">
      <h1 className="text-5xl">To-Do Boards</h1>
      <Button onClick={onAddBoard}>New Board</Button>
    </div>
  );
};
export default Header;
