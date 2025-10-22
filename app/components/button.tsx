interface ButtonProps {
  displayText: string;
  onClick?: () => void;
}
export const NormalButton: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      onClick={props.onClick}
    >
      {props.displayText}
    </button>
  );
};
