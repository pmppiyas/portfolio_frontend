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
import { IBlog } from '@/types';
import {
  useCreateBlogMutation,
  useUpdateBlogMutation,
} from '@/redux/features/blog/blogApi';
import { toast } from 'sonner';
import {
  X,
  Plus,
  Edit,
  Loader2,
  BookOpen,
  User,
  Tags,
  UploadCloud,
  Check,
  Sparkles,
} from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog: IBlog | null;
}

export default function BlogModal({ isOpen, onClose, blog }: BlogModalProps) {
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

  const isEditing = !!blog;
  const isLoading = isCreating || isUpdating;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    author: 'Prince Mahmud Piyas',
    content: '',
    tags: 'Next.js, WebDev, Full-Stack',
    isFeatured: false,
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        author: blog.author || 'Prince Mahmud Piyas',
        content: blog.content || '',
        tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
        isFeatured: Boolean(blog.isFeatured),
      });
      setThumbnailFile(null);
      setThumbnailPreview(blog.thumbnail || '');
    } else {
      setFormData({
        title: '',
        author: 'Prince Mahmud Piyas',
        content: '',
        tags: 'Next.js, WebDev, Full-Stack',
        isFeatured: false,
      });
      setThumbnailFile(null);
      setThumbnailPreview('');
    }
  }, [blog, isOpen]);

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

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Article Title and Content are required.');
      return;
    }

    const tagsArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    // Package payload into FormData for backend Multer + Cloudinary upload
    const formDataPayload = new FormData();
    formDataPayload.append('title', formData.title.trim());
    formDataPayload.append('author', formData.author.trim() || 'Prince Mahmud Piyas');
    formDataPayload.append('content', formData.content.trim());
    formDataPayload.append('tags', JSON.stringify(tagsArray));
    formDataPayload.append('isFeatured', String(formData.isFeatured));

    if (thumbnailFile) {
      formDataPayload.append('thumbnail', thumbnailFile);
    } else if (thumbnailPreview && !thumbnailFile) {
      formDataPayload.append('thumbnail', thumbnailPreview);
    } else {
      formDataPayload.append('thumbnail', 'https://i.ibb.co.com/fV500sDk/download-2.jpg');
    }

    try {
      if (isEditing && blog) {
        await updateBlog({ id: blog.id, data: formDataPayload }).unwrap();
        toast.success(`Article #${blog.id} updated successfully! ✅`);
      } else {
        await createBlog(formDataPayload).unwrap();
        toast.success('Article published successfully! 🚀');
      }
      onClose();
    } catch (err: any) {
      console.error('Save Article Error Detail:', err);
      const errorMsg =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        (typeof err === 'string' ? err : 'Failed to save article.');
      toast.error(`Error: ${errorMsg}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 font-mono">
        <Card className="bg-gray-950 border-purple-500/40 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.2)] overflow-hidden text-white">
          {/* Cyber Corner Markers */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-400" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-purple-400" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-purple-400" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-400" />

          {/* Header */}
          <CardHeader className="border-b border-white/10 pb-4 flex flex-row items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-purple-400" />
                <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider">
                  {isEditing ? 'SYS.BLOG // UPDATE' : 'SYS.BLOG // PUBLISH'}
                </span>
              </div>
              <CardTitle
                className="text-lg font-black text-white mt-1"
                style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
              >
                {isEditing ? `EDIT ARTICLE: ${blog.title}` : 'WRITE & PUBLISH ARTICLE'}
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
                    <UploadCloud size={14} className="text-purple-400" />
                    <span>ARTICLE_THUMBNAIL_PHOTO (Direct Cloudinary Upload)</span>
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
                  <div className="relative h-44 w-full rounded-xl overflow-hidden border border-purple-500/40 bg-black/60 group">
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
                        className="bg-purple-500 hover:bg-purple-400 text-white text-xs font-bold h-8 cursor-pointer"
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
                    className="border-2 border-dashed border-white/15 hover:border-purple-400/60 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 bg-white/[0.02] hover:bg-purple-500/[0.04] space-y-2 group"
                  >
                    <UploadCloud
                      size={28}
                      className="mx-auto text-gray-500 group-hover:text-purple-400 transition-colors"
                    />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-gray-300 group-hover:text-white">
                        Click to select and upload article photo
                      </p>
                      <p className="text-[10px] text-gray-500">
                        PNG, JPG, WEBP, GIF up to 10MB • Uploads directly to Cloudinary
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-xs">
                  <Label className="text-gray-300 font-bold">ARTICLE_TITLE *</Label>
                  <Input
                    required
                    placeholder="e.g. Mastering Next.js 16 Server Components"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="bg-black/60 border-white/15 focus:border-purple-400 text-xs h-9 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5 text-xs">
                  <Label className="text-gray-300 font-bold flex items-center gap-1">
                    <User size={12} className="text-purple-400" />
                    <span>AUTHOR</span>
                  </Label>
                  <Input
                    placeholder="Prince Mahmud Piyas"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    className="bg-black/60 border-white/15 focus:border-purple-400 text-xs h-9 rounded-xl"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-1.5 text-xs">
                <Label className="text-gray-300 flex items-center gap-1">
                  <Tags size={13} className="text-yellow-400" />
                  <span>TAGS (Comma separated)</span>
                </Label>
                <Input
                  placeholder="Next.js, Architecture, Performance"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="bg-black/60 border-white/15 focus:border-purple-400 text-xs h-9 rounded-xl"
                />
              </div>

              {/* Content Body */}
              <div className="space-y-1.5 text-xs">
                <Label className="text-gray-300 font-bold">ARTICLE_CONTENT *</Label>
                <textarea
                  required
                  rows={8}
                  placeholder="Write full article body text, markdown, or insights..."
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full p-3 bg-black/60 border border-white/15 focus:border-purple-400 text-white font-mono text-xs rounded-xl resize-none outline-none leading-relaxed"
                />
              </div>

              {/* Featured Switch */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      setFormData({ ...formData, isFeatured: e.target.checked })
                    }
                    className="w-4 h-4 accent-purple-400 rounded"
                  />
                  <span className="text-xs text-gray-200 font-bold flex items-center gap-1">
                    <Sparkles size={12} className="text-purple-400" />
                    <span>FEATURED_ARTICLE (Pin to Top)</span>
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
                className="bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs uppercase tracking-wider h-9 shadow-lg cursor-pointer flex items-center gap-1.5"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>UPLOADING_PHOTO_TO_CLOUDINARY...</span>
                  </>
                ) : isEditing ? (
                  <>
                    <Edit size={14} />
                    <span>UPDATE_ARTICLE ➔</span>
                  </>
                ) : (
                  <>
                    <Plus size={14} />
                    <span>PUBLISH_ARTICLE ➔</span>
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
