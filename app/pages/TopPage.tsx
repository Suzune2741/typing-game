import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export function TopPage() {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState<string>("easy");

  const gameStart = () => {
    navigate("/play?dif=" + difficulty);
  };
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.difficulty)
      setDifficulty(location.state.difficulty);
  }, [location]);
  
  useEffect(() => {
    localStorage.setItem("userName", "名無しさん");
  }, []);
  return (
    <div className="pt-16 pb-4 flex justify-center">
      <div className="space-y-5">
        <div className="text-2xl place-self-center-safe">Typing Game</div>
        <div className="space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={gameStart}
          >
            遊ぶ
          </button>
          <button
            className="bg-orange-400 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-full"
            onClick={() =>
              navigate("/setting", { state: { difficulty: difficulty } })
            }
          >
            設定
          </button>
        </div>
      </div>
    </div>
  );
}
