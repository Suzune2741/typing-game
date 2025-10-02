import { useState } from "react";
import { useNavigate } from "react-router";
import DifficultySelectionModal from "~/components/modals/NormalModal";

export function TopPage() {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<string>("easy");
  const navigate = useNavigate();
  const gameStart = () => {
    navigate("/play?dif=" + difficulty);
  };
  console.log(difficulty);

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
            onClick={() => setIsOpen(true)}
          >
            難易度変更
          </button>
        </div>
      </div>
      <DifficultySelectionModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />
    </div>
  );
}
