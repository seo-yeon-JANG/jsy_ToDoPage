interface BunttonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ children, onClick, ...styleProps }: BunttonProps) => {
  return (
    <button
      {...styleProps}
      onClick={onClick}
      className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-slate-500 text-white"
    >
      {children}
    </button>
  );
};
export default Button;
