'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FolderGit2,
  BookOpen,
  Settings,
  LogOut,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  X,
  Radio,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export type DashboardTab = 'overview' | 'projects' | 'blogs' | 'settings';

interface SidebarProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const navItems: { id: DashboardTab; label: string; icon: any; badge?: string }[] = [
    {
      id: 'overview',
      label: 'OVERVIEW',
      icon: LayoutDashboard,
    },
    {
      id: 'projects',
      label: 'PROJECTS',
      icon: FolderGit2,
    },
    {
      id: 'blogs',
      label: 'BLOG_ARTICLES',
      icon: BookOpen,
    },
    {
      id: 'settings',
      label: 'SYS_SETTINGS',
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    logout();
    toast.info('Session terminated successfully.');
    router.replace('/login');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-gray-950/95 backdrop-blur-2xl border-r border-cyan-500/20 text-white select-none relative">
      {/* Ambient Grid Effect */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(34,211,238,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.4) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top Header */}
      <div className="h-16 border-b border-white/10 px-4 flex items-center justify-between shrink-0">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-cyan-400 font-mono text-lg font-bold">[</span>
          <span
            className="font-black tracking-tight text-base sm:text-lg group-hover:text-cyan-300 transition-colors"
            style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
          >
            {isCollapsed ? 'P' : 'PRINCE'}<span className="text-cyan-400">.</span>{!isCollapsed && 'SYS'}
          </span>
          <span className="text-cyan-400 font-mono text-lg font-bold">]</span>
        </Link>

        {/* Mobile close button */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Desktop collapse toggle */}
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="hidden lg:flex p-1.5 rounded-lg text-gray-500 hover:text-cyan-400 hover:bg-white/5 border border-transparent hover:border-cyan-500/30 transition-colors cursor-pointer"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* User Telemetry Chip */}
      <div className="p-3 border-b border-white/10 shrink-0">
        <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 font-bold font-mono text-xs">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1 font-mono">
              <div className="text-xs font-bold text-white truncate">
                {user?.name || 'Administrator'}
              </div>
              <div className="flex items-center gap-1 text-[10px] text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="truncate">SUPER_ADMIN</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto font-mono">
        <div className="px-2 pb-1.5 text-[9.5px] font-bold text-gray-500 tracking-wider">
          {!isCollapsed ? '// CORE_DISPATCH' : '//'}
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileOpen(false);
              }}
              title={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-cyan-500/15 border border-cyan-400/80 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                  : 'border border-transparent text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/10'
              } ${isCollapsed ? 'justify-center px-0' : ''}`}
            >
              <Icon size={16} className={isActive ? 'text-cyan-400' : 'text-gray-400'} />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
              {!isCollapsed && isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Telemetry & Actions */}
      <div className="p-3 border-t border-white/10 space-y-2 shrink-0 font-mono">
        {/* Visit Portfolio Link */}
        <Link
          href="/"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-cyan-300 hover:bg-white/5 border border-transparent hover:border-cyan-500/30 transition-all cursor-pointer ${
            isCollapsed ? 'justify-center px-0' : ''
          }`}
          title="Visit Live Portfolio"
        >
          <ExternalLink size={15} />
          {!isCollapsed && <span>VISIT_PORTFOLIO</span>}
        </Link>

        {/* Terminate Session / Logout */}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-transparent hover:border-red-500/30 transition-all cursor-pointer ${
            isCollapsed ? 'justify-center px-0' : ''
          }`}
          title="Terminate Session"
        >
          <LogOut size={15} />
          {!isCollapsed && <span>[ LOGOUT ]</span>}
        </button>

        {/* Security watermark */}
        {!isCollapsed && (
          <div className="pt-2 px-1 flex items-center justify-between text-[9px] text-gray-600">
            <span className="flex items-center gap-1">
              <Radio size={10} className="text-green-500" />
              <span>TLS_256_ACTIVE</span>
            </span>
            <span>SYS_0xADM</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:block h-screen fixed top-0 left-0 z-30 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-screen w-72 z-50 transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40 cursor-pointer"
        />
      )}
    </>
  );
}
