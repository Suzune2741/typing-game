import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { NormalButton } from "~/components/button";

export function TopPage() {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState<string>("easy");

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.difficulty)
      setDifficulty(location.state.difficulty);
  }, [location]);

  return (
    <div className="pt-16 pb-4 flex justify-center">
      <div className="space-y-5">
        <div className="text-3xl place-self-center-safe">Typing Game</div>
        <div className="space-x-2">
          <NormalButton
            displayText="遊ぶ"
            onClick={() => navigate("/play?dif=" + difficulty)}
          />
          <NormalButton
            displayText="ランキング"
            onClick={() => navigate("/ranking")}
          />
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
