/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

function ServiceCard({ service }: { service: any }) {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref as any}
      className={`relative bg-gray-900/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 shadow-2xl transition-colors duration-500 hover:border-cyan-500/30 group cursor-pointer h-full fade-in-up ${inView ? 'visible' : ''}`}
    >
      <div className="flex flex-col items-center">
        {/* Icon Overlay */}
        <div
          className="flex items-center justify-center mb-6 p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 transition-all duration-500 shadow-lg shadow-cyan-500/5 group-hover:scale-110 group-hover:z-20"
        >
          <Image
            src={service.icon}
            height={50}
            width={50}
            alt={service.name}
            className="group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <h3 className="text-2xl font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300 tracking-tight">
          {service.name}
        </h3>

        <p className="text-gray-400 mt-4 leading-relaxed font-light text-sm text-center">
          {service.description}
        </p>

        <div className="mt-6 w-0 group-hover:w-16 h-0.5 bg-cyan-500 transition-all duration-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
      </div>

      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
    </div>
  );
}

export default ServiceCard;
