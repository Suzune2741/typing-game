import type { Dispatch, FormEvent, SetStateAction } from "react";
import Modal from "react-modal";
import EditPost from "../EditPost";

const SetNameModal = ({
  modalIsOpen,
  setIsOpen,
}: {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    console.log(formJson.postContent);

    const newUserName = formJson.postContent as string;
    if (newUserName) {
      localStorage.setItem("userName", newUserName);
    }

    setIsOpen(false);
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white rounded-xl shadow-2xl max-w-lg w-full"
      >
        <div className="text-gray-950 flex flex-col justify-center items-center gap-3">
          <div className="text-2xl">ユーザー名変更</div>
          <form method="post" onSubmit={handleSubmit}>
            <EditPost />
            <button
              type="submit"
              className="bg-orange-400 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-full ml-auto"
            >
              決定
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default SetNameModal;
