import { useState, useEffect } from "react";

// --- MATRIX TEXT COMPONENT (New!) ---
// This component handles the "scramble" effect for the focus area
export const MatrixText = () => {
  const words = ["System Design", "AI Agents", "Scalable Architecture", "Real-time Ops"];
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [displayText, setDisplayText] = useState(words[0]);
  const [index, setIndex] = useState(0);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";

  useEffect(() => {
    let interval: any;
    let iteration = 0;
    
    // The "Scramble" Logic
    const scramble = () => {
      interval = setInterval(() => {
        setDisplayText(() => 
          currentWord
            .split("")
            .map((_letter, i) => {
              if (i < iteration) return currentWord[i];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= currentWord.length) { 
          clearInterval(interval);
        }
        
        iteration += 1 / 3; // Speed of decoding
      }, 30);
    };

    // Trigger scramble
    scramble();

    // Move to next word after 3 seconds
    const nextWordTimeout = setTimeout(() => {
      const nextIndex = (index + 1) % words.length;
      setIndex(nextIndex);
      setCurrentWord(words[nextIndex]);
      iteration = 0; // Reset for next scramble
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(nextWordTimeout);
    };
  }, [currentWord, index]);

  return (
    <span className="text-green-400 font-mono font-bold tracking-widest drop-shadow-[0_0_5px_rgba(34,197,94,0.8)]">
      {displayText}
    </span>
  );
};