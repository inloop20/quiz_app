export default function QuestionBox({ displayedText, question }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-green-200 text-[10px] press-start text-center leading-relaxed px-2">
        <span className="text-green-500">SYSTEM:</span>{" "}
        {displayedText || (question.question ? "..." : "waiting for question...")}
      </div>
    </div>
  );
}
