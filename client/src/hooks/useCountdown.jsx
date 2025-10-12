import { useState, useRef, useEffect } from "react";

export default function useCountdown(initialSeconds = 10, onTimeUp) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  // Start countdown
  const start = () => {
    if (!isRunning) setIsRunning(true);
  };

  // Stop countdown
  const stop = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  // Reset countdown
  const reset = (newSeconds = initialSeconds) => {
    stop();
    setSeconds(newSeconds);
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);

            // Time's up callback
            if (onTimeUp) {
              onTimeUp();
            }

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, onTimeUp]);

  return { seconds, isRunning, start, stop, reset };
}
