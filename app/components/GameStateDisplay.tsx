import "firebase/compat/database";
import React, {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useNavigate } from "react-router";
import type { StateProp } from "~/pages/PlayPage";
import { getQueryParameter } from "~/utils/getQueryParameters";
import { getUserName } from "~/utils/getUserName";
import { NormalButton } from "./button";
import { getAuth, signInAnonymously, type User } from "firebase/auth";
import { getDatabase, push, ref } from "firebase/database";
type GameStateProps = {
  gameState: StateProp;
  gameMode: string;
  setGameState: Dispatch<SetStateAction<StateProp>>;
  timeLeft: number;
  index: number;
  missType: number;
  problem: string[];
  endTime: number;
};

export const GameStateDisplay: React.FC<GameStateProps> = ({
  gameState,
  gameMode,
  setGameState,
  timeLeft,
  index,
  missType,
  problem = [],
  endTime,
}) => {
  const [hasResultPosted, setHasResultPosted] = useState(false);
  const difficulty = getQueryParameter("dif", "easy");
  const userName = getUserName("userName", "名無しさん");
  const room = "result-" + gameMode;
  const [sendResult, setSendResult] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>();
  const auth = getAuth();

  const database = getDatabase();

  useEffect(() => {
    const saveResult = async () => {
      if (!sendResult || hasResultPosted) {
        return;
      }

      try {
        setCurrentUser(auth.currentUser);

        if (!currentUser) {
          console.log("ユーザー未認証のため、匿名サインインを実行します...");
          const userCredential = await signInAnonymously(auth);
          setCurrentUser(userCredential.user);
        }

        if (!currentUser) {
          throw new Error("ユーザー認証に失敗しました。");
        }

        const uid = currentUser.uid;

        if (gameMode === "normal") {
          const dataToSend = {
            uid: uid,
            name: userName,
            missType: missType,
            endTime: endTime,
            difficulty: difficulty,
            timestamp: new Date().toISOString(),
          };
          const roomRef = ref(database, room);
          await push(roomRef, dataToSend);
        } else if (gameMode === "timeAttack") {
          const dataToSend = {
            uid: uid,
            name: userName,
            missType: missType,
            score: index,
            timestamp: new Date().toISOString(),
          };
          const roomRef = ref(database, room);
          await push(roomRef, dataToSend);
        }

        setHasResultPosted(true);
        console.log("Result saved successfully.");
      } catch (error) {
        console.error("Failed to save result:", error);
      } finally {
        setSendResult(false);
      }
    };

    saveResult();
  }, [
    sendResult,
    hasResultPosted,
    room,
    gameMode,
    userName,
    endTime,
    missType,
    difficulty,
    index,
  ]);
  const renderContent = () => {
    const navigate = useNavigate();
    switch (gameState) {
      case "ready":
        return (
          <div className="flex flex-col items-center gap-5">
            <div className="text-3xl">Typing Game</div>

            {gameMode == "normal" ? (
              <div className="text-xl ">難易度 {difficulty.toUpperCase()}</div>
            ) : (
              <div className="text-xl ">タイムアタック</div>
            )}
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
            {gameMode === "timeAttack" && (
              <div className="text-5xl">残り時間:{timeLeft}</div>
            )}

            <span className="text-3xl flex justify-center">
              {problem.map((char, problemNum) => {
                return problemNum < index % 10 ? (
                  <span className="opacity-40">{char}</span>
                ) : (
                  <span>{char}</span>
                );
              })}
            </span>
          </div>
        );
      case "result":
        return (
          <div className="space-y-5">
            <div className="text-2xl">結果</div>
            <div className="text-xl">ミスタイプ数:{missType}</div>

            {gameMode === "normal" ? (
              <div className="text-xl">時間:{endTime}</div>
            ) : (
              <div className="text-xl">得点:{index + 1}</div>
            )}
            <div className="space-x-2">
              <NormalButton
                displayText="もう一回"
                onClick={() => {
                  setGameState("ready");
                  navigate("/play?dif=" + difficulty);
                }}
              />
              <NormalButton
                displayText="データをランキングに登録"
                onClick={() => {
                  setSendResult(true);
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
