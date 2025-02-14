import Board from "@/components/Board";
const Page = () => {
  return (
    <div>
      <h1>To-Do Boards</h1>
      <div className="grid grid-cols-5 gap-5">
        <Board />
      </div>
    </div>
  );
};

export default Page;
