import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { GameStateDisplay } from "~/components/GameStateDisplay";
import { getDifficulty } from "~/utils/getDifficulty";

export type stateProp = "ready" | "countDown" | "play" | "result";

export function PlayPage() {
  const [gameState, setGameState] = useState<stateProp>("ready");
  const [problem, setProblem] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [missType, setMissType] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(3);

  const difficulty = getDifficulty();
  const charNum = difficulty === "easy" ? 10 : 50;

  
  const generateRandomString = (): string => {
    const str = Math.random().toString(36).substring(2).slice(-charNum);
    return str.length < charNum ? str + "a".repeat(charNum - str.length) : str;
  };

  useEffect(() => {
    if (gameState !== "countDown") return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState("play");
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
      if (gameState === "play" && problem && event.key === problem[index]) {
        setIndex(index + 1);
        if (index === charNum - 1) {
          setGameState("result");
        }
      } else {
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
      />
    </div>
  );
}
