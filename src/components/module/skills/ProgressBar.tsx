'use client';

import { useInView } from '@/hooks/useInView';

const ProgressBar = () => {
  const skills = [
    {
      name: 'NestJS',
      percentage: 95,
      color: 'from-red-500 to-pink-600',
    },
    {
      name: 'LangChain',
      percentage: 90,
      color: 'from-cyan-400 to-blue-500',
    },
    {
      name: 'Pinecone',
      percentage: 88,
      color: 'from-violet-500 to-purple-600',
    },
    {
      name: 'AWS',
      percentage: 60,
      color: 'from-orange-400 to-amber-500',
    },
    {
      name: 'Python',
      percentage: 35,
      color: 'from-blue-500 to-yellow-400',
    },
  ];

  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <div className="w-full space-y-8 p-6 bg-gray-900/40 backdrop-blur-md border border-white/5 rounded-2xl shadow-2xl" ref={ref as any}>
      <h2 className="text-2xl font-bold text-cyan-400">Recent Activity</h2>
      {skills.map((skill, idx) => (
        <div key={idx} className="space-y-3">
          <div className="flex justify-between items-end">
            <p
              className={`text-sm md:text-base font-bold  tracking-widest uppercase fade-in-up ${inView ? 'visible' : ''}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {skill.name}
            </p>
            <span className="text-xs font-mono text-cyan-400">
              {skill.percentage}%
            </span>
          </div>

          <div className="relative h-1.5 w-full bg-gray-800 rounded-full overflow-visible">
            <div
              className={`absolute top-0 left-0 h-full rounded-full bg-linear-to-r ${skill.color} z-10 transition-all duration-1000 ease-out`}
              style={{ width: inView ? `${skill.percentage}%` : '0%', transitionDelay: `${idx * 0.1}s` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-4  blur-xs rounded-full opacity-50" />
            </div>

            <div className="absolute inset-0 w-full h-full bg-cyan-500/5 blur-sm rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
