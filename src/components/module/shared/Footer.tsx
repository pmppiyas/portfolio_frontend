'use client';

import { useInView } from '@/hooks/useInView';
import {
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Terminal,
  ShieldCheck,
  Radio,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import {
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
  FaInstagram,
  FaFacebookF,
} from 'react-icons/fa6';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { name: 'Home', href: '/' },
      { name: 'About Me', href: '/#about' },
      { name: 'Services', href: '/#service' },
      { name: 'Projects', href: '/#projects' },
      { name: 'Contact', href: '/#contact' },
    ],
    capabilities: [
      { name: 'Full-Stack Next.js 16', href: '/#service' },
      { name: 'NestJS & Microservices', href: '/#service' },
      { name: 'AI & LangChain Integration', href: '/#service' },
      { name: 'PostgreSQL & Vector DB', href: '/#service' },
      { name: 'Cloud & System Design', href: '/#service' },
    ],
    presence: [
      { name: 'GitHub // Repos', href: 'https://github.com/pmppiyas' },
      {
        name: 'LinkedIn // Network',
        href: 'https://www.linkedin.com/in/pmppiyas',
      },
      { name: 'Twitter / X // Feed', href: 'https://twitter.com/pmppiyas' },
      {
        name: 'Facebook // Direct',
        href: 'https://www.facebook.com/princempiyas',
      },
    ],
  };

  const socialLinks = [
    {
      icon: FaGithub,
      href: 'https://github.com/pmppiyas',
      label: 'GH_01',
      color: 'hover:text-cyan-300 hover:border-cyan-400',
    },
    {
      icon: FaLinkedinIn,
      href: 'https://www.linkedin.com/in/pmppiyas',
      label: 'IN_02',
      color: 'hover:text-blue-400 hover:border-blue-400',
    },
    {
      icon: FaXTwitter,
      href: 'https://twitter.com/pmppiyas',
      label: 'X_03',
      color: 'hover:text-white hover:border-white/60',
    },
    {
      icon: FaFacebookF,
      href: 'https://www.facebook.com/princempiyas',
      label: 'FB_04',
      color: 'hover:text-blue-500 hover:border-blue-500',
    },
    {
      icon: FaInstagram,
      href: 'https://instagram.com/pmppiyas',
      label: 'IG_05',
      color: 'hover:text-pink-400 hover:border-pink-400',
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { ref: bioRef, inView: bioInView } = useInView({ threshold: 0.1 });
  const { ref: linksRef, inView: linksInView } = useInView({ threshold: 0.1 });

  return (
    <footer className="relative w-full pt-10 pb-0 px-4 sm:px-6 lg:px-8 bg-black text-white overflow-hidden border-t border-cyan-500/20">
      {/* Background Cyber Ambient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div
          className="absolute -top-32 left-1/3 w-[500px] h-[300px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
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

      <div className="relative z-10 max-w-6xl mx-auto space-y-6 pb-6">
        {/* Top Terminal HUD Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-[9.5px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/80" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
            <span className="w-2 h-2 rounded-full bg-green-500/80" />
            <span className="text-gray-400 ml-1">
              ROOT_TERMINAL // SYS_FOOTER.sh
            </span>
          </div>
          <div className="flex items-center gap-2 text-cyan-400">
            <Radio size={12} className="animate-pulse" />
            <span className="font-bold">
              KERNEL // PRODUCTION_ACTIVE [200_OK]
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Personal Bio Section */}
          <div
            ref={bioRef as any}
            className={`lg:col-span-2 space-y-4 fade-in-up ${bioInView ? 'visible' : ''}`}
          >
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="text-cyan-500/40 font-mono text-xl font-light">
                [
              </span>
              <h2
                className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors"
                style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
              >
                PRINCE<span className="text-cyan-400">.MAHMUD</span>
              </h2>
              <span className="text-cyan-500/40 font-mono text-xl font-light">
                ]
              </span>
            </Link>

            <p className="text-gray-400 font-mono text-xs leading-relaxed max-w-sm">
              &gt; Full-Stack AI Engineer &amp; Distributed Systems Architect.
              Crafting intelligent, scalable architectures with zero-compromise
              performance.
            </p>

            {/* Direct CTA & Comms */}
            <div className="pt-2 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Link
                  href="/#contact"
                  className="bg-cyan-400 hover:bg-cyan-300 text-black px-4 py-2 rounded-lg font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center gap-2 active:scale-95"
                >
                  <span>[ INITIATE_COMMS ➔ ]</span>
                </Link>

                <div className="flex items-center gap-1.5 font-mono text-[9px] text-green-400 bg-green-500/10 px-2.5 py-1 rounded border border-green-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span>AVAILABLE_FOR_HIRE</span>
                </div>
              </div>

              {/* Social Quick Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {socialLinks.map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1 px-2.5 py-1 rounded bg-gray-950 border border-white/10 font-mono text-[9px] text-gray-400 transition-all duration-200 ${social.color}`}
                    >
                      <Icon size={12} />
                      <span>{social.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dynamic Link Groups */}
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <div
              key={category}
              ref={idx === 0 ? (linksRef as any) : null}
              className={`space-y-3 fade-in-up ${linksInView ? 'visible' : ''}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-center gap-1.5 pb-1 border-b border-white/10 font-mono text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                <span>{`// 0${idx + 1}_${category.toUpperCase()}`}</span>
              </div>

              <ul className="space-y-2 font-mono text-xs">
                {links.map((link) => {
                  const isExternal =
                    link.href.startsWith('http') || category === 'presence';
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className="text-gray-400 hover:text-cyan-300 transition-colors duration-200 flex items-center group gap-1.5"
                      >
                        <span className="text-cyan-500/40 group-hover:text-cyan-400 text-[10px] transition-colors">
                          &gt;
                        </span>
                        <span className="truncate">{link.name}</span>
                        {isExternal && (
                          <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400 shrink-0" />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Telemetry Contact Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 rounded-xl bg-gray-950/80 border border-white/10 font-mono text-xs">
          <div className="flex items-center gap-2.5 text-gray-300">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Mail size={13} />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] text-gray-500 uppercase block font-bold">
                MAIL_NODE
              </span>
              <a
                href="mailto:princemahmudpiyas@gmail.com"
                className="text-white hover:text-cyan-400 transition-colors truncate block"
              >
                princemahmudpiyas@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-gray-300">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Phone size={13} />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] text-gray-500 uppercase block font-bold">
                VOICE_CHANNEL
              </span>
              <a
                href="tel:+8801777233703"
                className="text-white hover:text-cyan-400 transition-colors truncate block"
              >
                +880 17772-33703
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-gray-300">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <MapPin size={13} />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] text-gray-500 uppercase block font-bold">
                GEO_COORDINATES
              </span>
              <span className="text-white truncate block">
                Dhaka, Bangladesh [GMT+6]
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Return to Top */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 font-mono text-[10px] text-gray-500">
          <div className="flex items-center gap-2">
            <span>
              © {currentYear} PRINCE_MAHMUD // ALL_SYSTEMS_OPERATIONAL
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-cyan-500/70">
              PORT // 443_SSL_VERIFIED
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 px-2.5 py-1 rounded transition-colors"
            >
              <span>[ RETURN_TO_TOP</span>
              <ArrowUp size={11} />
              <span>]</span>
            </button>
          </div>
        </div>
      </div>

      {/* Laser Cyan Accent Line */}
      <div className="h-0.5 w-full bg-linear-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
    </footer>
  );
}
