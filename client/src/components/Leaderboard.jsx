import { useEffect, useState } from "react";

export default function Leaderboard({ leaderboard = {}, getLeaderboard, username, goToLobby }) {
  const [page, setPage] = useState(0);
  const [noMoreRanks, setNoMoreRanks] = useState(false);
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    if (leaderboard.rank !== undefined && leaderboard.rank !== null) {
      setUserRank(leaderboard.rank);
    }
  }, [leaderboard.rank]);

  useEffect(() => {
    getLeaderboard(page, username);
  }, [page]);

  useEffect(() => {
    if (leaderboard.leaderboard.length === 0 && page > 0) {
      setNoMoreRanks(true);
    } else {
      setNoMoreRanks(false);
    }
  }, [leaderboard.leaderboard, page]);

  const handleNext = () => {
    if (!noMoreRanks) setPage((p) => p + 1);
  };

  const handlePrev = () => {
    setPage((p) => Math.max(p - 1, 0));
  };

  return (
    <div className="relative p-5 border-2 border-green-600 rounded-lg bg-black/90 w-[90%] sm:w-[70%] lg:w-[50%] text-green-300 press-start text-[9px] shadow-[0_0_25px_rgba(0,255,0,0.4)] overflow-hidden">
      <h2 className="text-green-400 text-center text-[11px] mb-4 tracking-widest border-b border-green-700 pb-2">
        🕹️ LEADERBOARD — PAGE {page + 1} 🕹️
      </h2>

      {leaderboard.leaderboard.length > 0 ? (
        <>
          <div className="flex justify-between border-b border-green-800 pb-1 mb-2 text-green-400 text-[8px]">
            <span>RANK</span>
            <span>PLAYER</span>
            <span>SCORE</span>
          </div>

          <div className="overflow-y-auto max-h-[45vh] space-y-[2px] scrollbar-thin scrollbar-thumb-green-500/40 hover:scrollbar-thumb-green-500/60 scrollbar-track-transparent">
            {leaderboard.leaderboard.map((item, idx) => (
              <div
                key={idx}
                className={`flex justify-between items-center border-b border-green-800 py-[4px] px-2 rounded transition-all duration-150 ${
                  item.username?.toLowerCase() === username?.toLowerCase()
                    ? "text-yellow-300 animate-pulse shadow-[0_0_15px_rgba(255,255,0,0.6)]"
                    : idx < 3
                    ? "text-yellow-200"
                    : "text-green-300"
                }`}
              >
                <span>#{item?.rank}</span>
                <span className="truncate max-w-[50%] text-center">{item?.username}</span>
                <span>{item?.score}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center mt-6 text-green-400 animate-pulse">
          {noMoreRanks ? "🚫 No more ranks to display." : "Loading leaderboard..."}
        </div>
      )}

      <div className="flex justify-between items-center mt-4 text-green-400 text-[8px]">
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className={`border border-green-600 px-3 py-1 rounded hover:bg-green-800/30 transition-all ${
            page === 0 ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          ◁ PREV
        </button>

        <button
          onClick={handleNext}
          disabled={noMoreRanks}
          className={`border border-green-600 px-3 py-1 rounded transition-all ${
            noMoreRanks
              ? "opacity-40 cursor-not-allowed text-red-400 border-red-500"
              : "hover:bg-green-800/30"
          }`}
        >
          {noMoreRanks ? "NO MORE RANKS" : "NEXT ▷"}
        </button>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={goToLobby}
          className="border border-green-600 text-green-400 px-4 py-1 rounded hover:bg-green-800/40 transition-all text-[8px]"
        >
          ◁ BACK TO LOBBY
        </button>
      </div>

      {userRank && (
        <div className="mt-4 p-2 border-t border-green-700 text-center text-green-400 relative animate-pulse">
          <p className="text-[8px] mb-1 opacity-70">YOUR POSITION</p>
          <div className="flex justify-center items-center gap-4">
            <p className="text-yellow-300 text-[11px] [text-shadow:_0_0_8px_rgba(255,255,0,0.8),_0_0_20px_rgba(255,255,0,0.5)]">
              #{userRank}
            </p>
            <p className="text-green-300">{username}</p>
          </div>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-green-500/20 animate-pulse" />
    </div>
  );
}
