 import React from "react";
 function GameHUD({ score, streak, countdown }) {
  return (
    <div className="flex justify-between text-[10px] text-green-400 press-start">
      <div>★ SCORE: {score}</div>
      <div>⏳ {countdown}s</div>
      <div>STREAK: {streak}x</div>
    </div>
  );
}
export default React.memo(GameHUD);