'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { IPost } from '@/types';
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from '@/redux/features/post/postApi';
import { toast } from 'sonner';
import {
  X,
  Plus,
  Edit,
  Loader2,
  FolderGit2,
  Globe,
  Github,
  Tags,
  UploadCloud,
  ImageIcon,
  Check,
} from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: IPost | null;
}

export default function PostModal({ isOpen, onClose, post }: PostModalProps) {
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  const isEditing = !!post;
  const isLoading = isCreating || isUpdating;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'Full-Stack',
    liveUrl: '',
    githubUrl: '',
    backendGithubUrl: '',
    tags: 'Next.js, TypeScript, PostgreSQL',
    serial: 1,
    isFeatured: false,
    isPublished: true,
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        description: post.description || '',
        content: post.content || '',
        category: post.category || 'Full-Stack',
        liveUrl: post.liveUrl || '',
        githubUrl: post.githubUrl || '',
        backendGithubUrl: post.backendGithubUrl || '',
        tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
        serial: post.serial ?? 1,
        isFeatured: Boolean(post.isFeatured),
        isPublished: Boolean(post.isPublished),
      });
      setThumbnailFile(null);
      setThumbnailPreview(post.thumbnail || '');
    } else {
      setFormData({
        title: '',
        description: '',
        content: '',
        category: 'Full-Stack',
        liveUrl: '',
        githubUrl: '',
        backendGithubUrl: '',
        tags: 'Next.js, TypeScript, PostgreSQL',
        serial: 1,
        isFeatured: false,
        isPublished: true,
      });
      setThumbnailFile(null);
      setThumbnailPreview('');
    }
  }, [post, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Only image files (PNG, JPG, WEBP, GIF, SVG) are allowed.');
        return;
      }
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
      toast.success(`Selected photo: ${file.name}`);
    }
  };

  const handleRemovePhoto = () => {
    setThumbnailFile(null);
    setThumbnailPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Title and Description are required.');
      return;
    }

    const tagsArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    // Package payload into FormData for backend Multer + Cloudinary upload
    const formDataPayload = new FormData();
    formDataPayload.append('title', formData.title.trim());
    formDataPayload.append('description', formData.description.trim());
    if (formData.content.trim()) {
      formDataPayload.append('content', formData.content.trim());
    }
    if (formData.category.trim()) {
      formDataPayload.append('category', formData.category.trim());
    }
    if (formData.liveUrl.trim()) {
      formDataPayload.append('liveUrl', formData.liveUrl.trim());
    }
    if (formData.githubUrl.trim()) {
      formDataPayload.append('githubUrl', formData.githubUrl.trim());
    }
    if (formData.backendGithubUrl.trim()) {
      formDataPayload.append('backendGithubUrl', formData.backendGithubUrl.trim());
    }
    formDataPayload.append('tags', JSON.stringify(tagsArray));
    formDataPayload.append('serial', String(formData.serial));
    formDataPayload.append('isFeatured', String(formData.isFeatured));
    formDataPayload.append('isPublished', String(formData.isPublished));

    if (thumbnailFile) {
      formDataPayload.append('thumbnail', thumbnailFile);
    } else if (thumbnailPreview && !thumbnailFile) {
      // Keep existing URL if no new file uploaded
      formDataPayload.append('thumbnail', thumbnailPreview);
    } else {
      formDataPayload.append('thumbnail', 'https://i.ibb.co.com/fV500sDk/download-2.jpg');
    }

    try {
      if (isEditing && post) {
        await updatePost({ id: post.id, data: formDataPayload }).unwrap();
        toast.success(`Project #${post.id} updated successfully! ✅`);
      } else {
        await createPost(formDataPayload).unwrap();
        toast.success('Project deployed successfully! 🚀');
      }
      onClose();
    } catch (err: any) {
      console.error('Save Project Error Detail:', err);
      const errorMsg =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        (typeof err === 'string' ? err : 'Failed to deploy project.');
      toast.error(`Error: ${errorMsg}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 font-mono">
        <Card className="bg-gray-950 border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden text-white">
          {/* Cyber Corner Markers */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

          {/* Header */}
          <CardHeader className="border-b border-white/10 pb-4 flex flex-row items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <FolderGit2 size={16} className="text-cyan-400" />
                <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">
                  {isEditing ? 'SYS.PROJECT // UPDATE' : 'SYS.PROJECT // DEPLOY'}
                </span>
              </div>
              <CardTitle
                className="text-lg font-black text-white mt-1"
                style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
              >
                {isEditing ? `EDIT PROJECT: ${post.title}` : 'DEPLOY NEW PROJECT'}
              </CardTitle>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white cursor-pointer"
            >
              <X size={16} />
            </button>
          </CardHeader>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-5 max-h-[70vh] overflow-y-auto pr-2">
              {/* Direct Photo Upload Drop Zone */}
              <div className="space-y-1.5 text-xs">
                <Label className="text-gray-300 font-bold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <UploadCloud size={14} className="text-cyan-400" />
                    <span>PROJECT_THUMBNAIL_PHOTO (Direct Cloudinary Upload)</span>
                  </span>
                  {thumbnailPreview && (
                    <span className="text-[10px] text-green-400 flex items-center gap-1">
                      <Check size={11} />
                      <span>PHOTO_READY</span>
                    </span>
                  )}
                </Label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {thumbnailPreview ? (
                  <div className="relative h-44 w-full rounded-xl overflow-hidden border border-cyan-500/40 bg-black/60 group">
                    <SafeImage
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      fill
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold h-8 cursor-pointer"
                      >
                        CHANGE_PHOTO
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={handleRemovePhoto}
                        className="text-xs font-bold h-8 cursor-pointer"
                      >
                        REMOVE
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/15 hover:border-cyan-400/60 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 bg-white/[0.02] hover:bg-cyan-500/[0.04] space-y-2 group"
                  >
                    <UploadCloud
                      size={28}
                      className="mx-auto text-gray-500 group-hover:text-cyan-400 transition-colors"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-gray-300 group-hover:text-white">
                        Click to select and upload project photo
                      </p>
                      <p className="text-[10px] text-gray-500">
                        PNG, JPG, WEBP, GIF up to 10MB • Uploads directly to Cloudinary
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-xs">
                  <Label className="text-gray-300 font-bold">PROJECT_TITLE *</Label>
                  <Input
                    required
                    placeholder="e.g. AI Multi-Agent Mesh"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="bg-black/60 border-white/15 focus:border-cyan-400 text-xs h-9 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5 text-xs">
                  <Label className="text-gray-300 font-bold">CATEGORY</Label>
                  <Input
                    placeholder="e.g. Full-Stack / AI / Next.js"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="bg-black/60 border-white/15 focus:border-cyan-400 text-xs h-9 rounded-xl"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5 text-xs">
                <Label className="text-gray-300 font-bold">DESCRIPTION *</Label>
                <textarea
                  required
                  rows={3}
                  placeholder="Short architectural overview of the project..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-2.5 bg-black/60 border border-white/15 focus:border-cyan-400 text-white font-mono text-xs rounded-xl resize-none outline-none leading-relaxed"
                />
              </div>

              {/* Live URL & GitHub URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-xs">
                  <Label className="text-gray-300 flex items-center gap-1">
                    <Globe size={13} className="text-cyan-400" />
                    <span>LIVE_URL</span>
                  </Label>
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    value={formData.liveUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, liveUrl: e.target.value })
                    }
                    className="bg-black/60 border-white/15 focus:border-cyan-400 text-xs h-9 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5 text-xs">
                  <Label className="text-gray-300 flex items-center gap-1">
                    <Github size={13} className="text-purple-400" />
                    <span>GITHUB_REPO_URL</span>
                  </Label>
                  <Input
                    type="url"
                    placeholder="https://github.com/pmppiyas/..."
                    value={formData.githubUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, githubUrl: e.target.value })
                    }
                    className="bg-black/60 border-white/15 focus:border-cyan-400 text-xs h-9 rounded-xl"
                  />
                </div>
              </div>

              {/* Tags & Serial */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-xs">
                  <Label className="text-gray-300 flex items-center gap-1">
                    <Tags size={13} className="text-yellow-400" />
                    <span>TAGS (Comma separated)</span>
                  </Label>
                  <Input
                    placeholder="Next.js, TypeScript, PostgreSQL"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    className="bg-black/60 border-white/15 focus:border-cyan-400 text-xs h-9 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5 text-xs">
                  <Label className="text-gray-300">DISPLAY_SERIAL</Label>
                  <Input
                    type="number"
                    value={formData.serial}
                    onChange={(e) =>
                      setFormData({ ...formData, serial: Number(e.target.value) })
                    }
                    className="bg-black/60 border-white/15 text-xs h-9 rounded-xl"
                  />
                </div>
              </div>

              {/* Featured & Published Switches */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 items-center text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      setFormData({ ...formData, isFeatured: e.target.checked })
                    }
                    className="w-4 h-4 accent-cyan-400 rounded"
                  />
                  <span className="text-xs text-gray-200 font-bold">
                    FEATURED_PROJECT
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) =>
                      setFormData({ ...formData, isPublished: e.target.checked })
                    }
                    className="w-4 h-4 accent-green-400 rounded"
                  />
                  <span className="text-xs text-gray-200 font-bold">
                    PUBLISHED_LIVE
                  </span>
                </label>
              </div>
            </CardContent>

            {/* Footer */}
            <CardFooter className="border-t border-white/10 pt-4 flex justify-end gap-2.5">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="border-white/10 text-gray-400 hover:text-white text-xs h-9 cursor-pointer"
              >
                CANCEL
              </Button>

              <Button
                type="submit"
                disabled={isLoading}
                className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider h-9 shadow-lg cursor-pointer flex items-center gap-1.5"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>UPLOADING_PHOTO_TO_CLOUDINARY...</span>
                  </>
                ) : isEditing ? (
                  <>
                    <Edit size={14} />
                    <span>UPDATE_PROJECT ➔</span>
                  </>
                ) : (
                  <>
                    <Plus size={14} />
                    <span>DEPLOY_PROJECT ➔</span>
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
