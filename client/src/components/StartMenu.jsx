import React from "react";

export default function StartMenu({ onStartGame, onViewLeaderboard }) {
  return (
    <div className="w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] p-6 border-2 border-green-600 rounded-lg crt bg-black/80 flicker flex flex-col items-center justify-center gap-6">
      <h1 className="text-green-400 press-start text-[16px] sm:text-[18px] text-center">
        PIXEL QUIZ v2
      </h1>

      <button
        onClick={onStartGame}
        className="w-full py-3 text-green-200 border-2 border-green-400 rounded-lg hover:bg-green-900 hover:text-green-50 press-start transition"
      >
        START GAME
      </button>

      <button
        onClick={onViewLeaderboard}
        className="w-full py-3 text-green-200 border-2 border-green-400 rounded-lg hover:bg-green-900 hover:text-green-50 press-start transition"
      >
        VIEW LEADERBOARD
      </button>
    </div>
  );
}
