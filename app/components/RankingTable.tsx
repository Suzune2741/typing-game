import type { ResultDataProp } from "~/pages/RankingPage";

export const RankingTable = ({
  rankingData,
  gameMode,
}: {
  rankingData: ResultDataProp[];
  gameMode: string;
}) => {
  const normalModeHead: string[] = [
    "順位",
    "名前",
    "クリアタイム",
    "ミスタイプ数",
    "難易度",
  ];
  const timeAttackModeHead: string[] = [
    "順位",
    "名前",
    "スコア",
    "ミスタイプ数",
  ];
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {gameMode === "normal"
              ? normalModeHead.map((element, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {element}
                  </th>
                ))
              : timeAttackModeHead.map((element, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {element}
                  </th>
                ))}
          </tr>
        </thead>
        <tbody>
          {gameMode === "normal"
            ? rankingData.map((element, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-gray-900 whitespace-nowrap dark:text-white">
                  <th className=" px-6 py-4">{index + 1}</th>
                  <th key={index} className="px-6 py-4 ">
                    {element.name}
                  </th>
                  <td className="px-6 py-4">{element.endTime}</td>
                  <td className="px-6 py-4">{element.missType}</td>
                  <td className="px-6 py-4">{element.difficulty}</td>
                </tr>
              ))
            : rankingData.map((element, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-gray-900 whitespace-nowrap dark:text-white">
                  <th className=" px-6 py-4">{index + 1}</th>
                  <th key={index} className="px-6 py-4 ">
                    {element.name}
                  </th>
                  <td className="px-6 py-4">{element.score}</td>
                  <td className="px-6 py-4">{element.missType}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};
