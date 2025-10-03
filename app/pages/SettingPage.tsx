import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import DifficultySelectModal from "~/components/modals/DifficultySelectModal";
import SetNameModal from "~/components/modals/setNameModal";
import { getUserName } from "~/utils/getUserName";

export const SettingPage = () => {
  const [openNameModal, setOpenNameModal] = useState<boolean>(false);
  const [openDifficultyModal, setOpenDifficultyModal] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<string>("easy");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setDifficulty(location.state.difficulty);
  }, [location]);
  console.log(localStorage.getItem("userName"));
  const userName = getUserName("userName", "名無しさん");

  return (
    <>
      <div className="text-3xl place-self-center-safe mb-5">設定</div>
      <div className="flex gap-5 justify-center mb-4">
        ユーザー名:{userName}
        <button onClick={() => setOpenNameModal(true)}>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white hover:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="flex justify-center space-x-3">
        <button
          className="bg-fuchsia-600 hover:bg-fuchsia-800 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => setOpenDifficultyModal(true)}
        >
          難易度変更
        </button>
        <button
          className="bg-orange-400 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => navigate("/", { state: { difficulty: difficulty } })}
        >
          戻る
        </button>
      </div>
      <DifficultySelectModal
        modalIsOpen={openDifficultyModal}
        setIsOpen={setOpenDifficultyModal}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />
      <SetNameModal modalIsOpen={openNameModal} setIsOpen={setOpenNameModal} />
    </>
  );
};
