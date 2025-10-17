import React from "react";
import GameHUD from "./GameHUD";
import QuestionBox from "./QuestionBox";
import InputBar from "./InputBar";
import PopupFeedback from "./PopupFeedback";

function GameScene({
  score,
  streak,
  seconds,
  question,
  answer,
  setAnswer,
  handleAnswer,
  toast,
  earnedXP,
  questionCount
}) {
  return (
    <div className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] h-[80vh] border-2 border-green-600 rounded-lg bg-black/70 p-4 flex flex-col justify-between crt flicker">
      <GameHUD questionCount={questionCount} score={score} streak={streak} countdown={seconds} />
      <QuestionBox  question={question} />
      <InputBar answer={answer} setAnswer={setAnswer} onSubmit={handleAnswer} />
      <PopupFeedback toast={toast} streak={streak} earnedXP={earnedXP} />
    </div>
  );
}

export default React.memo(GameScene); 
