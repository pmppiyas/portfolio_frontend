'use client';
import { Button } from '@/components/ui/button';
import { Download, Menu, X, UserCheck } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const [activePath, setActivePath] = useState(pathname);

  useEffect(() => {
    setActivePath(window.location.pathname + window.location.hash);

    const sectionMap: { id: string; navLink: string | null }[] = [
      { id: 'home', navLink: '/' },
      { id: 'about', navLink: '/#about' },
      { id: 'service', navLink: '/#service' },
      { id: 'skills', navLink: null },
      { id: 'projects', navLink: '/#projects' },
      { id: 'review', navLink: null },
      { id: 'contact', navLink: '/#contact' },
    ];

    const getActiveSection = () => {
      const triggerY = window.innerHeight * 0.35;
      let active: { id: string; navLink: string | null } | null = null;

      for (const section of sectionMap) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY) {
          active = section;
        }
      }

      if (!active) {
        setActivePath('/');
      } else if (active.navLink !== null) {
        setActivePath(active.navLink);
      }
    };

    getActiveSection();

    window.addEventListener('scroll', getActiveSection, { passive: true });
    window.addEventListener('hashchange', getActiveSection);

    return () => {
      window.removeEventListener('scroll', getActiveSection);
      window.removeEventListener('hashchange', getActiveSection);
    };
  }, []);

  const links = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/#about' },
    { name: 'Service', link: '/#service' },
    { name: 'Projects', link: '/#projects' },
    { name: 'Blogs', link: '/blogs' },
    { name: 'Tools', link: '/tools' },
    { name: 'Contact', link: '/#contact' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-custom shadow-lg py-4 border-b border-primary/20'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <h2 className="text-3xl font-bold">
            <Link href="/" className="flex items-center">
              <span className="text-foreground">P</span>
              <span className="bg-linear-to-r from-cyan-400 to-cyan-400/70 bg-clip-text text-transparent font-semibold">
                rince.
              </span>
            </Link>
          </h2>

          <nav className="hidden lg:flex items-center gap-1">
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
                  onClick={(e) => {
                    // Smooth scroll for hash links on the same page
                    if (link.link.startsWith('/#')) {
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
                  className={`relative text-base font-medium px-4 py-2 transition-all duration-300 ${
                    isActive
                      ? 'text-cyan-400'
                      : 'text-white/80 hover:text-cyan-400'
                  }`}
                >
                  {link.name}

                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full mx-4"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}

            <div className="hidden lg:flex items-center gap-4 ml-4">
              <Button
                asChild
                className="rounded-full px-6 font-semibold shadow-md bg-cyan-400 hover:bg-cyan-500 transition-all duration-300"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  <UserCheck size={18} />
                  Hire Me
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full px-6 font-semibold border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white transition-all duration-300"
              >
                <a
                  href="/resume.pdf"
                  download="PrinceMahmudPiyas_CV"
                  className="flex items-center gap-2"
                >
                  <Download size={18} className="animate-bounce" />
                  Resume
                </a>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <Button
              asChild
              className="rounded-full px-6 font-semibold shadow-md bg-cyan-400 hover:bg-cyan-500 transition-all duration-300"
            >
              <Link href="/contact" className="flex items-center gap-2">
                <UserCheck size={18} />
                Hire Me
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="p-2 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-screen w-72 bg-custom border-l border-white/10 shadow-2xl z-60 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-cyan-400 tracking-tighter">
              CONTROL_PANEL
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeMenu}
              className="text-white"
            >
              <X size={24} />
            </Button>
          </div>

          <nav className="flex flex-col gap-2">
            {links.map((link, idx) => {
              const isActive =
                link.link === '/'
                  ? pathname === '/'
                  : link.link.startsWith('/#')
                    ? activePath === link.link
                    : pathname === link.link ||
                      pathname.startsWith(link.link + '/');

              return (
                <Link
                  key={idx}
                  href={link.link}
                  onClick={(e) => {
                    // Smooth scroll for hash links on mobile too
                    if (link.link.startsWith('/#')) {
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
                  className={`w-full text-left px-4 py-2 text-lg font-medium rounded-lg border-b border-white/5 transition-all ${
                    isActive
                      ? 'bg-cyan-400/10 text-cyan-400' // মোবাইল মেনুতে একটিভ ব্যাকগ্রাউন্ড
                      : 'text-white/90 hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-4 pt-10">
            <div className="flex flex-col items-center gap-4">
              <Button
                asChild
                className="w-full py-5 bg-cyan-400 text-black font-bold shadow-lg rounded-full"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  <UserCheck size={18} />
                  Hire Me
                </Link>
              </Button>

              <Button
                asChild
                className="w-full py-5 bg-white/10 text-cyan-400 border border-cyan-400/30 rounded-full"
              >
                <a
                  href="/resume.pdf"
                  download="PrinceMahmudPiyas_CV"
                  className="flex items-center gap-2"
                >
                  <Download size={18} className="animate-bounce" />
                  Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-55"
          onClick={closeMenu}
        />
      )}
    </header>
  );
}

export default Navbar;
