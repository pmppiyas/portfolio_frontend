'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IBlog } from '@/types';
import SafeImage from '@/components/ui/SafeImage';
import {
  X,
  Calendar,
  Eye,
  Edit,
  Trash2,
  BookOpen,
  User,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

interface BlogViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog: IBlog | null;
  onEdit: (blog: IBlog) => void;
  onDelete: (id: number, title: string) => void;
}

export default function BlogViewModal({
  isOpen,
  onClose,
  blog,
  onEdit,
  onDelete,
}: BlogViewModalProps) {
  if (!isOpen || !blog) return null;

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Unknown';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 font-mono">
        <Card className="bg-gray-950 border-purple-500/40 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.25)] overflow-hidden text-white">
          {/* Cyber Corner Markers */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-400" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-purple-400" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-purple-400" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-400" />

          {/* Header */}
          <CardHeader className="border-b border-white/10 pb-4 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-purple-500/40 text-purple-300 bg-purple-500/10 text-[10px] uppercase tracking-wider"
                >
                  <BookOpen size={11} className="mr-1 text-purple-400" />
                  TECHNICAL_ARTICLE
                </Badge>
                <span className="text-[10px] text-gray-500">
                  ARTICLE_ID: #{blog.id}
                </span>
              </div>
              <CardTitle
                className="text-xl font-black text-white tracking-tight"
                style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
              >
                {blog.title}
              </CardTitle>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white cursor-pointer"
            >
              <X size={18} />
            </button>
          </CardHeader>

          {/* Content Body */}
          <CardContent className="space-y-5 pt-5 max-h-[75vh] overflow-y-auto pr-2">
            {/* Image Preview Banner */}
            <div className="relative h-56 sm:h-64 w-full rounded-xl overflow-hidden border border-white/10 bg-black/60 group">
              <SafeImage
                src={blog.thumbnail}
                alt={blog.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80" />

              {/* Status Badges Overlay */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                {blog.isFeatured && (
                  <Badge className="bg-purple-500 text-white font-black text-[10px] uppercase tracking-wider shadow-lg">
                    <Sparkles size={11} className="mr-1" />
                    FEATURED
                  </Badge>
                )}
              </div>

              {/* Telemetry views & author pill */}
              <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-black/80 border border-white/10 text-purple-300 flex items-center gap-1.5">
                  <User size={12} className="text-purple-400" />
                  <span>{blog.author}</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-black/80 border border-white/10 text-cyan-300 flex items-center gap-1.5">
                  <Eye size={12} className="text-cyan-400" />
                  <span>{blog.views} READS</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-black/80 border border-white/10 text-gray-400 flex items-center gap-1.5">
                  <Calendar size={12} />
                  <span>{formattedDate}</span>
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                // ARTICLE_TAGS
              </span>
              <div className="flex flex-wrap gap-1.5">
                {blog.tags && blog.tags.length > 0 ? (
                  blog.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider"
                    >
                      #{tag}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-xs">No tags</span>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                // ARTICLE_CONTENT_BODY
              </span>
              <div className="text-xs sm:text-sm text-gray-200 leading-relaxed bg-black/40 p-4 rounded-xl border border-white/10 whitespace-pre-wrap">
                {blog.content}
              </div>
            </div>
          </CardContent>

          {/* Footer Actions */}
          <CardFooter className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                onClose();
                onDelete(blog.id, blog.title);
              }}
              className="w-full sm:w-auto bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-300 text-xs h-9 cursor-pointer flex items-center gap-1.5"
            >
              <Trash2 size={14} />
              <span>DELETE_ARTICLE</span>
            </Button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link
                href={`/blogs/${blog.id}`}
                target="_blank"
                className="inline-flex items-center gap-1 px-3 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-purple-400 text-gray-300 hover:text-white text-xs transition-colors"
              >
                <span>READ_PUBLIC</span>
                <ExternalLink size={12} />
              </Link>

              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 sm:flex-initial border-white/15 text-gray-400 hover:text-white text-xs h-9 cursor-pointer"
              >
                CLOSE
              </Button>

              <Button
                type="button"
                onClick={() => {
                  onClose();
                  onEdit(blog);
                }}
                className="flex-1 sm:flex-initial bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs uppercase tracking-wider h-9 shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Edit size={14} />
                <span>EDIT_ARTICLE ➔</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
