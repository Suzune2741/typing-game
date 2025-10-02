import { useNavigate } from "react-router";

export function TopPage() {
  const navigate = useNavigate();
  const gameStart = () => {
    navigate("/play");
  };
  return (
    <div className="pt-16 pb-4 flex justify-center">
      <div className="space-y-5">
        <div className="text-2xl">Typing Game</div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={gameStart}
        >
          遊ぶ
        </button>
      </div>
    </div>
  );
}
