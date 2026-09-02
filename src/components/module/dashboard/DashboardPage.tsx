'use client';

import { useState } from 'react';
import Sidebar, { DashboardTab } from './Sidebar';
import DashboardHeader from './DashboardHeader';
import DashboardOverview from './DashboardOverview';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  FolderGit2,
  BookOpen,
  Plus,
  Search,
  Trash2,
  Edit,
  Eye,
  ExternalLink,
  Shield,
  Server,
  RefreshCw,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();

  const projectsData = [
    {
      id: 1,
      title: 'Real-time Autonomous AI Multi-Agent Mesh',
      category: 'AI / Distributed',
      liveUrl: 'https://pmppiyas.vercel.app',
      githubUrl: 'https://github.com/pmppiyas',
      views: 3420,
      isFeatured: true,
      updatedAt: '2026-03-01',
    },
    {
      id: 2,
      title: 'High-Performance E-Commerce Microservices Engine',
      category: 'Full-Stack',
      liveUrl: 'https://pmppiyas.vercel.app',
      githubUrl: 'https://github.com/pmppiyas',
      views: 2150,
      isFeatured: true,
      updatedAt: '2026-02-24',
    },
    {
      id: 3,
      title: 'Automated Utility Billing & Shape Generator Hub',
      category: 'Next.js Tools',
      liveUrl: 'https://pmppiyas.vercel.app/tools',
      githubUrl: 'https://github.com/pmppiyas',
      views: 1890,
      isFeatured: false,
      updatedAt: '2026-02-15',
    },
  ];

  // Demo Blog Data
  const blogsData = [
    {
      id: 1,
      title: 'Designing Zero-Trust Real-time Web Applications with Next.js 16',
      author: 'Prince Mahmud Piyas',
      views: 1420,
      tags: ['Next.js', 'Security', 'TypeScript'],
      updatedAt: '2026-03-01',
    },
    {
      id: 2,
      title: 'Architecting Distributed Workflows with NestJS and Vector DBs',
      author: 'Prince Mahmud Piyas',
      views: 980,
      tags: ['NestJS', 'PostgreSQL', 'AI'],
      updatedAt: '2026-02-20',
    },
    {
      id: 3,
      title: 'State Management and Performance Optimizations in React 19',
      author: 'Prince Mahmud Piyas',
      views: 750,
      tags: ['React 19', 'Frontend', 'WebPerf'],
      updatedAt: '2026-02-10',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Dynamic Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content Area */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${
          isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Sticky Dashboard Header */}
        <DashboardHeader
          activeTab={activeTab}
          setIsMobileOpen={setIsMobileOpen}
          isCollapsed={isCollapsed}
        />

        {/* Dynamic Viewport Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <DashboardOverview onNavigateTab={setActiveTab} />
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-6 font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2
                    className="text-xl font-black text-white tracking-tight"
                    style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
                  >
                    PROJECTS // REPOSITORY
                  </h2>
                  <p className="text-xs text-gray-400">
                    Manage showcase portfolio projects and live links.
                  </p>
                </div>
                <Button
                  onClick={() =>
                    toast.info('Project creation modal will deploy soon.')
                  }
                  className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider h-9 shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>NEW_PROJECT</span>
                </Button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <Input
                  placeholder="Search projects by title or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-950/80 border-white/10 focus:border-cyan-400 text-xs h-10 rounded-xl"
                />
              </div>

              {/* Projects Table */}
              <Card className="bg-gray-950/80 border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/5 border-b border-white/10 text-gray-400 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3.5 px-4">Title</th>
                        <th className="py-3.5 px-4">Category</th>
                        <th className="py-3.5 px-4">Views</th>
                        <th className="py-3.5 px-4">Featured</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {projectsData
                        .filter(
                          (p) =>
                            p.title
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) ||
                            p.category
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                        )
                        .map((project) => (
                          <tr
                            key={project.id}
                            className="hover:bg-white/[0.02] transition-colors"
                          >
                            <td className="py-3.5 px-4 font-bold text-white max-w-[240px] truncate">
                              {project.title}
                            </td>
                            <td className="py-3.5 px-4">
                              <Badge
                                variant="outline"
                                className="border-cyan-500/30 text-cyan-300 bg-cyan-500/10 text-[9px]"
                              >
                                {project.category}
                              </Badge>
                            </td>
                            <td className="py-3.5 px-4 text-gray-400">
                              {project.views}
                            </td>
                            <td className="py-3.5 px-4">
                              {project.isFeatured ? (
                                <Badge
                                  variant="outline"
                                  className="border-green-500/30 text-green-400 bg-green-500/10 text-[9px]"
                                >
                                  YES
                                </Badge>
                              ) : (
                                <span className="text-gray-500 text-[10px]">
                                  NO
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-white/5 transition-colors"
                                  title="View Live Project"
                                >
                                  <ExternalLink size={14} />
                                </a>
                                <button
                                  onClick={() =>
                                    toast.info(`Edit project #${project.id}`)
                                  }
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                                  title="Edit"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  onClick={() =>
                                    toast.error(
                                      `Project #${project.id} deletion requested`
                                    )
                                  }
                                  className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors cursor-pointer"
                                  title="Delete"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* BLOGS TAB */}
          {activeTab === 'blogs' && (
            <div className="space-y-6 font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2
                    className="text-xl font-black text-white tracking-tight"
                    style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
                  >
                    ARTICLES // PUBLICATIONS
                  </h2>
                  <p className="text-xs text-gray-400">
                    Draft, publish, and manage tech blog articles.
                  </p>
                </div>
                <Button
                  onClick={() =>
                    toast.info('Blog article creator will deploy soon.')
                  }
                  className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider h-9 shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>WRITE_ARTICLE</span>
                </Button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <Input
                  placeholder="Search articles by title or tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-950/80 border-white/10 focus:border-cyan-400 text-xs h-10 rounded-xl"
                />
              </div>

              {/* Blogs Table */}
              <Card className="bg-gray-950/80 border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/5 border-b border-white/10 text-gray-400 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3.5 px-4">Article Title</th>
                        <th className="py-3.5 px-4">Author</th>
                        <th className="py-3.5 px-4">Tags</th>
                        <th className="py-3.5 px-4">Views</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {blogsData
                        .filter(
                          (b) =>
                            b.title
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) ||
                            b.tags.some((t) =>
                              t
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                            )
                        )
                        .map((blog) => (
                          <tr
                            key={blog.id}
                            className="hover:bg-white/[0.02] transition-colors"
                          >
                            <td className="py-3.5 px-4 font-bold text-white max-w-[280px] truncate">
                              {blog.title}
                            </td>
                            <td className="py-3.5 px-4 text-gray-300">
                              {blog.author}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex flex-wrap gap-1">
                                {blog.tags.map((tag, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="outline"
                                    className="border-cyan-500/20 text-cyan-400 bg-cyan-500/5 text-[9px]"
                                  >
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-gray-400">
                              {blog.views}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <a
                                  href={`/blogs/${blog.id}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-white/5 transition-colors"
                                  title="View Public Blog"
                                >
                                  <Eye size={14} />
                                </a>
                                <button
                                  onClick={() =>
                                    toast.info(`Edit blog #${blog.id}`)
                                  }
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                                  title="Edit"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  onClick={() =>
                                    toast.error(
                                      `Delete blog #${blog.id} requested`
                                    )
                                  }
                                  className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors cursor-pointer"
                                  title="Delete"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-6 font-mono">
              <div>
                <h2
                  className="text-xl font-black text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
                >
                  SYSTEM // TELEMETRY_CONFIG
                </h2>
                <p className="text-xs text-gray-400">
                  Manage environment parameters, cookies, and system cache.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gray-950/80 border-white/10 rounded-2xl shadow-xl p-5 space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                    <Server size={16} className="text-cyan-400" />
                    <span className="font-bold text-sm text-white">
                      ENVIRONMENT_METRICS
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-gray-400">
                    <div className="flex justify-between p-2 rounded-lg bg-black/40">
                      <span>NEXT_PUBLIC_BACKEND_URL</span>
                      <span className="text-cyan-300">Active</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-black/40">
                      <span>MIDDLEWARE_PROTECTION</span>
                      <span className="text-green-400">Edge Guard Active</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-black/40">
                      <span>SESSION_STORAGE</span>
                      <span className="text-white">
                        Cookie (portfolio_admin_user)
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="bg-gray-950/80 border-white/10 rounded-2xl shadow-xl p-5 space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                    <Shield size={16} className="text-purple-400" />
                    <span className="font-bold text-sm text-white">
                      QUICK_DISPATCH_COMMANDS
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <Button
                      onClick={() =>
                        toast.success('Application cache purged successfully.')
                      }
                      variant="outline"
                      className="w-full justify-between text-xs h-10 border-white/10 hover:border-cyan-400 text-gray-300 hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <RefreshCw size={14} className="text-cyan-400" />
                        <span>PURGE_EDGE_CACHE</span>
                      </span>
                      <span>[ EXECUTE ]</span>
                    </Button>

                    <Button
                      onClick={() => {
                        logout();
                        toast.info('Session terminated.');
                        window.location.href = '/login';
                      }}
                      variant="destructive"
                      className="w-full justify-between text-xs h-10 bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-300 hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <LogOut size={14} />
                        <span>TERMINATE_SESSION // LOGOUT</span>
                      </span>
                      <span>[ QUIT ]</span>
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
