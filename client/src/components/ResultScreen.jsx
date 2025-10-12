export default function ResultsScreen({ score, onRestart,onViewLeaderboard,onLobby }) {
  return (
    <div className="p-6 border-2 border-green-600 rounded-lg crt bg-black/80 w-[90%] sm:w-[60%] flicker text-green-300 press-start text-[10px]">
      <h2 className="text-green-400 mb-4">Game Over</h2>
      <div>Score: {score}</div>
      <button 
        className="mt-4 mr-4 border-2 border-green-600 px-4 py-2 rounded hover:bg-green-600/20"
        onClick={onRestart}
      >
        Restart Game
      </button>
       <button 
        className="mt-4 border-2 border-green-600 px-4 py-2 rounded hover:bg-green-600/20"
        onClick={onViewLeaderboard}
      >
        View Leaderboard
      </button>
       <button 
        className="mt-4 border-2 border-green-600 px-4 py-2 rounded hover:bg-green-600/20"
        onClick={onLobby}
      >
        Lobby
      </button>
    </div>
  );
}
