'use client';

import lottie1 from '@/assets/react.json';
import SocialButton from '@/components/ActionButton/SocialButton';
import RotatingText from '@/components/module/home/RotatingText';
import StarfieldWarp from '@/components/wrapper/StarfieldWarp';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

function Banner() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-8 bg-black"
    >
      <div className="absolute inset-0 z-0 opacity-80">
        <StarfieldWarp />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/3 -right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] animate-float" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center mt-12">
        {/* Name Section */}
        <div
          className={`mb-6 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight mb-2 tracking-wide text-gray-300">
            Hi, I am
          </h1>
          <div className="relative inline-block group">
            <h2
              className="text-5xl md:text-7xl lg:text-8xl font-bold bg-linear-to-r from-cyan-500/70 via-blue-400/70 to-purple-400/70 text-transparent bg-clip-text relative z-10 py-2"
              style={{
                fontFamily: '"Orbitron", sans-serif',
                filter: 'drop-shadow(0 0 15px rgba(34, 211, 238, 0.15))',
              }}
            >
              Prince Mahmud Piyas
            </h2>
          </div>
        </div>

        {/* Description Box */}
        <div
          className={`relative max-w-4xl transition-all duration-1000 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative overflow-hidden backdrop-blur-xl bg-white/3 rounded-2xl border border-white/10 p-8 md:p-10 shadow-2xl group">
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none group-hover:opacity-15 transition-opacity duration-700">
              <div className="w-48 h-48 md:w-64 md:h-64">
                <Lottie animationData={lottie1} loop={true} />
              </div>
            </div>

            <div className="relative z-10 text-center">
              <p className="text-lg md:text-xl leading-relaxed font-light text-foreground/90 flex flex-wrap justify-center items-baseline gap-x-2">
                Building the next generation of AI-powered products as a
                <RotatingText />
                transforming complex challenges into intelligent, scalable, and
                impactful digital solutions.
              </p>

              <div className="h-px w-24 bg-linear-to-r from-transparent via-cyan-900/50 to-transparent mx-auto my-4" />

              <p className="text-base md:text-lg leading-relaxed font-light text-foreground/80">
                Beyond just code, I combine{' '}
                <span className="text-blue-400 font-medium">
                  AI Intelligence
                </span>{' '}
                with{' '}
                <span className="text-purple-400 font-medium">
                  Scalable Engineering
                </span>
                . Building smart, high-performance solutions that drive real
                business impact.
              </p>

              {/* Skills */}
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {[
                  'Next.js',
                  'NestJS',
                  'PostgreSQL',
                  'Vector DB',
                  'OpenAI API',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/10 text-gray-400 hover:text-cyan-500/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`mt-10 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <SocialButton />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gray-600">
            Scroll
          </span>
          <div className="w-px h-10 bg-linear-to-b from-cyan-900/30 to-transparent" />
        </div>
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
