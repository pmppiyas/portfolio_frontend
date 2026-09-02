'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FolderGit2,
  BookOpen,
  Eye,
  ShieldCheck,
  Plus,
  ArrowUpRight,
  Sparkles,
  Server,
  Activity,
  Terminal,
} from 'lucide-react';
import Link from 'next/link';
import { DashboardTab } from './Sidebar';

interface DashboardOverviewProps {
  onNavigateTab: (tab: DashboardTab) => void;
}

export default function DashboardOverview({ onNavigateTab }: DashboardOverviewProps) {
  const stats = [
    {
      title: 'ACTIVE_PROJECTS',
      value: '14',
      change: '+2 this month',
      icon: FolderGit2,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10 border-cyan-500/30',
      tab: 'projects' as DashboardTab,
    },
    {
      title: 'DISPATCHED_ARTICLES',
      value: '08',
      change: '100% indexed',
      icon: BookOpen,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/30',
      tab: 'blogs' as DashboardTab,
    },
    {
      title: 'TOTAL_TELEMETRY_VIEWS',
      value: '24.8K',
      change: '+18.4% engagement',
      icon: Eye,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10 border-green-500/30',
      tab: 'overview' as DashboardTab,
    },
    {
      title: 'SECURITY_INTEGRITY',
      value: '99.9%',
      change: 'Zero-Trust SSL',
      icon: ShieldCheck,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10 border-yellow-500/30',
      tab: 'settings' as DashboardTab,
    },
  ];

  const recentItems = [
    {
      type: 'BLOG',
      title: 'Building Real-time AI Agent Orchestration with Next.js 16',
      date: '2026-03-01',
      views: '1,420',
      badge: 'AI Systems',
      status: 'PUBLISHED',
    },
    {
      type: 'PROJECT',
      title: 'Autonomous Distributed Mesh Telemetry Platform',
      date: '2026-02-28',
      views: '3,890',
      badge: 'Full-Stack',
      status: 'ACTIVE',
    },
    {
      type: 'BLOG',
      title: 'Optimizing High-Throughput Microservices with NestJS & Prisma',
      date: '2026-02-20',
      views: '980',
      badge: 'Architecture',
      status: 'PUBLISHED',
    },
  ];

  return (
    <div className="space-y-6 font-mono text-white">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-gray-950 via-cyan-950/30 to-gray-950 p-6 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-cyan-500/40 text-cyan-300 bg-cyan-500/10 text-[10px] uppercase tracking-wider"
              >
                <Sparkles size={11} className="mr-1 text-cyan-400" />
                COMMAND_CENTER // ACTIVE
              </Badge>
              <span className="text-gray-500 text-xs">SYS_REV: v2.4</span>
            </div>
            <h1
              className="text-xl sm:text-2xl font-black tracking-tight text-white"
              style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
            >
              WELCOME BACK, <span className="text-cyan-400">PRINCE MAHMUD</span>
            </h1>
            <p className="text-xs text-gray-400 max-w-xl">
              All portfolio subsystems, database sync nodes, and edge APIs are operational. Review recent telemetry data below.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={() => onNavigateTab('blogs')}
              className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider h-9 shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Plus size={14} />
              <span>DRAFT_ARTICLE</span>
            </Button>
            <Button
              onClick={() => onNavigateTab('projects')}
              variant="outline"
              className="border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 font-bold text-xs uppercase tracking-wider h-9 cursor-pointer flex items-center gap-1.5"
            >
              <Plus size={14} />
              <span>NEW_PROJECT</span>
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card
              key={idx}
              onClick={() => onNavigateTab(stat.tab)}
              className="relative overflow-hidden bg-gray-950/80 border-white/10 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-0.5 shadow-lg group cursor-pointer"
            >
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className={`p-2 rounded-lg border ${stat.bgColor}`}>
                  <Icon size={16} className={stat.color} />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div
                  className="text-2xl font-black text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
                >
                  {stat.value}
                </div>
                <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                  <span className="text-green-400 font-bold">{stat.change}</span>
                </p>
              </CardContent>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Card>
          );
        })}
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Dispatch Feed (2 cols) */}
        <Card className="lg:col-span-2 bg-gray-950/80 border-white/10 rounded-2xl shadow-xl overflow-hidden">
          <CardHeader className="border-b border-white/10 pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle
                className="text-base font-bold text-white tracking-tight"
                style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
              >
                RECENT_DISPATCHES
              </CardTitle>
              <p className="text-[10px] text-gray-400">
                Live portfolio articles and deployed project telemetry.
              </p>
            </div>
            <Button
              onClick={() => onNavigateTab('blogs')}
              variant="ghost"
              className="text-cyan-400 hover:text-cyan-300 text-xs font-mono h-8 px-2"
            >
              <span>VIEW_ALL</span>
              <ArrowUpRight size={13} className="ml-1" />
            </Button>
          </CardHeader>

          <CardContent className="p-0 divide-y divide-white/5">
            {recentItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="border-cyan-500/30 text-cyan-300 bg-cyan-500/10 text-[9px]"
                    >
                      {item.type}
                    </Badge>
                    <span className="text-[10px] text-gray-500">{item.date}</span>
                  </div>
                  <div className="text-xs font-bold text-gray-200 hover:text-cyan-300 transition-colors cursor-pointer">
                    {item.title}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs self-end sm:self-center shrink-0">
                  <span className="flex items-center gap-1 text-gray-400 text-[11px]">
                    <Eye size={13} className="text-cyan-400" />
                    <span>{item.views}</span>
                  </span>
                  <Badge
                    variant="outline"
                    className="border-green-500/30 text-green-400 bg-green-500/10 text-[9px]"
                  >
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Diagnostics Card (1 col) */}
        <Card className="bg-gray-950/80 border-white/10 rounded-2xl shadow-xl overflow-hidden flex flex-col">
          <CardHeader className="border-b border-white/10 pb-3">
            <CardTitle
              className="text-base font-bold text-white tracking-tight flex items-center gap-2"
              style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
            >
              <Activity size={16} className="text-green-400 animate-pulse" />
              <span>DIAGNOSTICS</span>
            </CardTitle>
            <p className="text-[10px] text-gray-400">
              Live server &amp; database telemetry status.
            </p>
          </CardHeader>

          <CardContent className="p-4 space-y-3.5 text-xs flex-1">
            <div className="p-3 rounded-xl bg-black/60 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-gray-400">
                <span>NODE_ENV:</span>
                <span className="text-cyan-300 font-bold">production</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>DATABASE_ENGINE:</span>
                <span className="text-white font-bold">PostgreSQL / Neon</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>EDGE_RUNTIME:</span>
                <span className="text-green-400 font-bold">Next.js 16 Active</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>AUTH_PROTOCOL:</span>
                <span className="text-cyan-400 font-bold">Cookie-Lax-256</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <Link href="/blogs" className="block w-full">
                <Button
                  variant="outline"
                  className="w-full justify-between text-xs h-9 border-white/10 hover:border-cyan-500/40 text-gray-300 hover:text-white"
                >
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={13} className="text-cyan-400" />
                    <span>PUBLIC_BLOG_VIEW</span>
                  </span>
                  <span>➔</span>
                </Button>
              </Link>

              <Link href="/projects" className="block w-full">
                <Button
                  variant="outline"
                  className="w-full justify-between text-xs h-9 border-white/10 hover:border-cyan-500/40 text-gray-300 hover:text-white"
                >
                  <span className="flex items-center gap-1.5">
                    <FolderGit2 size={13} className="text-purple-400" />
                    <span>PUBLIC_PROJECTS_VIEW</span>
                  </span>
                  <span>➔</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
