export default function BootScreen({ bootStep }) {
  const lines = [
    "booting pixel-quiz v2...",
    "calibrating CRT shaders...",
    "syncing websocket feed...",
    "ready to roll."
  ];

  return (
    <div className="p-6 border-2 border-green-600 rounded-lg crt bg-black/80 w-[90%] sm:w-[60%] flicker">
      <div className="text-green-200 press-start text-[10px] leading-relaxed">
        <div className="mb-2 text-green-400">PIXEL QUIZ OS v2.0</div>
        {Array.from({ length: bootStep }).map((_, i) => (
          <div key={i}>[OK] {lines[i]}</div>
        ))}
        {bootStep < 4 && <div>[..] loading...</div>}
        <div className="mt-4 text-green-500 text-[8px]">Press N to skip boot</div>
      </div>
    </div>
  );
}
