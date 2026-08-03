'use client';

const CenterSparks = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <style>{`
        @keyframes sparkOuter {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes sparkInner {
          0% { transform: translate(0, 0) scale(0); }
          50% { transform: translate(var(--tx), var(--ty)) scale(1.4); }
          100% { transform: translate(var(--tx), var(--ty)) scale(0.6); }
        }
        .spark-container {
          animation: sparkOuter 3.2s infinite ease-out;
        }
        .spark-inner {
          animation: sparkInner 3s infinite ease-out;
        }
      `}</style>
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;

        const distance = 220 + Math.random() * 180;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return (
          <div
            key={i}
            className="absolute spark-container"
            style={{
              animationDelay: `${Math.random() * 4}s`,
            } as React.CSSProperties}
          >
            <div
              className="relative spark-inner"
              style={{
                '--tx': `${x}px`,
                '--ty': `${y}px`,
                animationDelay: `${Math.random() * 4}s`,
              } as React.CSSProperties}
            >
              {/* 🔥 COMET HEAD (BIG) */}
              <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_25px_rgba(34,211,238,1)]" />

              <div className="absolute inset-0 rounded-full blur-xl bg-cyan-400/60" />

              <div
                className="absolute top-1/2 left-1/2 -translate-y-1/2 origin-left"
                style={{
                  width: 80,
                  height: 4,
                  transform: 'rotate(180deg)',
                }}
              >
                <div className="w-full h-full bg-linear-to-r from-cyan-400/90 via-cyan-400/40 to-transparent blur-sm" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CenterSparks;
