import { getUserName } from "~/utils/getUserName";

export default function EditPost() {
  return (
    <label>
      ランキングに表示する名前を設定してください
      <textarea
        name="postContent"
        defaultValue={getUserName("userName","名無しさん")}
        className="bg-gray-100 "
        rows={1}
        cols={40}
      />
    </label>
  );
}
