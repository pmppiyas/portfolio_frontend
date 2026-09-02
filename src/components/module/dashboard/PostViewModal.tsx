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
import { IPost } from '@/types';
import SafeImage from '@/components/ui/SafeImage';
import {
  X,
  Globe,
  Github,
  Calendar,
  Eye,
  Edit,
  Trash2,
  FolderGit2,
  Server,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface PostViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: IPost | null;
  onEdit: (post: IPost) => void;
  onDelete: (id: number, title: string) => void;
}

export default function PostViewModal({
  isOpen,
  onClose,
  post,
  onEdit,
  onDelete,
}: PostViewModalProps) {
  if (!isOpen || !post) return null;

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Unknown';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 font-mono">
        <Card className="bg-gray-950 border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden text-white">
          {/* Cyber Corner Markers */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

          {/* Header */}
          <CardHeader className="border-b border-white/10 pb-4 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-cyan-500/40 text-cyan-300 bg-cyan-500/10 text-[10px] uppercase tracking-wider"
                >
                  <FolderGit2 size={11} className="mr-1 text-cyan-400" />
                  {post.category || 'GENERAL'}
                </Badge>
                <span className="text-[10px] text-gray-500">
                  SYS_ID: 0x{post.id} // SERIAL #{post.serial}
                </span>
              </div>
              <CardTitle
                className="text-xl font-black text-white tracking-tight"
                style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
              >
                {post.title}
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
                src={post.thumbnail}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80" />

              {/* Status Badges Overlay */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                {post.isFeatured && (
                  <Badge className="bg-cyan-500 text-black font-black text-[10px] uppercase tracking-wider shadow-lg">
                    <Sparkles size={11} className="mr-1" />
                    FEATURED
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className={`${
                    post.isPublished
                      ? 'border-green-500/40 text-green-400 bg-black/70'
                      : 'border-yellow-500/40 text-yellow-400 bg-black/70'
                  } text-[10px] uppercase tracking-wider`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      post.isPublished ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                    }`}
                  />
                  {post.isPublished ? 'PUBLISHED' : 'DRAFT'}
                </Badge>
              </div>

              {/* Telemetry views pill */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2 font-mono text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-black/80 border border-white/10 text-cyan-300 flex items-center gap-1.5">
                  <Eye size={12} className="text-cyan-400" />
                  <span>{post.views} VIEWS</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-black/80 border border-white/10 text-gray-400 flex items-center gap-1.5">
                  <Calendar size={12} />
                  <span>{formattedDate}</span>
                </span>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                // ARCHITECTURAL_DESCRIPTION
              </span>
              <p className="text-sm text-gray-200 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-white/10">
                {post.description}
              </p>
            </div>

            {/* Additional Content / Details */}
            {post.content && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  // DEEP_TELEMETRY_CONTENT
                </span>
                <div className="text-xs text-gray-300 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-white/10 whitespace-pre-wrap">
                  {post.content}
                </div>
              </div>
            )}

            {/* Tech Stack Tags */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                // TECHNOLOGIES_STACK
              </span>
              <div className="flex flex-wrap gap-1.5">
                {post.tags && post.tags.length > 0 ? (
                  post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider"
                    >
                      #{tag}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-xs">No tags specified</span>
                )}
              </div>
            </div>

            {/* Repository & Live Endpoints */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                // OUTBOUND_ENDPOINTS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {post.liveUrl && (
                  <a
                    href={post.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Globe size={15} className="text-cyan-400 shrink-0" />
                      <span className="truncate font-bold">LIVE_DEMO_URL</span>
                    </div>
                    <ExternalLink size={13} className="shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                )}

                {post.githubUrl && (
                  <a
                    href={post.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Github size={15} className="text-purple-400 shrink-0" />
                      <span className="truncate font-bold">CLIENT_REPOSITORY</span>
                    </div>
                    <ExternalLink size={13} className="shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                )}

                {post.backendGithubUrl && (
                  <a
                    href={post.backendGithubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 hover:bg-blue-500/20 transition-all flex items-center justify-between group sm:col-span-2"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Server size={15} className="text-blue-400 shrink-0" />
                      <span className="truncate font-bold">BACKEND_API_REPOSITORY</span>
                    </div>
                    <ExternalLink size={13} className="shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                )}
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
                onDelete(post.id, post.title);
              }}
              className="w-full sm:w-auto bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-300 text-xs h-9 cursor-pointer flex items-center gap-1.5"
            >
              <Trash2 size={14} />
              <span>DELETE_PROJECT</span>
            </Button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
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
                  onEdit(post);
                }}
                className="flex-1 sm:flex-initial bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider h-9 shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Edit size={14} />
                <span>EDIT_PROJECT ➔</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
