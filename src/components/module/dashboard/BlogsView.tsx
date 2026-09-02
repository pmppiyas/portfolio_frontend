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
import SafeImage from '@/components/ui/SafeImage';
import { techBlogsDemo } from '@/assets/assets';
import {
  BookOpen,
  Plus,
  Search,
  LayoutGrid,
  Table as TableIcon,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Sparkles,
  User,
  Calendar,
  RefreshCw,
  Filter,
} from 'lucide-react';
import {
  useGetAllBlogsQuery,
  useDeleteBlogMutation,
} from '@/redux/features/blog/blogApi';
import { IBlog } from '@/types';
import { toast } from 'sonner';
import BlogModal from './BlogModal';
import BlogViewModal from './BlogViewModal';

export default function BlogsView() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');

  // Modal states
  const [isCreateEditModalOpen, setIsCreateEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);

  // RTK Query for Blogs (Blogs model from /api/v1/blog)
  const { data: dbBlogs, isLoading, isFetching, refetch } = useGetAllBlogsQuery();
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  const currentBlogs: IBlog[] =
    dbBlogs && dbBlogs.length > 0 ? dbBlogs : techBlogsDemo;

  // Extract unique tags for filter pills
  const allTags = useMemo(() => {
    const set = new Set<string>();
    currentBlogs.forEach((b) => {
      b.tags?.forEach((t) => set.add(t));
    });
    return ['ALL', ...Array.from(set)];
  }, [currentBlogs]);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return currentBlogs.filter((blog) => {
      const title = blog.title || '';
      const author = blog.author || '';
      const matchesSearch =
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags?.some((t) => (t || '').toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag =
        selectedTag === 'ALL' || blog.tags?.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [currentBlogs, searchQuery, selectedTag]);

  // Telemetry metric counters
  const totalReads = useMemo(
    () => currentBlogs.reduce((acc, b) => acc + (b.views || 0), 0),
    [currentBlogs]
  );
  const featuredCount = useMemo(
    () => currentBlogs.filter((b) => b.isFeatured).length,
    [currentBlogs]
  );

  // Actions
  const handleOpenCreate = () => {
    setSelectedBlog(null);
    setIsCreateEditModalOpen(true);
  };

  const handleOpenEdit = (blog: IBlog) => {
    setSelectedBlog(blog);
    setIsCreateEditModalOpen(true);
  };

  const handleOpenView = (blog: IBlog) => {
    setSelectedBlog(blog);
    setIsViewModalOpen(true);
  };

  const handleDelete = async (id: number, title: string) => {
    if (confirm(`Are you sure you want to permanently delete article "${title}"?`)) {
      try {
        await deleteBlog(id).unwrap();
        toast.success(`Article "${title}" deleted from database! ✅`);
      } catch (err: any) {
        toast.error(err?.data?.message || err?.message || 'Failed to delete article.');
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
              className="border-purple-500/40 text-purple-300 bg-purple-500/10 text-[10px] uppercase tracking-wider"
            >
              <BookOpen size={11} className="mr-1 text-purple-400" />
              ARTICLES // PUBLICATIONS
            </Badge>
            <span className="text-[10px] text-gray-500">
              {currentBlogs.length} PUBLISHED ARTICLES
            </span>
          </div>
          <h2
            className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1"
            style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
          >
            TECHNICAL BLOGS REGISTRY
          </h2>
          <p className="text-xs text-gray-400">
            Write, review, and manage technical articles published to your public blog showcase.
          </p>
        </div>

        {/* Top Actions: Refresh & Write Article */}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              refetch();
              toast.info('Blogs refreshed from database.');
            }}
            variant="outline"
            disabled={isFetching}
            className="border-white/10 hover:border-purple-500/40 text-gray-300 hover:text-white text-xs h-9 px-3 cursor-pointer flex items-center gap-1.5"
            title="Refresh database records"
          >
            <RefreshCw size={13} className={isFetching ? 'animate-spin text-purple-400' : ''} />
            <span className="hidden sm:inline">REFRESH</span>
          </Button>

          <Button
            onClick={handleOpenCreate}
            className="bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs uppercase tracking-wider h-9 shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Plus size={14} />
            <span>WRITE_ARTICLE</span>
          </Button>
        </div>
      </div>

      {/* Summary Telemetry Counter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-gray-950/80 border border-white/10 space-y-1">
          <span className="text-[10px] text-gray-400 uppercase block">TOTAL_ARTICLES</span>
          <div
            className="text-xl font-black text-white"
            style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
          >
            {currentBlogs.length}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gray-950/80 border border-purple-500/20 space-y-1">
          <span className="text-[10px] text-purple-400 uppercase block">FEATURED_ARTICLES</span>
          <div
            className="text-xl font-black text-purple-300"
            style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
          >
            {featuredCount}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gray-950/80 border border-cyan-500/20 space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[10px] text-cyan-400 uppercase block">TOTAL_READS</span>
          <div
            className="text-xl font-black text-cyan-300"
            style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
          >
            {totalReads.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-gray-950/80 border border-white/10 space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <Input
              placeholder="Search articles by title, tag, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-black/60 border-white/10 focus:border-purple-400 text-xs h-9 rounded-xl"
            />
          </div>

          {/* Grid/Table Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-black/60 border border-white/10 self-end sm:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-purple-500 text-white font-bold'
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
                  ? 'bg-purple-500 text-white font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Table View"
            >
              <TableIcon size={15} />
            </button>
          </div>
        </div>

        {/* Tag Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] text-gray-500 mr-1 flex items-center gap-1">
            <Filter size={11} />
            <span>FILTER_TAG:</span>
          </span>
          {allTags.map((tag) => {
            const isActive = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-purple-500/20 border border-purple-400 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                    : 'bg-white/5 hover:bg-white/10 text-gray-400 border border-transparent'
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="py-12 text-center text-gray-400 space-y-2 font-mono">
          <div className="w-8 h-8 mx-auto border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs">SYNCHRONIZING WITH POSTGRESQL BLOGS...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredBlogs.length === 0 && (
        <div className="py-16 text-center text-gray-400 space-y-3 bg-gray-950/40 rounded-2xl border border-white/5 font-mono">
          <BookOpen size={32} className="mx-auto text-gray-600" />
          <p className="text-sm font-bold text-gray-300">NO MATCHING ARTICLES FOUND</p>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Try adjusting your search query or tag filters.
          </p>
          <Button
            onClick={handleOpenCreate}
            className="bg-purple-500 hover:bg-purple-400 text-white text-xs font-bold uppercase h-8 mt-2"
          >
            <Plus size={13} className="mr-1" />
            WRITE FIRST ARTICLE
          </Button>
        </div>
      )}

      {/* GRID CARDS VIEW */}
      {!isLoading && viewMode === 'grid' && filteredBlogs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBlogs.map((blog) => (
            <Card
              key={blog.id}
              className="relative overflow-hidden bg-gray-950/80 border-white/10 hover:border-purple-500/50 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col group"
            >
              {/* Thumbnail Viewport */}
              <div className="relative h-44 w-full overflow-hidden bg-black/60 border-b border-white/10">
                <SafeImage
                  src={blog.thumbnail}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-85" />

                {/* Top Badges */}
                {blog.isFeatured && (
                  <div className="absolute top-2.5 right-2.5">
                    <Badge className="bg-purple-500 text-white font-black text-[9px] uppercase tracking-wider">
                      <Sparkles size={10} className="mr-0.5" />
                      FEATURED
                    </Badge>
                  </div>
                )}

                {/* Author Pill */}
                <div className="absolute bottom-2.5 left-2.5">
                  <Badge
                    variant="outline"
                    className="border-purple-500/40 text-purple-300 bg-black/80 font-mono text-[9px] flex items-center gap-1"
                  >
                    <User size={10} />
                    <span>{blog.author}</span>
                  </Badge>
                </div>
              </div>

              {/* Card Content */}
              <CardContent className="p-4 space-y-3 flex-1 flex flex-col">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[9px] text-gray-500 font-mono">
                    <span>ARTICLE #{blog.id}</span>
                    <span className="flex items-center gap-1 text-cyan-400/80">
                      <Eye size={11} />
                      <span>{blog.views}</span>
                    </span>
                  </div>

                  <h3
                    onClick={() => handleOpenView(blog)}
                    className="font-bold text-sm text-white hover:text-purple-300 transition-colors cursor-pointer line-clamp-2"
                    style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
                  >
                    {blog.title}
                  </h3>
                </div>

                <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed flex-1">
                  {blog.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {blog.tags?.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-[9px] text-purple-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </CardContent>

              {/* Card Footer Actions */}
              <div className="p-3 border-t border-white/10 bg-black/40 flex items-center justify-between gap-2">
                <a
                  href={`/blogs/${blog.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-purple-400 hover:bg-white/5 transition-colors"
                  title="Read on Public Blog"
                >
                  <ExternalLink size={13} />
                </a>

                {/* Management buttons */}
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenView(blog)}
                    className="h-7 px-2 border-white/10 hover:border-purple-500/40 text-purple-300 hover:text-white text-[10px] cursor-pointer"
                    title="Inspect Full Article"
                  >
                    <Eye size={12} className="mr-1" />
                    <span>READ</span>
                  </Button>

                  <button
                    onClick={() => handleOpenEdit(blog)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    title="Edit Article"
                  >
                    <Edit size={13} />
                  </button>

                  <button
                    onClick={() => handleDelete(blog.id, blog.title)}
                    className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors cursor-pointer"
                    title="Delete Article"
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
      {!isLoading && viewMode === 'table' && filteredBlogs.length > 0 && (
        <Card className="bg-gray-950/80 border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-gray-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">ID</th>
                  <th className="py-3.5 px-4">Article Title</th>
                  <th className="py-3.5 px-4">Author</th>
                  <th className="py-3.5 px-4">Tags</th>
                  <th className="py-3.5 px-4">Views</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredBlogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono text-gray-400">
                      #{blog.id}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white max-w-[280px] truncate">
                      <div
                        onClick={() => handleOpenView(blog)}
                        className="hover:text-purple-300 transition-colors cursor-pointer truncate"
                      >
                        {blog.title}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-300">{blog.author}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {blog.tags?.map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="border-purple-500/20 text-purple-400 bg-purple-500/5 text-[9px]"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-400">
                      <span className="flex items-center gap-1">
                        <Eye size={12} className="text-cyan-400/80" />
                        <span>{blog.views}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {blog.isFeatured ? (
                        <Badge
                          variant="outline"
                          className="border-purple-500/40 text-purple-300 bg-purple-500/10 text-[9px]"
                        >
                          YES
                        </Badge>
                      ) : (
                        <span className="text-gray-500 text-[10px]">NO</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenView(blog)}
                          className="p-1.5 rounded-lg text-purple-400 hover:text-purple-300 hover:bg-white/5 transition-colors cursor-pointer"
                          title="Read Article"
                        >
                          <Eye size={14} />
                        </button>
                        <a
                          href={`/blogs/${blog.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-purple-400 hover:bg-white/5 transition-colors"
                          title="View Public Blog"
                        >
                          <ExternalLink size={14} />
                        </a>
                        <button
                          onClick={() => handleOpenEdit(blog)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                          title="Edit Article"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id, blog.title)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors cursor-pointer"
                          title="Delete Article"
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

      {/* Create / Edit Article Modal */}
      <BlogModal
        isOpen={isCreateEditModalOpen}
        onClose={() => {
          setIsCreateEditModalOpen(false);
          setSelectedBlog(null);
        }}
        blog={selectedBlog}
      />

      {/* Blog Details Inspection Modal */}
      <BlogViewModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedBlog(null);
        }}
        blog={selectedBlog}
        onEdit={(blog) => {
          setSelectedBlog(blog);
          setIsCreateEditModalOpen(true);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
}
