'use client';

import { Menu, Radio, Shield, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { DashboardTab } from './Sidebar';

interface DashboardHeaderProps {
  activeTab: DashboardTab;
  setIsMobileOpen: (open: boolean) => void;
  isCollapsed: boolean;
}

export default function DashboardHeader({
  activeTab,
  setIsMobileOpen,
  isCollapsed,
}: DashboardHeaderProps) {
  const tabTitles: Record<DashboardTab, string> = {
    overview: 'SYSTEM_OVERVIEW // TELEMETRY',
    projects: 'PROJECTS_PORTFOLIO // REGISTRY',
    blogs: 'ARTICLES_PUBLICATIONS // DISPATCH',
    settings: 'ENVIRONMENT // SYSTEM_SETTINGS',
  };

  return (
    <header className="h-16 border-b border-cyan-500/20 bg-gray-950/80 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 font-mono">
      {/* Left side: Hamburger + Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-cyan-400 hover:bg-white/10 cursor-pointer"
          aria-label="Open mobile menu"
        >
          <Menu size={18} />
        </button>

        {/* Cyber Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500 hidden sm:inline">SYS.ROOT</span>
          <span className="text-gray-600 hidden sm:inline">&gt;</span>
          <span className="text-cyan-400 font-bold tracking-wider">
            {tabTitles[activeTab]}
          </span>
        </div>
      </div>

      {/* Right side: Status and Live Site Link */}
      <div className="flex items-center gap-3 text-xs">
        {/* Live system telemetry badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span>SERVER_ONLINE [200_OK]</span>
        </div>

        {/* View Portfolio Button */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-[11px] uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <ExternalLink size={12} />
          <span className="hidden sm:inline">VIEW_SITE</span>
        </Link>
      </div>
    </header>
  );
}
