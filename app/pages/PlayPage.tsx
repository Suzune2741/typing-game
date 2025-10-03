import { useEffect, useState } from "react";
import { GameStateDisplay } from "~/components/GameStateDisplay";
import { getDifficulty } from "~/utils/getDifficulty";

export type stateProp = "ready" | "countDown" | "play" | "result";

export function PlayPage() {
  const [gameState, setGameState] = useState<stateProp>("ready");
  const [problem, setProblem] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [missType, setMissType] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(3);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const difficulty = getDifficulty();
  const charNum = difficulty === "easy" ? 10 : 50;

  const generateRandomString = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    return Array.from({ length: charNum }, () => {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      return characters.charAt(randomIndex);
    }).join("");
  };

  useEffect(() => {
    if (gameState !== "countDown") return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState("play");
          setStartTime(performance.now());
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (gameState === "ready" && event.code === "Space") {
        setProblem(generateRandomString().split(""));
        setTimeLeft(3);
        setGameState("countDown");
      }
      if (event.code === "Escape") {
        setGameState("ready");
        setIndex(0);
      }
      if (problem && event.key === problem[index]) {
        setIndex(index + 1);
        if (index === charNum - 1) {
          setEndTime(performance.now());
          setGameState("result");
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
        timeLeft={timeLeft}
        index={index}
        problem={problem}
        missType={missType}
        endTime={(Math.floor((endTime - startTime) * 100) / 100)/1000}
      />
    </div>
  );
}
