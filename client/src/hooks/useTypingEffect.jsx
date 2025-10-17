import { useState, useEffect, useRef } from "react";

export default function useTypingEffect(text, delay = 28) {
  const [displayed, setDisplayed] = useState("");
  const intervalRef = useRef(null);

  useEffect(() => {
    
    let i = 0;
    setDisplayed("");
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplayed(prev => prev + text[i++]);
      
      
      if (i >= text.length -1 ) clearInterval(intervalRef.current);
    }, delay);
    return () => clearInterval(intervalRef.current);
  }, [text, delay]);

  return displayed;
}
