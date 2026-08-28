'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

const words = [
  'AI Solutions Architect',
  'Full-Stack AI Developer',
  'Backend AI Engineer',
  'Next.js & AI Specialist',
  'Scalable Systems Architect',
];

const GLYPHS = '0123456789ABCDEF01';

function RotatingText() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState(words[0]);
  const animFrameRef = useRef<number | null>(null);

  const scrambleTo = useCallback((targetWord: string) => {
    let iteration = 0;
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const step = () => {
      iteration += 0.55;
      const scrambled = targetWord
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < iteration) {
            return targetWord[i];
          }
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');

      setDisplayText(scrambled);

      if (iteration < targetWord.length) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setDisplayText(targetWord);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => {
        const nextIndex = (prev + 1) % words.length;
        scrambleTo(words[nextIndex]);
        return nextIndex;
      });
    }, 3200);

    return () => {
      clearInterval(timer);
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [scrambleTo]);

  return (
    <span
      className="inline-flex items-center justify-center w-[280px] sm:w-[325px] md:w-[340px] h-[34px] sm:h-[38px] px-2 rounded-lg bg-cyan-950/60 border border-cyan-500/35 text-cyan-300 font-bold tracking-wide shadow-[0_0_15px_rgba(6,182,212,0.18)] align-middle mx-1 select-none shrink-0"
      style={{
        fontFamily: 'var(--font-orbitron), monospace, sans-serif',
      }}
    >
      <span className="bg-linear-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(34,211,238,0.6)] text-xs sm:text-sm md:text-[15px] font-bold text-center truncate">
        {displayText}
      </span>
      {/* Blinking Cyber Terminal Cursor */}
      <span className="inline-block w-1.5 sm:w-2 h-3.5 sm:h-4 ml-1.5 bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.9)] align-middle shrink-0" />
    </span>
  );
}

export default RotatingText;
