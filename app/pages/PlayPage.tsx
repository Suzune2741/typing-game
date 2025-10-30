import { useEffect, useState } from "react";
import { GameStateDisplay } from "~/components/GameStateDisplay";
import { getQueryParameter } from "~/utils/getQueryParameters";

export type StateProp = "ready" | "countDown" | "play" | "result";

export function PlayPage() {
  const [gameState, setGameState] = useState<StateProp>("ready");
  const [problem, setProblem] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [missType, setMissType] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(3);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const gameMode = getQueryParameter("mode", "normal");
  const difficulty = getQueryParameter("dif", "easy");
  const charNum = gameMode == "timeAttack" || difficulty === "easy" ? 10 : 50;

  const generateRandomString = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    return Array.from({ length: charNum }, () => {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      return characters.charAt(randomIndex);
    }).join("");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (gameMode === "normal" && gameState === "countDown") {
            setGameState("play");
            setStartTime(performance.now());
          } else if (gameMode === "timeAttack" && gameState !== "countDown") {
            setGameState("result");
          } else if (gameState === "countDown") {
            setGameState("play");
            setTimeLeft(10);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState]);
  const initData = () => {
    setIndex(0);
    setMissType(0);
    setTimeLeft(3);
  };
  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (gameState === "ready" && event.code === "Space") {
        initData();
        setProblem(generateRandomString().split(""));
        setGameState("countDown");
      }
      if (event.code === "Escape") {
        setGameState("ready");
      }
      if (gameState === "play" && event.key === problem[index % 10]) {
        setIndex(index + 1);
        if (index === charNum - 1 && gameMode === "normal") {
          setEndTime(performance.now());
          setGameState("result");
        } else if ((index + 1) % charNum === 0 && gameMode === "timeAttack") {
          setProblem(generateRandomString().split(""));
        }
      } else if (gameState === "play") {
        setMissType(missType + 1);
      }
    };

    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [gameState, index, problem, missType]);
  return (
    <div className="pt-16 pb-4 flex justify-center">
      <GameStateDisplay
        gameState={gameState}
        gameMode={gameMode}
        setGameState={setGameState}
        timeLeft={timeLeft}
        index={index}
        problem={problem}
        missType={missType}
        endTime={Math.floor((endTime - startTime) * 100) / 100 / 1000}
      />
    </div>
  );
}
