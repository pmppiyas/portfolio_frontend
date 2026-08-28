'use client';

import lottie1 from '@/assets/react.json';
import SocialButton from '@/components/ActionButton/SocialButton';
import RotatingText from '@/components/module/home/RotatingText';
import StarfieldWarp from '@/components/wrapper/StarfieldWarp';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { Terminal, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';

function Banner() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-12 bg-black"
    >
      {/* 1. Preserved Background Starfield Animation */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <StarfieldWarp />
      </div>

      {/* 2. Preserved Ambient Floating Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute top-1/4 -left-1/4 w-[450px] h-[450px] rounded-full animate-float"
          style={{
            background:
              'radial-gradient(circle, rgba(6,182,212,0.1) 0%, rgba(6,182,212,0) 70%)',
            willChange: 'transform',
          }}
        />
        <div
          className="absolute bottom-1/3 -right-1/4 w-[450px] h-[450px] rounded-full animate-float"
          style={{
            background:
              'radial-gradient(circle, rgba(168,85,247,0.1) 0%, rgba(168,85,247,0) 70%)',
            willChange: 'transform',
          }}
        />
      </div>

      {/* 3. Cyberpunk Hacker Content Layout */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center justify-center text-center mt-8 space-y-6">
        {/* Top Cyber HUD Badge */}
        <div
          className={`transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-[10.5px] font-mono text-cyan-400/90 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(34,211,238,0.9)]" />
            <span className="text-cyan-500/60 font-semibold">{'>_'}</span>
            <span>SYS.OPERATOR // PIYAS_NODE.v2</span>
            <span className="ml-1 text-[9px] bg-green-500/10 text-green-400 px-1 rounded uppercase font-bold">
              ONLINE ●
            </span>
          </div>
        </div>

        {/* Hero Name Section with Orbitron Font & Cyber Brackets */}
        <div
          className={`transition-all duration-1000 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
          }`}
        >
          <p className="text-xs sm:text-sm font-mono text-gray-400 tracking-widest uppercase mb-1">
            // FULL_STACK_AI_ENGINEER
          </p>

          <div className="relative inline-flex items-center justify-center gap-2 md:gap-3">
            <span className="text-cyan-500/30 font-mono text-3xl sm:text-5xl md:text-6xl font-light">
              [
            </span>
            <h1
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-linear-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent tracking-tight py-1"
              style={{
                fontFamily: 'var(--font-orbitron), sans-serif',
                textShadow: '0 0 35px rgba(34, 211, 238, 0.25)',
              }}
            >
              Prince Mahmud Piyas
            </h1>
            <span className="text-cyan-500/30 font-mono text-3xl sm:text-5xl md:text-6xl font-light">
              ]
            </span>
          </div>
        </div>

        {/* Cyber Overview Terminal Card (Preserving Lottie Atom animation) */}
        <div
          className={`w-full max-w-4xl transition-all duration-1000 delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="relative rounded-2xl bg-gray-950/80 border border-cyan-500/25 p-6 sm:p-8 shadow-[0_0_35px_rgba(6,182,212,0.1)] group overflow-hidden">
            {/* Cyber Corner Markers */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

            {/* Terminal Window Bar */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 font-mono text-[9.5px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                <span className="w-2 h-2 rounded-full bg-green-500/80" />
                <span className="text-gray-400 ml-1">ARCHITECT_PROFILE.sys</span>
              </div>
              <span className="text-cyan-400 font-bold uppercase">
                READY // 120_FPS
              </span>
            </div>

            {/* Preserved Lottie React Loop in Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none group-hover:opacity-12 transition-opacity duration-700">
              <div className="w-48 h-48 sm:w-60 sm:h-60">
                <Lottie animationData={lottie1} loop={true} />
              </div>
            </div>

            {/* Terminal Content */}
            <div className="relative z-10 text-center space-y-4">
              <p className="text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose text-gray-200 font-normal max-w-3xl mx-auto">
                Building the next generation of AI-powered products as a{' '}
                <RotatingText /> transforming complex challenges into
                intelligent, scalable, and impactful digital solutions.
              </p>

              {/* Cyber Laser Divider */}
              <div className="relative my-3 flex items-center justify-center w-36 sm:w-52 mx-auto">
                <div className="h-px w-full bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />
                <div className="absolute w-1.5 h-1.5 rotate-45 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              </div>

              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-300 font-light max-w-2xl mx-auto">
                Beyond just code, I combine{' '}
                <span className="text-cyan-300 font-semibold">
                  AI Intelligence
                </span>{' '}
                with{' '}
                <span className="text-purple-300 font-semibold">
                  Scalable Engineering
                </span>
                . Designing robust production architectures.
              </p>

              {/* Cyber Stack Badges */}
              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {[
                  'NEXT.JS 16',
                  'NESTJS',
                  'POSTGRESQL',
                  'VECTOR_DB',
                  'OPENAI_API',
                  'LANGCHAIN',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="text-[9px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 bg-white/5 rounded-md border border-white/5 text-gray-300 hover:text-cyan-300 hover:border-cyan-500/30 transition-all duration-200"
                  >
                    [{skill}]
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social Comms Bar */}
        <div
          className={`pt-2 transition-all duration-1000 delay-600 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <SocialButton />
        </div>
      </div>

      {/* Cyber Scroll Down Indicator */}
      <div
        className={`absolute bottom-5 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-cyan-400 transition-colors group cursor-pointer"
        >
          <span className="text-[9px] font-mono uppercase tracking-widest group-hover:text-cyan-300">
            [ SCROLL_DOWN ]
          </span>
          <ChevronDown size={14} className="animate-bounce text-cyan-400/80" />
        </a>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(15px, -15px) scale(1.05);
          }
          66% {
            transform: translate(-10px, 10px) scale(0.95);
          }
        }
        .animate-float {
          animation: float 12s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default Banner;
