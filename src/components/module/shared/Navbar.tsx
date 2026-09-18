'use client';
import { Button } from '@/components/ui/button';
import { Download, Menu, X, UserCheck } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePath, setActivePath] = useState(pathname);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setActivePath(pathname + window.location.hash);

    const sectionMap: { id: string; navLink: string | null }[] = [
      { id: 'home', navLink: '/' },
      { id: 'about', navLink: '/#about' },
      { id: 'service', navLink: '/#service' },
      { id: 'skills-matrix', navLink: null },
      { id: 'projects', navLink: '/#projects' },
      { id: 'review', navLink: null },
      { id: 'contact', navLink: '/#contact' },
    ];

    let lastCheck = 0;
    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));

      if (pathname === '/') {
        const now = Date.now();
        if (now - lastCheck > 120) {
          lastCheck = now;
          const triggerY = window.innerHeight * 0.35;
          let active: { id: string; navLink: string | null } | null = null;

          for (let i = 0; i < sectionMap.length; i++) {
            const el = document.getElementById(sectionMap[i].id);
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            if (rect.top <= triggerY) {
              active = sectionMap[i];
            }
          }

          if (!active) {
            setActivePath((prev) => (prev !== '/' ? '/' : prev));
          } else if (active.navLink !== null) {
            const target = active.navLink;
            setActivePath((prev) => (prev !== target ? target : prev));
          }
        } else if (!timeoutId) {
          timeoutId = setTimeout(() => {
            timeoutId = null;
            handleScroll();
          }, 120);
        }
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleScroll, { passive: true });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleScroll);
    };
  }, [pathname]);

  const links = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/#about' },
    { name: 'Services', link: '/#service' },
    { name: 'Projects', link: '/#projects' },
    { name: 'Blogs', link: '/blogs' },
    { name: 'Tools', link: '/tools' },
    { name: 'Contact', link: '/#contact' },
    { name: 'ASK AI', link: '/assistant', isAi: true },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  // Hide public navbar on admin dashboard and auth routes
  const isDashboardOrAuth =
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/auth');

  if (isDashboardOrAuth) {
    return null;
  }

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 pt-2 sm:pt-3 pb-2 flex justify-center px-3 sm:px-6 pointer-events-none transition-all duration-300">
        {/* Top Header Blur Strip (Frosted Glass Behind Floating Gap) */}
        <div
          className={`absolute top-0 inset-x-0 h-20 -z-10 pointer-events-none transition-opacity duration-300 ${
            scrolled ? 'opacity-100' : 'opacity-90'
          }`}
          style={{
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            maskImage:
              'linear-gradient(to bottom, black 45%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 45%, transparent 100%)',
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
          }}
        />

        {/* Floating Polymorphic Cyber Capsule */}
        <div
          className={`pointer-events-auto w-full max-w-6xl rounded-2xl transition-all duration-300 relative ${
            scrolled
              ? 'bg-gray-950/85 backdrop-blur-xl border border-cyan-500/40 shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_20px_rgba(6,182,212,0.2)] py-2.5 px-4 sm:px-6'
              : 'bg-black/60 backdrop-blur-lg border border-white/15 hover:border-cyan-500/30 shadow-[0_8px_25px_rgba(0,0,0,0.5),0_0_12px_rgba(6,182,212,0.1)] py-3 px-4 sm:px-6'
          }`}
        >
          {/* Subtle Cyber Corner Accents */}
          <div className="absolute -top-0.5 -left-0.5 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400 rounded-tl" />
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400 rounded-tr" />
          <div className="absolute -bottom-0.5 -left-0.5 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400 rounded-bl" />
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400 rounded-br" />

          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5 group">
              <span className="text-cyan-400 font-mono text-base font-bold">
                [
              </span>
              <span
                className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors flex items-center gap-0.5"
                style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
              >
                PRINCE<span className="text-cyan-400">.</span>
              </span>
              <span className="text-cyan-400 font-mono text-base font-bold">
                ]
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse ml-0.5 hidden sm:inline-block" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 text-[11.5px]">
              {links.map((link, idx) => {
                const isActive =
                  link.link === '/'
                    ? activePath === '/'
                    : link.link.startsWith('/#')
                      ? activePath === link.link
                      : activePath === link.link ||
                        activePath.startsWith(link.link + '/');

                return (
                  <Link
                    key={idx}
                    href={link.link}
                    style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
                    onClick={(e) => {
                      if (link.link === '/' && pathname === '/') {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setActivePath('/');
                      } else if (link.link.startsWith('/#')) {
                        const id = link.link.replace('/#', '');
                        const el = document.getElementById(id);
                        if (el) {
                          e.preventDefault();
                          el.scrollIntoView({ behavior: 'smooth' });
                          window.history.pushState(null, '', link.link);
                          setActivePath(link.link);
                        }
                      } else {
                        setActivePath(link.link);
                      }
                    }}
                    className={`relative px-2.5 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1 uppercase tracking-wider font-bold ${
                      isActive
                        ? 'bg-cyan-500/20 border border-cyan-400/80 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                        : 'text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                    }`}
                  >
                    {isActive && (
                      <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping mr-0.5" />
                    )}
                    <span>{link.name}</span>
                    {link.isAi && (
                      <span className="ml-0.5 px-1 py-0.2 text-[8px] tracking-normal font-mono bg-cyan-950 border border-cyan-400/50 text-cyan-300 rounded shadow-sm shadow-cyan-500/20">
                        AI
                      </span>
                    )}
                  </Link>
                );
              })}

              {/* Desktop Action Buttons */}
              <div className="flex items-center gap-2 ml-2 pl-2.5 border-l border-white/15">
                <a
                  href="/#contact"
                  style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
                  className="bg-cyan-400 hover:bg-cyan-300 text-black px-3 py-1.5 rounded-lg font-black text-[10.5px] uppercase tracking-wider transition-all duration-200 shadow-md flex items-center gap-1 active:scale-95 cursor-pointer"
                >
                  <UserCheck size={12} />
                  <span>[ HIRE_ME ]</span>
                </a>

                <a
                  href="/resume.pdf"
                  download="PrinceMahmudPiyas_CV"
                  style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
                  className="bg-white/5 hover:bg-cyan-500/10 border border-white/15 hover:border-cyan-400/50 text-gray-200 hover:text-cyan-300 px-2.5 py-1.5 rounded-lg font-bold text-[10.5px] uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Download size={12} className="animate-bounce" />
                  <span>RESUME</span>
                </a>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <a
                href="/#contact"
                style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
                className="bg-cyan-400 hover:bg-cyan-300 text-black px-3 py-1 rounded-lg font-black text-[10px] uppercase tracking-wider shadow-sm flex items-center gap-1 cursor-pointer"
              >
                <UserCheck size={12} />
                <span>HIRE</span>
              </a>

              <button
                type="button"
                className="p-1.5 rounded-lg bg-white/10 border border-cyan-500/30 text-cyan-400 hover:bg-white/20 transition-colors cursor-pointer flex items-center justify-center"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Polymorphic Frosted Glass) */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-screen w-72 sm:w-80 bg-gray-950/95 backdrop-blur-2xl border-l border-cyan-500/30 shadow-2xl z-[100] transition-transform duration-300 ease-in-out font-mono flex flex-col ${
          isMenuOpen
            ? 'translate-x-0 pointer-events-auto'
            : 'translate-x-full pointer-events-none'
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <h2
                className="text-base font-black text-white"
                style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
              >
                SYS.NAV // 0xPIYAS
              </h2>
            </div>
            <button
              type="button"
              onClick={closeMenu}
              className="p-1 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-1.5 text-xs">
            {links.map((link, idx) => {
              const isActive =
                link.link === '/'
                  ? activePath === '/'
                  : link.link.startsWith('/#')
                    ? activePath === link.link
                    : activePath === link.link ||
                      activePath.startsWith(link.link + '/');

              return (
                <Link
                  key={idx}
                  href={link.link}
                  style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
                  onClick={(e) => {
                    if (link.link === '/' && pathname === '/') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setActivePath('/');
                    } else if (link.link.startsWith('/#')) {
                      const id = link.link.replace('/#', '');
                      const el = document.getElementById(id);
                      if (el) {
                        e.preventDefault();
                        el.scrollIntoView({ behavior: 'smooth' });
                        window.history.pushState(null, '', link.link);
                        setActivePath(link.link);
                      }
                    } else {
                      setActivePath(link.link);
                    }
                    closeMenu();
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg border transition-all flex items-center justify-between uppercase tracking-wider text-[11px] font-bold ${
                    isActive
                      ? 'bg-cyan-500/20 border-cyan-400/80 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                      : 'border-transparent text-gray-300 hover:bg-white/5 hover:border-white/10'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-cyan-500/50">&gt;</span>
                    <span>{link.name}</span>
                    {link.isAi && (
                      <span className="ml-1 px-1.5 py-0.5 text-[8px] font-mono bg-cyan-950 border border-cyan-400/50 text-cyan-300 rounded">
                        RAG AI
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Bottom Actions */}
          <div className="mt-auto space-y-2.5 pt-6 border-t border-white/10">
            <a
              href="/#contact"
              onClick={closeMenu}
              style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
              className="w-full py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black font-black rounded-lg text-xs flex items-center justify-center gap-2 transition-colors uppercase tracking-wider cursor-pointer"
            >
              <UserCheck size={14} />
              <span>[ HIRE_ME ]</span>
            </a>

            <a
              href="/resume.pdf"
              download="PrinceMahmudPiyas_CV"
              onClick={closeMenu}
              style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
              className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-cyan-500/30 text-cyan-300 font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors uppercase tracking-wider cursor-pointer"
            >
              <Download size={14} className="animate-bounce" />
              <span>[ RESUME.pdf ]</span>
            </a>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] pointer-events-auto cursor-pointer"
          onClick={closeMenu}
        />
      )}
    </>
  );
}

export default Navbar;
