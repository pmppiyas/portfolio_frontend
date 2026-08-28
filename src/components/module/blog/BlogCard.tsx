'use client';
import { Badge } from '@/components/ui/badge';
import { IBlog } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { BiLike } from 'react-icons/bi';
import { BsEye, BsThreeDotsVertical } from 'react-icons/bs';
import { IoMdShareAlt } from 'react-icons/io';
import { useInView } from '@/hooks/useInView';

export const BlogCard = ({ id, title, content, tags, views }: IBlog) => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref as any}
      className={`fade-in-up ${inView ? 'visible' : ''}`}
    >
      <Link href={`/blogs/${id}`}>
        <div
          className="w-full shadow-lg dark:bg-slate-800/50 bg-white rounded-xl overflow-hidden flex flex-col border border-transparent hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2 group relative"
        >
          {/* Image Section with Overlap effect */}
          <div
            className="relative overflow-hidden"
            style={{ transform: 'translateZ(20px)' }}
          >
            <Image
              src="https://i.ibb.co.com/fV500sDk/download-2.jpg"
              alt={title}
              height={200}
              width={400}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div
            className="flex-1 flex flex-col p-4"
            style={{ transform: 'translateZ(40px)' }}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-xl text-foreground line-clamp-1 group-hover:text-cyan-400 transition-colors">
                {title}
              </h2>
              <BsThreeDotsVertical className="text-muted-foreground" />
            </div>

            <div className="text-muted-foreground text-sm flex-1 mb-4 leading-relaxed">
              {content.length > 110 ? `${content.slice(0, 110)}...` : content}
            </div>

            <div className="mt-auto space-y-4">
              {/* See More Button with Arrow */}
              <div
                className="flex justify-start px-1"
                style={{ transform: 'translateZ(50px)' }}
              >
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  See More
                  <span className="group-hover:translate-x-1 transition-transform inline-block">
                    →
                  </span>
                </span>
              </div>

              <div className="flex justify-between items-center text-sm text-muted-foreground border-t border-white/5 pt-3">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1.5 group-hover:text-cyan-400/80 transition-colors">
                    <BsEye /> {views}
                  </span>
                  <span className="flex items-center gap-1.5 group-hover:text-pink-400/80 transition-colors">
                    <BiLike /> 10
                  </span>
                </div>
                <IoMdShareAlt className="text-lg hover:text-cyan-400 transition-colors" />
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-cyan-500/10 text-cyan-400 border-none text-[10px] uppercase tracking-wider"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
      </Link>
    </div>
  );
};
