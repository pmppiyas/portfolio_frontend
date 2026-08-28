/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';
import { ChevronRight, Terminal } from 'lucide-react';

const SERVICE_TAGS: Record<string, string[]> = {
  'Web Development': ['NEXT.JS 16', 'REACT 19', 'TYPESCRIPT', 'TAILWIND'],
  'Backend Development': ['NESTJS', 'NODE.JS', 'REST / GRAPHQL', 'DOCKER'],
  'Management Systems': ['CUSTOM_ERP', 'RBAC_SECURITY', 'WORKFLOW_AUTO'],
  'E-Commerce Solutions': ['STRIPE_API', 'CHECKOUT_FLOW', 'INVENTORY'],
  'Web Maintenance': ['PERF_AUDIT', 'SECURITY_PATCH', 'OPTIMIZATION'],
  'Deployment & Hosting': ['AWS_CLOUD', 'VERCEL_CI/CD', 'MONITORING'],
};

function ServiceCard({
  service,
  index = 0,
}: {
  service: any;
  index?: number;
}) {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const tags =
    SERVICE_TAGS[service.name] || ['ENTERPRISE', 'SCALABLE', 'PRODUCTION'];

  return (
    <div
      ref={ref as any}
      className={`group relative p-5 rounded-xl bg-gray-950/80 border border-cyan-500/20 hover:border-cyan-400/60 shadow-lg hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden cursor-default fade-in-up ${
        inView ? 'visible' : ''
      }`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Cyber Corner Markers */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-transparent group-hover:border-cyan-400 transition-colors duration-200" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-transparent group-hover:border-cyan-400 transition-colors duration-200" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-transparent group-hover:border-cyan-400 transition-colors duration-200" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-transparent group-hover:border-cyan-400 transition-colors duration-200" />

      <div>
        {/* Top Cyber Module Header */}
        <div className="flex items-center justify-between pb-2 mb-3.5 border-b border-white/10 font-mono text-[9px] text-gray-500">
          <span className="text-cyan-400/80 group-hover:text-cyan-300 transition-colors font-bold">
            {`// MOD_0${index + 1}`}
          </span>
          <span className="flex items-center gap-1 text-green-400 uppercase font-bold">
            <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
            DEPLOYED
          </span>
        </div>

        {/* Icon & Title */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-11 h-11 rounded-lg bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50 flex items-center justify-center p-2 transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.12)] shrink-0">
            <Image
              src={service.icon}
              height={32}
              width={32}
              alt={service.name}
              className="object-contain filter drop-shadow group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div>
            <h3
              className="text-base font-black text-white group-hover:text-cyan-300 transition-colors duration-200 tracking-tight"
              style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
            >
              {service.name}
            </h3>
            <span className="text-[9px] font-mono text-gray-500 uppercase">
              CAPABILITY_STACK
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 font-mono text-xs leading-relaxed mb-4">
          {service.description}
        </p>
      </div>

      {/* Footer Tags & Status */}
      <div className="space-y-2.5 pt-3 border-t border-white/10">
        {/* Capability Tags */}
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-[8.5px] font-mono font-semibold px-1.5 py-0.5 rounded bg-white/5 group-hover:bg-cyan-500/10 text-gray-400 group-hover:text-cyan-300 border border-white/5 transition-colors duration-200 uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom Laser Progress Accent */}
        <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 group-hover:text-cyan-400 transition-colors pt-0.5">
          <span className="flex items-center gap-1 text-[9.5px]">
            <Terminal size={11} className="text-cyan-400" />
            <span>sys.ready()</span>
          </span>
          <ChevronRight
            size={12}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
