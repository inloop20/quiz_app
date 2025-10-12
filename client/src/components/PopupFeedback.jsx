export default function PopupFeedback({ toast, streak, showXP, earnedXP }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-start pointer-events-none top-8 gap-1 z-40">
      {toast && (toast.includes("WRONG") || toast.includes("TIME UP")) && (
        <div className={`text-[12px] sm:text-[14px] px-3 py-1 border rounded-sm press-start ${
          toast.includes("WRONG")
            ? "border-red-400 text-red-400 shadow-[0_0_6px_#ff5555]"
            : "border-yellow-300 text-yellow-300 shadow-[0_0_6px_#ffff55]"
        } bg-black/70 animate-pop-up`}>
          {toast}
        </div>
      )}

      {streak > 1 && (
        <div className="text-[12px] sm:text-[14px] px-3 py-1 border border-yellow-300 text-yellow-300 rounded-sm press-start bg-black/70 shadow-[0_0_6px_#ffff00] animate-pop-up">
          🔥 {streak}x STREAK!
        </div>
      )}

      {showXP && (
        <div className="text-[12px] sm:text-[14px] px-3 py-1 border border-green-400 text-green-400 rounded-sm press-start bg-black/70 shadow-[0_0_6px_#00ff55] animate-pop-up">
          +{earnedXP} XP
        </div>
      )}
    </div>
  );
}
