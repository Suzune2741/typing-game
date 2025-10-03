import firebase from "firebase/compat/app";
import "firebase/compat/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { stateProp } from "~/pages/PlayPage";
import { getDifficulty } from "~/utils/getDifficulty";
import { getUserName } from "~/utils/getUserName";

type GameStateProps = {
  gameState: stateProp;
  timeLeft?: number;
  index?: number;
  missType?: number;
  problem?: string[];
  endTime: number;
};

export const GameStateDisplay: React.FC<GameStateProps> = ({
  gameState,
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
          missType: missType,
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
      case "ready":
        return (
          <div className="space-y-5">
            <div className="text-2xl">Typing Game</div>
            <div className="text-xl">スペースキーで開始</div>
          </div>
        );
      case "result":
        return (
          <div className="space-y-5">
            <div className="text-2xl">結果</div>
            <div className="text-xl">ミスタイプ数:{missType}</div>
            <div className="text-xl">時間:{endTime}</div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() =>
                navigate("/", { state: { difficulty: difficulty } })
              }
            >
              戻る
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return renderContent();
};
