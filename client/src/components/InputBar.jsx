import React from 'react'
function InputBar({ answer, setAnswer, onSubmit }) {
  
  const onKeyDown = (e) => { if (e.key === "Enter") onSubmit(); };

  return (
    <div className="border-t border-green-700 pt-2 mt-2">
      <div className="flex items-center gap-2">
        <span className="press-start text-green-400">{">"}</span>
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="TYPE ANSWER..."
          className="flex-1 bg-transparent outline-none border-none text-green-300 press-start placeholder-green-700 text-[10px]"
        />
        <button
          onClick={onSubmit}
          disabled={!answer.trim()}
          className={`press-start text-[8px] border px-3 py-1 ${
            answer.trim()
              ? "border-green-500 bg-green-600 text-black"
              : "opacity-40 cursor-not-allowed border-green-800"
          }`}
        >
          ENTER
        </button>
      </div>
    </div>
  );
}

export default React.memo(InputBar);