import React from "react";
import type { stateProp } from "~/playPage/playPage";

type GameStateProps = {
  gameState: stateProp;
  timeLeft?: number;
  index?: number;
  problem?: string[];
};

export const GameStateDisplay: React.FC<GameStateProps> = ({
  gameState,
  timeLeft = 3,
  index = 0,
  problem = [],
}) => {
  const renderContent = () => {
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
      default:
        return null;
    }
  };

  return renderContent(); 
};
