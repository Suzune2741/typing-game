import type { ResultDataProp } from "~/pages/RankingPage";

export const RankingTable = ({
  rankingData,
}: {
  rankingData: ResultDataProp[];
}) => {
  const headValue: string[] = ["名前", "クリアタイム", "ミスタイプ数","難易度"];
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headValue.map((element, index) => (
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
          {rankingData.map((element, index) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                key={index}
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {element.name}
              </th>
              <td className="px-6 py-4">{element.endTime}</td>
              <td className="px-6 py-4">{element.missType}</td>
              <td className="px-6 py-4">{element.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
