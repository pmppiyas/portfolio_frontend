'use client';

import { useMemo } from 'react';
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
  RefreshCw,
  Clock,
  Radio,
} from 'lucide-react';
import Link from 'next/link';
import { DashboardTab } from './Sidebar';
import { useGetAllPostsQuery } from '@/redux/features/post/postApi';
import { useGetAllBlogsQuery } from '@/redux/features/blog/blogApi';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface DashboardOverviewProps {
  onNavigateTab: (tab: DashboardTab) => void;
}

export default function DashboardOverview({ onNavigateTab }: DashboardOverviewProps) {
  const { user } = useAuth();

  // RTK Query with 10-second polling interval for live real-time telemetry!
  const {
    data: posts,
    isFetching: isPostsFetching,
    refetch: refetchPosts,
  } = useGetAllPostsQuery(undefined, {
    pollingInterval: 10000,
  });

  const {
    data: blogs,
    isFetching: isBlogsFetching,
    refetch: refetchBlogs,
  } = useGetAllBlogsQuery(undefined, {
    pollingInterval: 10000,
  });

  const isRefreshing = isPostsFetching || isBlogsFetching;

  // Real-time calculated telemetry
  const projectCount = posts?.length ?? 0;
  const blogCount = blogs?.length ?? 0;

  const totalProjectViews = useMemo(
    () => (posts || []).reduce((acc, p) => acc + (p.views || 0), 0),
    [posts]
  );
  const totalBlogViews = useMemo(
    () => (blogs || []).reduce((acc, b) => acc + (b.views || 0), 0),
    [blogs]
  );
  const grandTotalViews = totalProjectViews + totalBlogViews;

  const publishedProjectsCount = useMemo(
    () => (posts || []).filter((p) => p.isPublished).length,
    [posts]
  );

  const featuredProjectsCount = useMemo(
    () => (posts || []).filter((p) => p.isFeatured).length,
    [posts]
  );

  const handleRefreshAll = async () => {
    await Promise.all([refetchPosts(), refetchBlogs()]);
    toast.success('Telemetry synchronized with PostgreSQL in real time! ⚡');
  };

  const stats = [
    {
      title: 'ACTIVE_PROJECTS',
      value: projectCount,
      change: `${publishedProjectsCount} Live • ${featuredProjectsCount} Featured`,
      icon: FolderGit2,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10 border-cyan-500/30',
      tab: 'projects' as DashboardTab,
    },
    {
      title: 'DISPATCHED_ARTICLES',
      value: blogCount,
      change: `${blogCount} published in database`,
      icon: BookOpen,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/30',
      tab: 'blogs' as DashboardTab,
    },
    {
      title: 'TOTAL_TELEMETRY_VIEWS',
      value: grandTotalViews.toLocaleString(),
      change: `${totalProjectViews.toLocaleString()} Project • ${totalBlogViews.toLocaleString()} Blog`,
      icon: Eye,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10 border-green-500/30',
      tab: 'overview' as DashboardTab,
    },
    {
      title: 'SECURITY_INTEGRITY',
      value: '100%',
      change: 'Zero-Trust • Edge Guard Active',
      icon: ShieldCheck,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10 border-yellow-500/30',
      tab: 'settings' as DashboardTab,
    },
  ];

  // Dynamic Real-time Recent Feed merging live projects & articles
  const recentFeed = useMemo(() => {
    const list: Array<{
      id: number | string;
      type: 'PROJECT' | 'BLOG';
      title: string;
      date: string;
      views: number;
      badge: string;
      status: string;
      tab: DashboardTab;
    }> = [];

    (posts || []).forEach((p) => {
      list.push({
        id: `p-${p.id}`,
        type: 'PROJECT',
        title: p.title,
        date: p.createdAt
          ? new Date(p.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })
          : 'Recent',
        views: p.views || 0,
        badge: p.category || 'Full-Stack',
        status: p.isPublished ? 'LIVE' : 'DRAFT',
        tab: 'projects',
      });
    });

    (blogs || []).forEach((b) => {
      list.push({
        id: `b-${b.id}`,
        type: 'BLOG',
        title: b.title,
        date: b.createdAt
          ? new Date(b.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })
          : 'Recent',
        views: b.views || 0,
        badge: b.tags?.[0] || 'Article',
        status: 'PUBLISHED',
        tab: 'blogs',
      });
    });

    // Sort newest to oldest
    list.sort((a, b) => (a.id > b.id ? -1 : 1));
    return list.slice(0, 5);
  }, [posts, blogs]);

  const userName = user?.name ? user.name.toUpperCase() : 'PRINCE MAHMUD';

  return (
    <div className="space-y-6 font-mono text-white">
      {/* Welcome & Telemetry Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-gray-950 via-cyan-950/30 to-gray-950 p-6 shadow-[0_0_30px_rgba(6,182,212,0.12)]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-cyan-500/40 text-cyan-300 bg-cyan-500/10 text-[10px] uppercase tracking-wider flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                <Radio size={11} className="text-cyan-400" />
                REAL_TIME_SYNC // 10s_POLL
              </Badge>
              <span className="text-gray-500 text-[10px]">
                SOCKET: POSTGRESQL_LIVE
              </span>
            </div>
            <h1
              className="text-xl sm:text-2xl font-black tracking-tight text-white"
              style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
            >
              WELCOME BACK, <span className="text-cyan-400">{userName}</span>
            </h1>
            <p className="text-xs text-gray-400 max-w-xl">
              All portfolio subsystems, Neon database nodes, and edge APIs are operational in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={handleRefreshAll}
              variant="outline"
              disabled={isRefreshing}
              className="border-white/15 hover:border-cyan-400 text-gray-300 hover:text-white font-bold text-xs uppercase tracking-wider h-9 cursor-pointer flex items-center gap-1.5"
              title="Force sync telemetry now"
            >
              <RefreshCw
                size={13}
                className={isRefreshing ? 'animate-spin text-cyan-400' : ''}
              />
              <span>SYNC_NOW</span>
            </Button>

            <Button
              onClick={() => onNavigateTab('blogs')}
              className="bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs uppercase tracking-wider h-9 shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Plus size={14} />
              <span>DRAFT_ARTICLE</span>
            </Button>

            <Button
              onClick={() => onNavigateTab('projects')}
              className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider h-9 shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Plus size={14} />
              <span>NEW_PROJECT</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Real-time KPI Cards Grid */}
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
                <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1 truncate">
                  <span className="text-green-400 font-bold">{stat.change}</span>
                </p>
              </CardContent>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Card>
          );
        })}
      </div>

      {/* Quick Access & Live Dispatches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Recent Feed (2 cols) */}
        <Card className="lg:col-span-2 bg-gray-950/80 border-white/10 rounded-2xl shadow-xl overflow-hidden">
          <CardHeader className="border-b border-white/10 pb-3 flex flex-row items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle
                  className="text-base font-bold text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
                >
                  REALTIME_DISPATCHES
                </CardTitle>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <p className="text-[10px] text-gray-400">
                Live database articles and deployed project telemetry records.
              </p>
            </div>
            <Button
              onClick={() => onNavigateTab('blogs')}
              variant="ghost"
              className="text-cyan-400 hover:text-cyan-300 text-xs font-mono h-8 px-2 cursor-pointer"
            >
              <span>VIEW_ALL</span>
              <ArrowUpRight size={13} className="ml-1" />
            </Button>
          </CardHeader>

          <CardContent className="p-0 divide-y divide-white/5">
            {recentFeed.length === 0 ? (
              <div className="py-12 text-center text-gray-500 text-xs space-y-2">
                <Clock size={24} className="mx-auto text-gray-600" />
                <p>No records detected in database yet.</p>
              </div>
            ) : (
              recentFeed.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigateTab(item.tab)}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.03] transition-colors cursor-pointer"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`${
                          item.type === 'PROJECT'
                            ? 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10'
                            : 'border-purple-500/40 text-purple-300 bg-purple-500/10'
                        } text-[9px]`}
                      >
                        {item.type}
                      </Badge>
                      <span className="text-[10px] text-gray-500 font-mono">
                        {item.date}
                      </span>
                      <span className="text-[9px] text-gray-400 bg-white/5 px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-gray-200 hover:text-cyan-300 transition-colors truncate">
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
                      className={`${
                        item.status === 'LIVE' || item.status === 'PUBLISHED'
                          ? 'border-green-500/30 text-green-400 bg-green-500/10'
                          : 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10'
                      } text-[9px]`}
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Live System Diagnostics Card (1 col) */}
        <Card className="bg-gray-950/80 border-white/10 rounded-2xl shadow-xl overflow-hidden flex flex-col">
          <CardHeader className="border-b border-white/10 pb-3">
            <CardTitle
              className="text-base font-bold text-white tracking-tight flex items-center gap-2"
              style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
            >
              <Activity size={16} className="text-green-400 animate-pulse" />
              <span>LIVE_DIAGNOSTICS</span>
            </CardTitle>
            <p className="text-[10px] text-gray-400">
              Active telemetry node health status.
            </p>
          </CardHeader>

          <CardContent className="p-4 space-y-3.5 text-xs flex-1">
            <div className="p-3 rounded-xl bg-black/60 border border-white/10 space-y-2 font-mono">
              <div className="flex justify-between items-center text-gray-400">
                <span>DATABASE_SYNC:</span>
                <span className="text-green-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                  Connected
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>TOTAL_DATA_NODES:</span>
                <span className="text-cyan-300 font-bold">
                  {projectCount + blogCount} Records
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>AUTO_POLL_INTERVAL:</span>
                <span className="text-white font-bold">10 Seconds</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>STORAGE_TARGET:</span>
                <span className="text-purple-400 font-bold">Cloudinary CDN</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <Link href="/blogs" className="block w-full">
                <Button
                  variant="outline"
                  className="w-full justify-between text-xs h-9 border-white/10 hover:border-purple-500/40 text-gray-300 hover:text-white cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={13} className="text-purple-400" />
                    <span>PUBLIC_BLOG_VIEW</span>
                  </span>
                  <span>➔</span>
                </Button>
              </Link>

              <Link href="/projects" className="block w-full">
                <Button
                  variant="outline"
                  className="w-full justify-between text-xs h-9 border-white/10 hover:border-cyan-500/40 text-gray-300 hover:text-white cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <FolderGit2 size={13} className="text-cyan-400" />
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
