'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import {
  FolderGit2,
  Plus,
  Search,
  LayoutGrid,
  Table as TableIcon,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Github,
  Globe,
  Sparkles,
  Layers,
  Filter,
  RefreshCw,
  SlidersHorizontal,
} from 'lucide-react';
import {
  useGetAllPostsQuery,
  useDeletePostMutation,
} from '@/redux/features/post/postApi';
import { IPost } from '@/types';
import { toast } from 'sonner';
import PostModal from './PostModal';
import PostViewModal from './PostViewModal';

export default function PostsView() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'FEATURED' | 'PUBLISHED' | 'DRAFT'>('ALL');

  // Modal states
  const [isCreateEditModalOpen, setIsCreateEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

  // RTK Query
  const { data: posts, isLoading, isFetching, refetch } = useGetAllPostsQuery();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  // Fallback demo projects if database has 0 items
  const demoFallbackPosts: IPost[] = [
    {
      id: 1,
      title: 'Real-time Autonomous AI Multi-Agent Mesh',
      description: 'Distributed coordination layer for multi-agent reasoning, dynamic tool selection, and streaming LLM telemetry.',
      category: 'AI / Distributed',
      liveUrl: 'https://pmppiyas.vercel.app',
      githubUrl: 'https://github.com/pmppiyas',
      backendGithubUrl: 'https://github.com/pmppiyas',
      thumbnail: 'https://i.ibb.co.com/fV500sDk/download-2.jpg',
      tags: ['Next.js 16', 'TypeScript', 'LangChain', 'Neon'],
      serial: 1,
      views: 3420,
      isFeatured: true,
      isPublished: true,
      createdAt: '2026-03-01',
      updatedAt: '2026-03-01',
    },
    {
      id: 2,
      title: 'High-Performance E-Commerce Microservices Engine',
      description: 'Ultra-low latency commerce backend with Redis cache invalidation, Stripe webhooks, and Prisma PostgreSQL cluster.',
      category: 'Full-Stack',
      liveUrl: 'https://pmppiyas.vercel.app',
      githubUrl: 'https://github.com/pmppiyas',
      thumbnail: 'https://i.ibb.co.com/fV500sDk/download-2.jpg',
      tags: ['NestJS', 'PostgreSQL', 'Redis', 'Docker'],
      serial: 2,
      views: 2150,
      isFeatured: true,
      isPublished: true,
      createdAt: '2026-02-24',
      updatedAt: '2026-02-24',
    },
    {
      id: 3,
      title: 'Automated Utility Billing & Shape Generator Hub',
      description: 'Interactive canvas visualizer for procedural SVG shapes and dynamic calculation matrix for multi-tariff utility bills.',
      category: 'Next.js Tools',
      liveUrl: 'https://pmppiyas.vercel.app/tools',
      githubUrl: 'https://github.com/pmppiyas',
      thumbnail: 'https://i.ibb.co.com/fV500sDk/download-2.jpg',
      tags: ['Next.js', 'Tailwind', 'Canvas', 'TypeScript'],
      serial: 3,
      views: 1890,
      isFeatured: false,
      isPublished: true,
      createdAt: '2026-02-15',
      updatedAt: '2026-02-15',
    },
  ];

  const currentPosts: IPost[] = posts && posts.length > 0 ? posts : demoFallbackPosts;

  // Extract unique categories for filter pills
  const categories = useMemo(() => {
    const set = new Set<string>();
    currentPosts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['ALL', ...Array.from(set)];
  }, [currentPosts]);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return currentPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'ALL' || post.category === selectedCategory;

      let matchesStatus = true;
      if (statusFilter === 'FEATURED') matchesStatus = post.isFeatured;
      if (statusFilter === 'PUBLISHED') matchesStatus = post.isPublished;
      if (statusFilter === 'DRAFT') matchesStatus = !post.isPublished;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [currentPosts, searchQuery, selectedCategory, statusFilter]);

  // Telemetry metric counters
  const totalViews = useMemo(
    () => currentPosts.reduce((acc, p) => acc + (p.views || 0), 0),
    [currentPosts]
  );
  const featuredCount = useMemo(
    () => currentPosts.filter((p) => p.isFeatured).length,
    [currentPosts]
  );
  const publishedCount = useMemo(
    () => currentPosts.filter((p) => p.isPublished).length,
    [currentPosts]
  );

  // Actions
  const handleOpenCreate = () => {
    setSelectedPost(null);
    setIsCreateEditModalOpen(true);
  };

  const handleOpenEdit = (post: IPost) => {
    setSelectedPost(post);
    setIsCreateEditModalOpen(true);
  };

  const handleOpenView = (post: IPost) => {
    setSelectedPost(post);
    setIsViewModalOpen(true);
  };

  const handleDelete = async (id: number, title: string) => {
    if (confirm(`Are you sure you want to permanently delete project "${title}"?`)) {
      try {
        await deletePost(id).unwrap();
        toast.success(`Project "${title}" deleted from database! ✅`);
      } catch (err: any) {
        toast.error(err?.data?.message || err?.message || 'Failed to delete project.');
      }
    }
  };

  return (
    <div className="space-y-6 font-mono text-white">
      {/* Top Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-cyan-500/40 text-cyan-300 bg-cyan-500/10 text-[10px] uppercase tracking-wider"
            >
              <FolderGit2 size={11} className="mr-1 text-cyan-400" />
              DATABASE // REGISTRY
            </Badge>
            <span className="text-[10px] text-gray-500">
              {currentPosts.length} TOTAL DEPLOYMENTS
            </span>
          </div>
          <h2
            className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1"
            style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
          >
            PROJECTS &amp; POSTS VIEW
          </h2>
          <p className="text-xs text-gray-400">
            Real-time synchronization with PostgreSQL database via Redux Toolkit.
          </p>
        </div>

        {/* Top Actions: Refresh & New Project */}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              refetch();
              toast.info('Telemetry data refreshed.');
            }}
            variant="outline"
            disabled={isFetching}
            className="border-white/10 hover:border-cyan-500/40 text-gray-300 hover:text-white text-xs h-9 px-3 cursor-pointer flex items-center gap-1.5"
            title="Refresh database records"
          >
            <RefreshCw size={13} className={isFetching ? 'animate-spin text-cyan-400' : ''} />
            <span className="hidden sm:inline">REFRESH</span>
          </Button>

          <Button
            onClick={handleOpenCreate}
            className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider h-9 shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Plus size={14} />
            <span>DEPLOY_PROJECT</span>
          </Button>
        </div>
      </div>

      {/* Summary Telemetry Counter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-gray-950/80 border border-white/10 space-y-1">
          <span className="text-[10px] text-gray-400 uppercase block">TOTAL_POSTS</span>
          <div
            className="text-xl font-black text-white"
            style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
          >
            {currentPosts.length}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gray-950/80 border border-cyan-500/20 space-y-1">
          <span className="text-[10px] text-cyan-400 uppercase block">FEATURED</span>
          <div
            className="text-xl font-black text-cyan-300"
            style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
          >
            {featuredCount}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gray-950/80 border border-green-500/20 space-y-1">
          <span className="text-[10px] text-green-400 uppercase block">PUBLISHED</span>
          <div
            className="text-xl font-black text-green-400"
            style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
          >
            {publishedCount}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gray-950/80 border border-purple-500/20 space-y-1">
          <span className="text-[10px] text-purple-400 uppercase block">TOTAL_VIEWS</span>
          <div
            className="text-xl font-black text-purple-300"
            style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
          >
            {totalViews.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="p-4 rounded-2xl bg-gray-950/80 border border-white/10 space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <Input
              placeholder="Search by project title, tech tag, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-black/60 border-white/10 focus:border-cyan-400 text-xs h-9 rounded-xl"
            />
          </div>

          {/* Controls: Status Dropdown & Grid/Table Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-black/60 border border-white/10 text-gray-300 text-xs rounded-xl h-9 px-3 outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="ALL">STATUS: ALL</option>
              <option value="FEATURED">STATUS: FEATURED</option>
              <option value="PUBLISHED">STATUS: PUBLISHED</option>
              <option value="DRAFT">STATUS: DRAFT</option>
            </select>

            {/* View Mode Toggle Button Group */}
            <div className="flex items-center p-1 rounded-xl bg-black/60 border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-cyan-400 text-black font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Grid Cards View"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-cyan-400 text-black font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Table View"
              >
                <TableIcon size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] text-gray-500 mr-1 flex items-center gap-1">
            <Filter size={11} />
            <span>CATEGORY:</span>
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                    : 'bg-white/5 hover:bg-white/10 text-gray-400 border border-transparent'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="py-12 text-center text-gray-400 space-y-2 font-mono">
          <div className="w-8 h-8 mx-auto border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs">SYNCHRONIZING WITH POSTGRESQL POSTS...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredPosts.length === 0 && (
        <div className="py-16 text-center text-gray-400 space-y-3 bg-gray-950/40 rounded-2xl border border-white/5 font-mono">
          <FolderGit2 size={32} className="mx-auto text-gray-600" />
          <p className="text-sm font-bold text-gray-300">NO MATCHING PROJECTS FOUND</p>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Try adjusting your search query or category filters, or deploy a new project to the registry.
          </p>
          <Button
            onClick={handleOpenCreate}
            className="bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold uppercase h-8 mt-2"
          >
            <Plus size={13} className="mr-1" />
            DEPLOY FIRST PROJECT
          </Button>
        </div>
      )}

      {/* GRID CARDS VIEW */}
      {!isLoading && viewMode === 'grid' && filteredPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPosts.map((project) => (
            <Card
              key={project.id}
              className="relative overflow-hidden bg-gray-950/80 border-white/10 hover:border-cyan-500/50 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col group"
            >
              {/* Thumbnail Viewport */}
              <div className="relative h-44 w-full overflow-hidden bg-black/60 border-b border-white/10">
                <Image
                  src={
                    project.thumbnail ||
                    'https://i.ibb.co.com/fV500sDk/download-2.jpg'
                  }
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-85" />

                {/* Top Badges */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                  {project.isFeatured && (
                    <Badge className="bg-cyan-400 text-black font-black text-[9px] uppercase tracking-wider">
                      <Sparkles size={10} className="mr-0.5" />
                      FEATURED
                    </Badge>
                  )}
                  <Badge
                    variant="outline"
                    className={`${
                      project.isPublished
                        ? 'border-green-500/40 text-green-400 bg-black/70'
                        : 'border-yellow-500/40 text-yellow-400 bg-black/70'
                    } text-[9px]`}
                  >
                    {project.isPublished ? 'LIVE' : 'DRAFT'}
                  </Badge>
                </div>

                {/* Category Pill */}
                <div className="absolute bottom-2.5 left-2.5">
                  <Badge
                    variant="outline"
                    className="border-cyan-500/40 text-cyan-300 bg-black/80 font-mono text-[9px]"
                  >
                    {project.category || 'General'}
                  </Badge>
                </div>
              </div>

              {/* Card Content Area */}
              <CardContent className="p-4 space-y-3 flex-1 flex flex-col">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[9px] text-gray-500 font-mono">
                    <span>SERIAL #{project.serial}</span>
                    <span className="flex items-center gap-1 text-cyan-400/80">
                      <Eye size={11} />
                      <span>{project.views}</span>
                    </span>
                  </div>

                  <h3
                    onClick={() => handleOpenView(project)}
                    className="font-bold text-sm text-white hover:text-cyan-300 transition-colors cursor-pointer line-clamp-1"
                    style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
                  >
                    {project.title}
                  </h3>
                </div>

                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {project.tags?.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </CardContent>

              {/* Card Footer Actions */}
              <div className="p-3 border-t border-white/10 bg-black/40 flex items-center justify-between gap-2">
                {/* Outbound link */}
                <div className="flex items-center gap-1.5">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-white/5 transition-colors"
                      title="Open Live URL"
                    >
                      <Globe size={13} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-gray-400 hover:text-purple-400 hover:bg-white/5 transition-colors"
                      title="GitHub Client"
                    >
                      <Github size={13} />
                    </a>
                  )}
                </div>

                {/* Management buttons */}
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenView(project)}
                    className="h-7 px-2 border-white/10 hover:border-cyan-500/40 text-cyan-300 hover:text-white text-[10px] cursor-pointer"
                    title="Inspect Full Details"
                  >
                    <Eye size={12} className="mr-1" />
                    <span>INSPECT</span>
                  </Button>

                  <button
                    onClick={() => handleOpenEdit(project)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    title="Edit Project"
                  >
                    <Edit size={13} />
                  </button>

                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* TABLE VIEW */}
      {!isLoading && viewMode === 'table' && filteredPosts.length > 0 && (
        <Card className="bg-gray-950/80 border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-gray-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Serial</th>
                  <th className="py-3.5 px-4">Project Title</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Views</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredPosts.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono text-gray-400">
                      #{project.serial}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white max-w-[260px] truncate">
                      <div
                        onClick={() => handleOpenView(project)}
                        className="hover:text-cyan-300 transition-colors cursor-pointer truncate"
                      >
                        {project.title}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant="outline"
                        className="border-cyan-500/30 text-cyan-300 bg-cyan-500/10 text-[9px]"
                      >
                        {project.category || 'General'}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-gray-400">
                      <span className="flex items-center gap-1">
                        <Eye size={12} className="text-cyan-400/80" />
                        <span>{project.views}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {project.isFeatured ? (
                        <Badge
                          variant="outline"
                          className="border-cyan-500/40 text-cyan-300 bg-cyan-500/10 text-[9px]"
                        >
                          FEATURED
                        </Badge>
                      ) : (
                        <span className="text-gray-500 text-[10px]">NO</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant="outline"
                        className={`${
                          project.isPublished
                            ? 'border-green-500/30 text-green-400 bg-green-500/10'
                            : 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10'
                        } text-[9px]`}
                      >
                        {project.isPublished ? 'LIVE' : 'DRAFT'}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenView(project)}
                          className="p-1.5 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-white/5 transition-colors cursor-pointer"
                          title="Inspect Project"
                        >
                          <Eye size={14} />
                        </button>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-white/5 transition-colors"
                            title="View Live Project"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                        <button
                          onClick={() => handleOpenEdit(project)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id, project.title)}
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
      )}

      {/* Create / Edit Modal */}
      <PostModal
        isOpen={isCreateEditModalOpen}
        onClose={() => {
          setIsCreateEditModalOpen(false);
          setSelectedPost(null);
        }}
        post={selectedPost}
      />

      {/* Details / Inspection Modal */}
      <PostViewModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedPost(null);
        }}
        post={selectedPost}
        onEdit={(post) => {
          setSelectedPost(post);
          setIsCreateEditModalOpen(true);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
}
