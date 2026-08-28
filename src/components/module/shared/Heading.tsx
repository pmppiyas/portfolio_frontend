'use client';

import { useInView } from '@/hooks/useInView';
import { useCallback, useEffect, useRef, useState } from 'react';

interface CustomHeadingProps {
  heading: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

// Clean cyber/hex glyphs (No messy slashes or broken punctuation)
const GLYPHS = '0123456789ABCDEF01';

const CustomHeading = ({
  heading,
  subtitle,
  badge,
  className = '',
}: CustomHeadingProps) => {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const [displayText, setDisplayText] = useState(heading);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    let iteration = 0;
    timerRef.current = setInterval(() => {
      iteration += 0.65;
      const scrambled = heading
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration) {
            return heading[index];
          }
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');

      setDisplayText(scrambled);

      if (iteration >= heading.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        setDisplayText(heading);
        timerRef.current = null;
      }
    }, 30);
  }, [heading]);

  useEffect(() => {
    if (inView) {
      startScramble();
    } else {
      setDisplayText(heading);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      setDisplayText(heading);
    };
  }, [inView, startScramble, heading]);

  return (
    <div
      ref={ref as any}
      onMouseEnter={startScramble}
      className={`relative flex flex-col items-center justify-center my-6 py-2 overflow-hidden select-none group cursor-default ${className}`}
    >
      {/* Giant Background Holographic Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
        <span
          className="text-[44px] sm:text-[70px] md:text-[95px] lg:text-[120px] font-black uppercase tracking-tighter text-transparent select-none whitespace-nowrap"
          style={{
            WebkitTextStroke: '1px rgba(34, 211, 238, 0.08)',
            fontFamily: 'var(--font-orbitron), sans-serif',
          }}
        >
          {heading}
        </span>
      </div>

      {/* Cyber HUD Terminal Badge */}
      <div className="flex items-center gap-1.5 mb-1 px-2.5 py-0.5 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-[10px] font-mono tracking-wider text-cyan-400/90">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-cyan-500/60 font-semibold">{'>_'}</span>
        <span>{badge || `SYS // ${heading.replace(/\s+/g, '_').toUpperCase()}`}</span>
      </div>

      {/* Main Scramble Title with Cyber Brackets */}
      <div className="relative flex items-center justify-center gap-2 md:gap-3 z-10">
        <span className="text-cyan-500/30 group-hover:text-cyan-400 group-hover:-translate-x-1 transition-all duration-300 font-mono text-xl md:text-3xl font-light">
          [
        </span>

        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-wide bg-linear-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent transition-all duration-300"
          style={{
            fontFamily: 'var(--font-orbitron), sans-serif',
          }}
        >
          {displayText}
        </h2>

        <span className="text-cyan-500/30 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300 font-mono text-xl md:text-3xl font-light">
          ]
        </span>
      </div>

      {/* Subtitle if provided */}
      {subtitle && (
        <p className="mt-1 text-[11px] md:text-xs font-mono text-gray-400 max-w-md text-center">
          {subtitle}
        </p>
      )}

      {/* Compact Laser Accent Line */}
      <div className="relative mt-2.5 flex items-center justify-center w-36 md:w-48">
        <div className="h-px w-full bg-linear-to-r from-transparent via-cyan-500/50 to-transparent group-hover:via-cyan-400 transition-colors duration-300" />
        <div className="absolute w-1.5 h-1.5 rotate-45 bg-cyan-400 rounded-[1px] shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
      </div>
    </div>
  );
};

export default CustomHeading;
