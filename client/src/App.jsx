import React, { useEffect, useState, useCallback } from "react";
import BootScreen from "./components/BootScreen";
import TransitionScreen from "./components/TransitionScreen";
import useCountdown from "./hooks/useCountdown";
import useQuiz from "./hooks/useQuiz";
import StartMenu from "./components/StartMenu";
import ResultsScreen from "./components/ResultScreen";
import GameScene from "./components/GameScene";
import Leaderboard from "./components/Leaderboard";

export default function App() {
  const [scene, setScene] = useState("menu");
  const [bootStep, setBootStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [questionCount, setQuestionCount] = useState(1);
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });

  const {
    question,
    score,
    streak,
    earnedXP,
    toast,
    setToast,
    getQuestion,
    submitAnswer,
    submitScore,
    setScore,
    leaderboard,
    getLeaderboard,
  } = useQuiz(scene);

  const { seconds, start, stop, reset } = useCountdown(10, () => {
    if (questionCount >= 3) {
      submitScore(score, username);
      setScene("results");
      setAnswer("");
      setQuestionCount(1);
    } else {
      submitAnswer(" ", question.id, 0);
      setToast("TIME UP");
      setQuestionCount((prev) => prev + 1);
      setTimeout(() => {
        getQuestion();
        setToast(null);
      }, 2000);
    }
  });

  useEffect(() => {
    if (scene !== "boot") return;
    let t1, t2;
    if (bootStep < 4) {
      t1 = setTimeout(() => setBootStep((s) => s + 1), 600);
    } else {
      t2 = setTimeout(() => setScene("transition"), 800);
    }
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [scene, bootStep]);

  useEffect(() => {
    if (scene !== "transition") return;
    const t = setTimeout(() => setScene("game"), 700);
    return () => clearTimeout(t);
  }, [scene]);

  useEffect(() => {
    if (scene !== "game") return;
    getQuestion();
  }, [scene]);

  useEffect(() => {
    if (scene !== "game") return;
    reset(10);
    start();
  }, [question]);

  const handleAnswer = useCallback(() => {
    submitAnswer(answer, question.id, seconds);
    stop();
    setAnswer("");
    if (questionCount >= 3) {
      submitScore(score, username);
      setScene("results");
      setQuestionCount(1);
    } else {
      setQuestionCount((prev) => prev + 1);
      setTimeout(() => {
        getQuestion();
      }, 1000);
    }
  }, [answer, question.id, questionCount, score, username]);

  const handleUsernameChange = (name) => {
    setUsername(name);
    localStorage.setItem("username", name);
  };

  return (
    <div className="min-h-screen bg-black text-green-300 font-mono relative flex items-center justify-center overflow-hidden select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        .press-start { font-family: 'Press Start 2P', monospace; }
        .scanlines { background-image: repeating-linear-gradient(rgba(0,255,0,0.06) 0 2px, transparent 2px 6px); background-size: 100% 6px; animation: scan 2s linear infinite; }
        @keyframes scan { from { background-position: 0 0; } to { background-position: 0 6px; } }
        .crt { box-shadow: inset 0 0 40px rgba(0,255,50,0.15), 0 0 60px rgba(0,255,80,0.1); border-radius: 12px; }
        .vignette { box-shadow: inset 0 0 180px rgba(0,0,0,0.8); }
        .flicker { animation: flicker 2.8s infinite; }
        @keyframes flicker { 0%,19%,21%,23%,25%,54%,56%,100%{opacity:1;} 20%,24%,55%{opacity:0.7;} }
        @keyframes popUp { 0% { transform: translateY(0) scale(0.8); opacity:0; } 30% { transform: translateY(-8px) scale(1.05); opacity:1; } 60% { transform: translateY(-14px) scale(1); opacity:1; } 100% { transform: translateY(-24px) scale(1); opacity:0; } }
        .animate-pop-up { animation: popUp 1.2s ease-out forwards; }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-b from-[#010f05] via-[#041b0a] to-black"></div>
      <div className="absolute inset-0 scanlines vignette"></div>

      {scene === "results" && (
        <ResultsScreen
          score={score}
          onViewLeaderboard={() => setScene("leaderboard")}
          onRestart={() => {
            setBootStep(0);
            setScore(0);
            setScene("boot");
          }}
          onLobby={() => setScene("menu")}
        />
      )}

      {scene === "menu" && (
        <StartMenu
          username={username}
          setUsername={handleUsernameChange}
          onStartGame={() => setScene("boot")}
          onViewLeaderboard={() => setScene("leaderboard")}
        />
      )}

      {scene === "boot" && <BootScreen bootStep={bootStep} />}
      {scene === "transition" && <TransitionScreen />}

      {scene === "game" && (
        <GameScene
          score={score}
          streak={streak}
          seconds={seconds}
          question={question}
          answer={answer}
          setAnswer={setAnswer}
          handleAnswer={handleAnswer}
          toast={toast}
          earnedXP={earnedXP}
        />
      )}

      {scene === "leaderboard" && (
        <Leaderboard
          goToLobby={() => setScene("menu")}
          getLeaderboard={getLeaderboard}
          username={username}
          leaderboard={leaderboard}
        />
      )}
    </div>
  );
}
