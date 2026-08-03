'use client';

import { useInView } from '@/hooks/useInView';
import {
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { name: 'Home', href: '/' },
      { name: 'About Me', href: '/about' },
      { name: 'Projects', href: '/projects' },
      { name: 'Contact', href: '/contact' },
    ],
    expertise: [
      { name: 'Web Development', href: '#' },
      { name: 'UI/UX Design', href: '#' },
      { name: 'Mobile Apps', href: '#' },
      { name: 'Consultation', href: '#' },
    ],
    presence: [
      { name: 'GitHub', href: 'https://github.com/pmppiyas' },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/pmppiyas' },
      { name: 'Twitter', href: 'https://twitter.com/pmppiyas' },
      { name: 'Behance', href: 'https://behance.net' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/pmppiyas', label: 'GitHub' },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/pmppiyas',
      label: 'LinkedIn',
    },
    { icon: Twitter, href: 'https://twitter.com/pmppiyas', label: 'Twitter' },
    {
      icon: Instagram,
      href: 'https://instagram.com/pmppiyas',
      label: 'Instagram',
    },
  ];

  const { ref: bioRef, inView: bioInView } = useInView({ threshold: 0.1 });
  const { ref: linksRef, inView: linksInView } = useInView({ threshold: 0.1 });

  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden border-t border-white/5">
      {/* Background Parallax Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-24 left-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-[120px] animate-pulse"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Personal Bio Section */}
          <div
            ref={bioRef as any}
            className={`lg:col-span-2 fade-in-up ${bioInView ? 'visible' : ''}`}
          >
            <Link href="/" className="inline-block mb-6">
              <h2 className="text-2xl font-bold tracking-tighter">
                PRINCE<span className="text-cyan-400">.MAHMUD</span>
              </h2>
            </Link>
            <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
              A passionate Full-stack Developer crafting seamless digital
              experiences. Let&apos;s build something amazing together.
            </p>

            {/* CTA for Collaboration */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-cyan-400 hover:text-black transition-all duration-300 flex items-center gap-2 group"
              >
                Reach Me
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex gap-2">
                {socialLinks.map((social, i) => (
                  <Link
                    key={i}
                    href={social.href}
                    className="p-2.5 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 text-gray-400 hover:text-white" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Link Groups */}
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <div
              key={category}
              ref={idx === 0 ? (linksRef as any) : null}
              className={`fade-in-up ${linksInView ? 'visible' : ''}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500 mb-6">
                {category}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-all duration-300 text-sm flex items-center group gap-1"
                    >
                      {link.name}
                      {category === 'presence' && (
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 border-y border-white/5">
          <div className="flex items-center gap-3 text-gray-400">
            <Mail className="w-4 h-4 text-cyan-500" />
            <span className="text-sm">princemahmudppiyas@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <Phone className="w-4 h-4 text-cyan-500" />
            <span className="text-sm">+880 17772-33703</span>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <MapPin className="w-4 h-4 text-cyan-500" />
            <span className="text-sm">Rangpur City, Bangladesh</span>
          </div>
        </div>

        {/* Copyright Area */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs tracking-widest uppercase">
          <p>© {currentYear} ALL RIGHTS RESERVED</p>
          <div className="flex items-center gap-2">
            MADE WITH <Heart className="w-3 h-3 text-red-500 fill-red-500" /> BY
            PRINCE
          </div>
        </div>
      </div>

      {/* Bottom Aesthetic Line */}
      <div className="h-1 w-full bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />
    </footer>
  );
}
