import { child, get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { NormalButton } from "~/components/button";
import { RankingTable } from "~/components/RankingTable";
export type ResultDataProp = {
  name: string;
  score: number;
  endTime: number;
  missType: number;
  difficulty: string;
};

export const RankingPage = () => {
  const database = getDatabase();
  const [results, setResults] = useState<ResultDataProp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dbRef = ref(database);
  const navigate = useNavigate();
  const [gameMode, setGameMode] = useState<string>("normal");
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const room = "result-" + gameMode;
        const snapshot = await get(child(dbRef, room));

        if (snapshot.exists()) {
          const resultsArray: ResultDataProp[] = [];

          snapshot.forEach((childSnapshot) => {
            const resultData = childSnapshot.val() as ResultDataProp;
            resultsArray.push(resultData);
          });
          setResults(resultsArray);
          const sortedResults = resultsArray.sort(
            (a, b) => a.endTime - b.endTime
          );
          setResults(sortedResults);

          console.log(resultsArray);
        } else {
          console.log("データが存在しません");
          setResults([]);
        }
      } catch (err) {
        console.error("データ取得エラー:", err);
        setError("データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [dbRef, gameMode]);

  if (loading) {
    return (
      <div className="pt-16 pb-4 flex justify-center">
        <div className="text-xl">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-16 pb-4 flex justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }
  return (
    <div className="pt-16 pb-4 flex justify-center">
      <div className="space-y-5">
        <div className="text-3xl place-self-center-safe">ランキング</div>
        <div className="flex justify-center   gap-3">
          <NormalButton
            displayText={"通常モード"}
            onClick={() => setGameMode("normal")}
          />
          <NormalButton
            displayText={"タイムアタックモード"}
            onClick={() => setGameMode("timeAttack")}
          />
        </div>
        <RankingTable rankingData={results} gameMode={gameMode} />
        <NormalButton
          displayText={"戻る"}
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
    </div>
  );
};
