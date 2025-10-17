import { useEffect, useState } from "react";
import socketService from "../socket";

export default function useQuiz(scene) {
  const [question, setQuestion] = useState({ id: 0, question: "" });
  const [leaderboard,setLeaderboard] = useState({
    leaderboard:[],
    rank:null,
    
  });
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [toast, setToast] = useState(null);
  const [earnedXP, setEarnedXP] = useState(0);

  const getQuestion = () => {
    socketService.send("getQuestion");
  };

  const submitAnswer = (answer, id, timeLeft) => {
  
    socketService.send("Answer", { answer, id, timeLeft });
  };
  const submitScore = (score,username)=>{
    socketService.send("submitScore",{username,score});
  }

  const getLeaderboard = (page,username)=>{
    socketService.send('getLeaderboard',{page,username})
  }
  

  useEffect(() => {
    if (scene !== "game" && scene !== 'leaderboard') return;
    
    socketService.connect();

    socketService.addListener("question", (data) => {
      setQuestion(data);
      setToast(null);
    });

    
    socketService.addListener("checkAnswer", (data) => {
      const { isCorrect, earned, streak: newStreak, score: newScore } = data;
      if (isCorrect) {
        setScore(newScore);
        setStreak(newStreak);
        setEarnedXP(earned);
        setToast("Correct");
        setTimeout(() => setToast(null), 1200);
      } else {
        setStreak(0);
        setToast("WRONG");
        setTimeout(() => setToast(null), 1200);
      }
    });
    
    socketService.addListener('getLeaderboard', (data)=>{
    setLeaderboard(data);
    
    })
    return () => {
      socketService.removeListener("question");
      socketService.removeListener("checkAnswer");
        socketService.removeListener("getLeaderboard");
    };
  }, [scene]);

  return {
    question,
    score,
    streak,
    earnedXP,
    toast,
    leaderboard,
    setToast,
    getQuestion,
    submitAnswer,
    submitScore,
    setScore,
    getLeaderboard
  };
}
