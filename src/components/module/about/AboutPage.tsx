'use client';

import myPhoto from '@/assets/myphoto.png';
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Globe,
  Terminal,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';
import RotatingText from '@/components/module/home/RotatingText';
import CustomHeading from '@/components/module/shared/Heading';

function AboutPage() {
  const details = [
    {
      label: 'PHONE_COMMS',
      value: '+8801777233703',
      icon: Phone,
      link: 'tel:+8801777233703',
      tag: 'SECURE_LINE',
    },
    {
      label: 'EMAIL_NODE',
      value: 'princemahmudpiyas@gmail.com',
      icon: Mail,
      link: 'mailto:princemahmudpiyas@gmail.com',
      tag: 'DIRECT_PING',
    },
    {
      label: 'GEO_LOCATION',
      value: 'Dhaka, Bangladesh',
      icon: MapPin,
      tag: 'GMT+6',
    },
    {
      label: 'LANG_SYNTAX',
      value: 'Bangla, English',
      icon: Globe,
      tag: 'NATIVE // EN',
    },
  ];

  const techMetrics = [
    { label: 'EXP', val: '3+ YRS' },
    { label: 'APPS', val: '25+ PRODS' },
    { label: 'CORE', val: 'NEXT+AI' },
  ];

  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="about"
      ref={ref as any}
      className="relative w-full py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Cyber Ambient & Tech Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
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
        {/* Section Heading with Hacker Scramble */}
        <CustomHeading
          heading="About Me"
          badge="SYS.PROFILE // OPERATOR_DOSSIER"
          subtitle="System Architecture & Technical Capabilities"
        />

        <div className="mt-4 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-10">
          {/* Left Column: Cyber HUD Profile Frame with Laser Scan */}
          <div className="relative group shrink-0 flex flex-col items-center">
            <div className="relative p-3 rounded-2xl bg-gray-950/85 border border-cyan-500/35 shadow-[0_0_25px_rgba(6,182,212,0.15)] group-hover:border-cyan-400 transition-colors duration-300">
              {/* Corner HUD Accents */}
              <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400 rounded-tl" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400 rounded-tr" />
              <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400 rounded-bl" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400 rounded-br" />

              {/* Status Header Badge */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 px-1 font-mono text-[9.5px] text-gray-400">
                <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  0xPIYAS_CORE
                </span>
                <span className="text-green-400 font-semibold uppercase flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-green-400 animate-ping" />
                  ONLINE ●
                </span>
              </div>

              {/* Avatar Image Box (Enlarged + Cyber Scan Effect) */}
              <div className="relative h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80 rounded-xl overflow-hidden bg-gray-900 border border-white/10">
                <Image
                  alt="Prince Mahmud Piyas"
                  src={myPhoto}
                  fill
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, 320px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />

                {/* Cyber Scan Laser Beam */}
                <div className="cyber-scanner pointer-events-none absolute inset-x-0 z-20">
                  {/* Laser Line */}
                  <div className="h-[2px] w-full bg-linear-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.9),0_0_24px_rgba(34,211,238,0.5)]" />
                  {/* Trailing Holographic Glow */}
                  <div className="h-16 w-full bg-linear-to-b from-cyan-500/20 via-cyan-500/5 to-transparent" />
                </div>

                {/* Cyber Reticle Target Markers */}
                <div className="absolute top-2 left-2 text-[9px] font-mono text-cyan-400/60 pointer-events-none">
                  ┌
                </div>
                <div className="absolute top-2 right-2 text-[9px] font-mono text-cyan-400/60 pointer-events-none">
                  ┐
                </div>
                <div className="absolute bottom-9 left-2 text-[9px] font-mono text-cyan-400/60 pointer-events-none">
                  └
                </div>
                <div className="absolute bottom-9 right-2 text-[9px] font-mono text-cyan-400/60 pointer-events-none">
                  ┘
                </div>

                {/* Bottom Profile Verification HUD */}
                <div className="absolute bottom-2 inset-x-2 py-1 px-2 rounded-lg bg-black/85 backdrop-blur-xs border border-cyan-500/25 font-mono text-[9px] text-center text-cyan-300 flex items-center justify-between z-30">
                  <div className="flex items-center gap-1">
                    <ShieldCheck size={11} className="text-cyan-400" />
                    <span className="font-bold">VERIFIED_OPERATOR</span>
                  </div>
                  <span className="text-[8px] text-cyan-400/80 bg-cyan-500/10 px-1 rounded">
                    SCAN_OK
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats Matrix below photo */}
            <div className="grid grid-cols-3 gap-1.5 w-full mt-3">
              {techMetrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-2 rounded-lg bg-gray-900/60 border border-cyan-500/20 hover:border-cyan-400/50 text-center font-mono transition-colors"
                >
                  <span
                    className="text-xs sm:text-sm font-black text-cyan-400 block tracking-tight"
                    style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
                  >
                    {metric.val}
                  </span>
                  <span className="text-[8.5px] text-gray-400 uppercase tracking-tighter block mt-0.5">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Cyber Dossier Content */}
          <div className="flex-1 space-y-4 text-center lg:text-left">
            {/* Title & Rotating Role */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-[10px] font-mono text-cyan-400/90">
                <Terminal size={11} />
                <span>IDENT // SYSTEM_ARCHITECT</span>
              </div>

              <h1
                className={`text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight fade-in-up ${
                  inView ? 'visible' : ''
                }`}
                style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
              >
                Hi! I&apos;m{' '}
                <span className="bg-linear-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
                  Prince Mahmud Piyas
                </span>
              </h1>

              <div className="text-base sm:text-lg font-mono text-cyan-300 font-semibold flex items-center justify-center lg:justify-start gap-1 pt-0.5">
                <span className="text-cyan-500/70">{'> '}</span>
                <RotatingText />
              </div>
            </div>

            {/* Cyber Terminal Description Box */}
            <div
              className={`p-4 rounded-xl bg-gray-950/70 border border-cyan-500/20 text-gray-300 leading-relaxed font-mono text-xs sm:text-sm space-y-2 fade-in-up ${
                inView ? 'visible' : ''
              }`}
            >
              <p>
                I am a{' '}
                <span className="text-cyan-400 font-bold">
                  Backend-focused Full Stack Developer
                </span>{' '}
                dedicated to architecting high-performance, scalable
                applications.
              </p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Specializing in the{' '}
                <span className="text-white font-semibold border-b border-cyan-500/50">
                  Next.js & NestJS ecosystems
                </span>
                , I bridge complex server logic with hyper-optimized user
                experiences and AI-driven intelligence.
              </p>
            </div>

            {/* Cyber Comms & Details Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {details.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg bg-gray-900/50 border border-white/5 hover:border-cyan-500/40 transition-colors duration-200 group/item text-left font-mono fade-in-up ${
                      inView ? 'visible' : ''
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover/item:bg-cyan-400 group-hover/item:text-black transition-colors duration-200 shrink-0">
                      <Icon size={14} />
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] text-gray-500 uppercase tracking-wider font-bold">
                        {item.label}
                      </span>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-xs font-semibold text-white hover:text-cyan-400 transition-colors truncate"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-xs font-semibold text-white truncate">
                          {item.value}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cyber Action Buttons */}
            <div
              className={`pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 fade-in-up ${
                inView ? 'visible' : ''
              }`}
            >
              <a
                href="/resume.pdf"
                download="PrinceMahmudPiyas_CV"
                className="group relative inline-flex items-center gap-2 bg-cyan-400 text-black px-5 py-2.5 rounded-lg font-bold font-mono text-xs tracking-wider uppercase transition-all duration-200 shadow-md hover:bg-cyan-300 active:scale-95"
              >
                <Download size={14} className="animate-bounce" />
                <span>[ RESUME.pdf ]</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/40 text-gray-300 hover:text-cyan-300 font-mono text-xs font-semibold transition-colors duration-200"
              >
                <UserCheck size={14} className="text-cyan-400" />
                <span>INIT_COMMS</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scanLaser {
          0% {
            top: -20%;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            top: 110%;
            opacity: 0;
          }
        }
        .cyber-scanner {
          animation: scanLaser 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          will-change: top, opacity;
        }
      `}</style>
    </section>
  );
}

export default AboutPage;
