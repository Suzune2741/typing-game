import firebase from "firebase/compat/app";
import "firebase/compat/database";
import React, {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useNavigate } from "react-router";
import type { StateProp } from "~/pages/PlayPage";
import { getDifficulty } from "~/utils/getDifficulty";
import { getUserName } from "~/utils/getUserName";
import { NormalButton } from "./button";

type GameStateProps = {
  gameState: StateProp;
  setGameState: Dispatch<SetStateAction<StateProp>>;
  timeLeft?: number;
  index?: number;
  missType?: number;
  problem?: string[];
  endTime: number;
};

export const GameStateDisplay: React.FC<GameStateProps> = ({
  gameState,
  setGameState,
  timeLeft = 3,
  index = 0,
  missType = 0,
  problem = [],
  endTime,
}) => {
  const [hasResultPosted, setHasResultPosted] = useState(false);
  const room = "results";
  const difficulty = getDifficulty();
  const userName = getUserName("userName", "名無しさん");
  useEffect(() => {
    if (gameState === "result" && firebase.apps.length && !hasResultPosted) {
      const database = firebase.database();

      database
        .ref(room)
        .push({
          name: userName,
          score: index,
          endTime: endTime,
          missType: missType,
          difficulty: difficulty,
          timestamp: new Date().toISOString(),
        })
        .then(() => {
          setHasResultPosted(true);
          console.log("Result saved successfully.");
        })
        .catch((error) => {
          console.error("Failed to save result:", error);
        });
    }
  }, [gameState]);

  const renderContent = () => {
    const navigate = useNavigate();
    switch (gameState) {
      case "ready":
        return (
          <div className="flex flex-col items-center gap-5">
            <div className="text-3xl">Typing Game</div>
            <div className="text-xl ">難易度 {difficulty.toUpperCase()}</div>
            <div className="text-xl animate-pulse">
              スペースキーを押してスタート
            </div>
            <NormalButton
              displayText="戻る"
              onClick={() =>
                navigate("/", { state: { difficulty: difficulty } })
              }
            />
          </div>
        );
      case "countDown":
        return (
          <div className="space-y-2">
            <div className="text-5xl">スタートまで</div>
            <div className="text-5xl flex justify-center">{timeLeft}</div>
          </div>
        );
      case "play":
        return (
          <div className="space-y-5">
            <div className="text-5xl">得点:{index}</div>
            <span className="text-3xl flex justify-center">
              {problem[index]}
            </span>
          </div>
        );
      case "result":
        return (
          <div className="space-y-5">
            <div className="text-2xl">結果</div>
            <div className="text-xl">ミスタイプ数:{missType}</div>
            <div className="text-xl">時間:{endTime}</div>
            <div className="space-x-2">
              <NormalButton
                displayText="もう一回"
                onClick={() => {
                  setGameState("ready");
                  navigate("/play?dif=" + difficulty);
                }}
              />
              <NormalButton
                displayText="ランキングへ"
                onClick={() => navigate("/ranking")}
              />
              <NormalButton
                displayText="戻る"
                onClick={() =>
                  navigate("/", { state: { difficulty: difficulty } })
                }
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return renderContent();
};
