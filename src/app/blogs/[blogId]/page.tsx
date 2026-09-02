'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { techBlogsDemo } from '@/assets/assets';
import { Badge } from '@/components/ui/badge';
import SafeImage from '@/components/ui/SafeImage';
import Link from 'next/link';
import { BiLike } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';
import { IoMdShareAlt } from 'react-icons/io';
import { Calendar, User, ArrowLeft, Loader2, BookOpen } from 'lucide-react';
import {
  useGetBlogByIdQuery,
  useGetAllBlogsQuery,
} from '@/redux/features/blog/blogApi';
import { toast } from 'sonner';

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = Number(params?.blogId);

  // RTK Query: fetch this specific blog & all blogs for sidebar
  const { data: dbBlog, isLoading: isBlogLoading } = useGetBlogByIdQuery(blogId, {
    skip: !blogId || isNaN(blogId),
  });
  const { data: allDbBlogs } = useGetAllBlogsQuery();

  // Find in demo blogs as fallback if not in DB
  const fallbackBlog = useMemo(() => {
    return techBlogsDemo.find((b) => b.id === blogId);
  }, [blogId]);

  const blog = dbBlog || fallbackBlog;

  // Sidebar other blogs
  const otherBlogs = useMemo(() => {
    const list =
      allDbBlogs && allDbBlogs.length > 0 ? allDbBlogs : techBlogsDemo;
    return list.filter((b) => b.id !== blogId).slice(0, 5);
  }, [allDbBlogs, blogId]);

  if (isBlogLoading) {
    return (
      <div className="bg-[#020617] min-h-screen text-white flex flex-col items-center justify-center font-mono space-y-3">
        <Loader2 size={36} className="text-cyan-400 animate-spin" />
        <p className="text-xs text-gray-400 tracking-wider">
          DECRYPTING_ARTICLE_PACKETS...
        </p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="bg-[#020617] min-h-screen text-white flex flex-col items-center justify-center font-mono space-y-4 px-4">
        <BookOpen size={48} className="text-gray-600" />
        <h2 className="text-2xl font-bold text-white">ARTICLE NOT FOUND</h2>
        <p className="text-sm text-gray-400 max-w-md text-center">
          The requested technical publication does not exist or may have been deleted.
        </p>
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider transition-colors"
        >
          <ArrowLeft size={14} />
          <span>RETURN TO ALL BLOGS</span>
        </Link>
      </div>
    );
  }

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Recent';

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Article URL copied to clipboard! 📋');
    }
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white pt-24 lg:pt-32 pb-20 font-mono">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Back Button */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-cyan-400 mb-6 transition-colors group uppercase tracking-wider"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform text-cyan-400"
          />
          <span>SYS.ROUTER // BACK_TO_PUBLICATIONS</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: Main Content */}
          <main className="lg:col-span-8 space-y-8">
            <header className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {blog.tags?.map((tag, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="bg-cyan-500/10 text-cyan-300 border-cyan-500/30 text-[10px] uppercase font-bold tracking-wider rounded-md"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>

              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-white tracking-tight"
                style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
              >
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-400 text-xs py-4 border-y border-white/10 font-mono">
                <span className="flex items-center gap-2 text-purple-300">
                  <User size={14} className="text-purple-400" /> {blog.author}
                </span>
                <span className="flex items-center gap-2 text-gray-300">
                  <Calendar size={14} className="text-cyan-400" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-2 text-cyan-300">
                  <BsEye size={14} className="text-cyan-400" /> {blog.views} READS
                </span>
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(6,182,212,0.15)] bg-black/60 group">
              <SafeImage
                alt={blog.title}
                src={blog.cover || blog.thumbnail}
                fill
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Article Body */}
            <article className="prose prose-invert lg:prose-xl max-w-none text-gray-200 leading-relaxed font-light">
              <p className="whitespace-pre-line text-sm sm:text-base selection:bg-cyan-500/30 leading-loose">
                {blog.content}
              </p>
            </article>

            {/* Social Actions */}
            <div className="flex items-center justify-between py-6 border-t border-white/10 mt-12">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toast.success('Thanks for reading! 👍')}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-cyan-500/50 px-4 py-2 rounded-xl transition-all group text-xs text-gray-300 hover:text-white cursor-pointer"
                >
                  <BiLike className="text-base group-hover:text-cyan-400 transition-colors" />
                  <span>HELPFUL</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-cyan-500/50 px-4 py-2 rounded-xl transition-all group text-xs text-gray-300 hover:text-white cursor-pointer"
                >
                  <IoMdShareAlt className="text-base group-hover:text-cyan-400 transition-colors" />
                  <span>SHARE_URL</span>
                </button>
              </div>
            </div>
          </main>

          {/* RIGHT: Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-6">
              {/* Other Blogs Section */}
              <div className="bg-gray-950/80 rounded-2xl p-5 border border-white/10 backdrop-blur-sm shadow-xl space-y-4">
                <h3
                  className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
                >
                  <span className="w-1.5 h-4 bg-cyan-400 rounded-full" />
                  <span>RELATED_PUBLICATIONS</span>
                </h3>

                <div className="space-y-4">
                  {otherBlogs.map((item) => (
                    <Link
                      key={item.id}
                      href={`/blogs/${item.id}`}
                      className="group flex gap-3 items-center p-2 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
                    >
                      <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-white/10 bg-black/60">
                        <SafeImage
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="space-y-1 flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                        <span className="text-[9px] text-gray-500 block uppercase">
                          {item.author}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Back to Top / All Blogs */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/40 via-gray-950/80 to-cyan-950/40 border border-purple-500/20 text-center space-y-3">
                <h4
                  className="text-xs font-bold text-white tracking-wider uppercase"
                  style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
                >
                  EXPLORE KNOWLEDGE REPO
                </h4>
                <p className="text-[11px] text-gray-400">
                  Read more articles on Next.js, AI Agents, Prisma and Distributed Systems.
                </p>
                <Link
                  href="/blogs"
                  className="inline-block w-full py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
                >
                  ALL_ARTICLES ➔
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
