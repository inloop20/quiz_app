import React, { useState } from "react";

export default function StartMenu({
  username,
  setUsername,
  onStartGame,
  onViewLeaderboard,
}) {
  const [editing, setEditing] = useState(!username); 

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setEditing(false);
    }
  };

  return (
    <div className="w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] p-6 border-2 border-green-600 rounded-lg crt bg-black/80 flicker flex flex-col items-center justify-center gap-6">
      <h1 className="text-green-400 press-start text-[16px] sm:text-[18px] text-center">
        PIXEL QUIZ v2
      </h1>

      {editing ? (
        <form onSubmit={handleNameSubmit} className="w-full flex flex-col gap-3">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full py-3 text-green-100 bg-black border-2 border-green-400 rounded-lg px-4 press-start text-xs outline-none"
          />
          <button
            type="submit"
            disabled={!username.trim()}
            className="w-full py-2 bg-green-800 text-white rounded press-start disabled:opacity-50"
          >
            Save Name
          </button>
        </form>
      ) : (
        <div className="text-center flex flex-col gap-2">
          <p className="text-green-300 press-start text-sm">Welcome, {username}!</p>
          <button
            onClick={() => setEditing(true)}
            className="text-green-400 underline text-xs"
          >
            Not you? Change name
          </button>
        </div>
      )}

      <button
        onClick={onStartGame}
        disabled={!username.trim()}
        className="w-full py-3 text-green-200 border-2 border-green-400 rounded-lg hover:bg-green-900 hover:text-green-50 press-start transition disabled:opacity-50"
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
