import { useEffect, useState } from "react";
import socketService from "../socket";

export default function useQuiz(scene) {
  const [question, setQuestion] = useState({ id: 0, question: "" });
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [toast, setToast] = useState(null);
  const [earnedXP, setEarnedXP] = useState(0);
  const [questionCount,setQuestionCount] = useState(0);

  const getQuestion = () => {
    console.log("Requesting question");
    socketService.send("getQuestion");
  };

  const submitAnswer = (answer, id, timeLeft) => {
  
    socketService.send("Answer", { answer, id, timeLeft });
  };

  useEffect(() => {
    if (scene !== "game") return;

    socketService.connect();

    socketService.addListener("question", (data) => {
      setQuestion(data);
      setToast(null);
      setQuestionCount(prev => prev+1);
    });


    socketService.addListener("checkAnswer", (data) => {
      const { isCorrect, earned, streak: newStreak, score: newScore } = data;
      if (isCorrect) {
        setScore(newScore);
        setStreak(newStreak);
        setEarnedXP(earned);
        setToast("✓ Correct");
        setTimeout(() => setToast(null), 1200);
      } else {
        setStreak(0);
        setToast("WRONG");
        setTimeout(() => setToast(null), 1200);
      }
    });

    return () => {
      socketService.removeListener("question");
      socketService.removeListener("checkAnswer");
    };
  }, [scene]);

  return {
    question,
    score,
    streak,
    earnedXP,
    toast,
    setToast,
    getQuestion,
    submitAnswer,
    questionCount
  };
}
