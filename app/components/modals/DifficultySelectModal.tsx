import type { Dispatch, SetStateAction } from "react";
import Modal from "react-modal";

const DifficultySelectModal = ({
  modalIsOpen,
  setIsOpen,
  difficulty,
  setDifficulty,
}: {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  difficulty: string;
  setDifficulty: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white rounded-xl shadow-2xl max-w-lg w-full"
      >
        <div className="text-gray-950 flex flex-col justify-center items-center gap-3">
          <div className="text-2xl">難易度変更</div>
          <div>現在の難易度は{difficulty.toUpperCase()}です</div>
          <div className="space-x-5">
            <button
              onClick={() => {
                setIsOpen((prev) => !prev);
                setDifficulty(difficulty === "easy" ? "hard" : "easy");
              }}
              className="bg-orange-400 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-full"
            >
              {difficulty === "easy" ? "難しくする" : "簡単にする"}
            </button>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="border-2 border-solid border-orange-400 hover:bg-amber-100 text-orange-400 font-bold py-2 px-4 rounded-full"
            >
              このまま
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DifficultySelectModal;
