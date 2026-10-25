'use client';

import CustomHeading from '@/components/module/shared/Heading';
import {
  Sparkles,
  FileCode,
  Shapes,
  Calculator,
} from 'lucide-react';
import Link from 'next/link';

interface ITool {
  name: string;
  tag: string;
  category: string;
  description: string;
  link: string;
  icon: any;
  techs: string[];
  status: 'ONLINE' | 'ACTIVE' | 'BETA';
}

const tools: ITool[] = [
  {
    name: 'SVG & Shape Engine',
    tag: '// TOOL_01',
    category: 'VECTOR_GRAPHICS',
    description:
      'Parametric SVG generator, vector shape synthesizer with real-time export and custom stroke controls.',
    link: '/tools/shape_generator',
    icon: Shapes,
    techs: ['SVG 2.0', 'MATH_AST', 'CANVAS'],
    status: 'ONLINE',
  },
  {
    name: 'AGL Bill Calculator',
    tag: '// TOOL_02',
    category: 'AUTOMATION_SYS',
    description:
      'Automated utility and delivery calculation parser with instant Bengali slip copy formatter.',
    link: '/tools/agl_bill',
    icon: Calculator,
    techs: ['ALGORITHM', 'FINANCE', 'PARSER'],
    status: 'ONLINE',
  },
  {
    name: 'Wave & Curve Lab',
    tag: '// TOOL_03',
    category: 'CANVAS_ANIMATION',
    description:
      'Interactive multi-layered harmonic wave and bezier spline generator for modern hero headers.',
    link: '/tools/shape_generator',
    icon: Sparkles,
    techs: ['BEZIER', 'TRIGONOMETRY', 'REACT'],
    status: 'ACTIVE',
  },
  {
    name: 'JSON AST Validator',
    tag: '// TOOL_04',
    category: 'DEV_UTILITY',
    description:
      'High-performance structured JSON formatter, schema validator and recursive key transformer.',
    link: '/tools/agl_bill',
    icon: FileCode,
    techs: ['AST', 'SCHEMA_V7', 'LINTER'],
    status: 'ACTIVE',
  },
];

export default function ToolsPage() {
  return (
    <div className="relative w-full min-h-screen pt-13 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black text-white">
      {/* Background Cyber Ambient & Tech Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute top-1/4 right-1/4 w-[500px] h-[300px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[300px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.3) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Heading */}
        <CustomHeading
          heading="Dev Utilities"
          badge="SYS.TOOLS // EXPERIMENTAL_LABS"
          subtitle="Interactive Developer Utilities, Vector Engines & Automation Protocols"
        />

        {/* Tools Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full pt-2">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <Link
                key={idx}
                href={tool.link}
                className="group relative block rounded-xl bg-gray-950/80 border border-cyan-500/20 hover:border-cyan-400/60 p-5 sm:p-6 shadow-lg hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 overflow-hidden"
              >
                {/* Cyber Corner Markers */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-transparent group-hover:border-cyan-400 transition-colors" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-transparent group-hover:border-cyan-400 transition-colors" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-transparent group-hover:border-cyan-400 transition-colors" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-transparent group-hover:border-cyan-400 transition-colors" />

                {/* Top Telemetry Bar */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 font-mono text-[9.5px]">
                  <span className="text-cyan-400/80 group-hover:text-cyan-300 font-bold">
                    {tool.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-green-400 uppercase font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span>{tool.status} ●</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  {/* Tool Icon Frame */}
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/25 group-hover:border-cyan-400 group-hover:bg-cyan-500/20 flex items-center justify-center text-cyan-400 transition-all duration-200 shrink-0">
                    <Icon size={22} />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h3
                        className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight truncate"
                        style={{
                          fontFamily: 'var(--font-orbitron), sans-serif',
                        }}
                      >
                        {tool.name}
                      </h3>
                    </div>

                    <p className="text-gray-300 font-mono text-xs leading-relaxed">
                      {tool.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[9px]">
                      {tool.techs.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10 group-hover:border-cyan-500/30 group-hover:text-cyan-300/90 transition-colors"
                        >
                          [{tech}]
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Launch Bar */}
                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                  <span className="text-[10px] text-gray-500 uppercase">
                    CATEGORY // {tool.category}
                  </span>
                  <span className="text-cyan-400 group-hover:text-cyan-300 font-bold flex items-center gap-1 text-[11px] group-hover:translate-x-0.5 transition-transform">
                    <span>[ LAUNCH_TOOL ➔ ]</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
