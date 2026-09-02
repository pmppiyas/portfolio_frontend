'use client';

import assets from '@/assets/assets';
import SafeImage from '@/components/ui/SafeImage';
import Link from 'next/link';
import CustomHeading from '@/components/module/shared/Heading';
import { useInView } from '@/hooks/useInView';
import { useGetAllPostsQuery } from '@/redux/features/post/postApi';
import {
  ExternalLink,
  Github,
  Terminal,
  ShieldCheck,
  Cpu,
  Layers,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

const { myWorks } = assets;

function ProjectPage() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const { data: dbPosts } = useGetAllPostsQuery({ isPublished: true });

  const displayWorks =
    dbPosts && dbPosts.length > 0
      ? dbPosts.map((post) => ({
          id: post.id,
          name: post.title,
          description: post.description,
          photo:
            post.thumbnail ||
            'https://i.ibb.co.com/fV500sDk/download-2.jpg',
          live: post.liveUrl || undefined,
          github: post.githubUrl || undefined,
          tags:
            post.tags && post.tags.length > 0
              ? post.tags
              : ['Next.js', 'TypeScript', 'Prisma'],
        }))
      : myWorks;

  return (
    <section
      id="projects"
      ref={ref as any}
      className="relative w-full py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Cyber Ambient & Tech Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute top-1/4 right-10 w-[500px] h-[300px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-10 left-10 w-[450px] h-[250px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.3) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Heading */}
        <CustomHeading
          heading="I Build"
          badge="SYS.BUILDS // PRODUCTION_DEPLOYMENTS"
          subtitle="Full-Stack Web Applications, Scalable ERPs & Cloud Systems"
        />

        {/* Project Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayWorks.map((work, idx) => {
            const projectTags = work?.tags || [
              'Next.js',
              'TypeScript',
              'Tailwind',
            ];

            return (
              <div
                key={idx}
                className={`group relative flex flex-col justify-between rounded-xl bg-gray-950/80 border border-cyan-500/20 hover:border-cyan-400/60 shadow-lg hover:shadow-[0_0_25px_rgba(34,211,238,0.18)] transition-all duration-300 hover:-translate-y-1 overflow-hidden fade-in-up ${
                  inView ? 'visible' : ''
                }`}
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                {/* Cyber Corner Markers */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-transparent group-hover:border-cyan-400 transition-colors duration-200 z-20" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-transparent group-hover:border-cyan-400 transition-colors duration-200 z-20" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-transparent group-hover:border-cyan-400 transition-colors duration-200 z-20" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-transparent group-hover:border-cyan-400 transition-colors duration-200 z-20" />

                <div>
                  {/* Browser Terminal Top HUD Bar */}
                  <div className="flex items-center justify-between px-3 py-2 bg-black/60 border-b border-white/10 font-mono text-[9px] text-gray-500 z-10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/80" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                      <span className="w-2 h-2 rounded-full bg-green-500/80" />
                      <span className="ml-1 text-gray-400 text-[8.5px] truncate max-w-[120px]">
                        {work.name.toLowerCase().replace(/\s+/g, '-')}.app
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-green-400 font-semibold uppercase text-[8.5px]">
                      <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                      <span>200_OK</span>
                    </div>
                  </div>

                  {/* Project Screenshot / Viewport */}
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-gray-900 border-b border-white/5 cursor-pointer">
                    <SafeImage
                      src={work?.photo as any}
                      alt={work?.name || 'Project'}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-transparent to-transparent opacity-80" />

                    {/* Module Index Badge */}
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 border border-cyan-500/30 text-cyan-300 font-mono text-[9px] font-bold">
                      {`// PROJ_0${idx + 1}`}
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-4 space-y-3">
                    {/* Project Title */}
                    <div>
                      <h3
                        className="text-base font-black text-white group-hover:text-cyan-300 transition-colors duration-200 tracking-tight"
                        style={{
                          fontFamily: 'var(--font-orbitron), sans-serif',
                        }}
                      >
                        {work.name}
                      </h3>
                      <span className="text-[9px] font-mono text-cyan-400/70 block mt-0.5">
                        {'> ARCHITECTED_FOR_PRODUCTION'}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 font-mono text-xs leading-relaxed line-clamp-2">
                      {work.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {projectTags.slice(0, 4).map((tag, i) => (
                        <span
                          key={i}
                          className="text-[8.5px] font-mono font-semibold px-1.5 py-0.5 rounded bg-white/5 group-hover:bg-cyan-500/10 text-gray-400 group-hover:text-cyan-300 border border-white/5 transition-colors duration-200 uppercase tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-4 pt-0">
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 font-mono text-xs font-bold">
                    {work.live && (
                      <a
                        href={work.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-cyan-400 text-black hover:bg-cyan-300 transition-colors duration-200 uppercase tracking-wider text-[10px] shadow-sm active:scale-95"
                      >
                        <ExternalLink size={12} />
                        <span>[ LIVE_DEMO ]</span>
                      </a>
                    )}

                    {work.github ? (
                      <a
                        href={work.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/40 text-gray-300 hover:text-cyan-300 transition-colors duration-200 uppercase tracking-wider text-[10px]"
                      >
                        <Github size={12} />
                        <span>SOURCE</span>
                      </a>
                    ) : (
                      <div className="flex items-center justify-center py-2 px-3 rounded-lg bg-white/5 text-gray-500 font-mono text-[9.5px] uppercase">
                        PROPRIETARY
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Explorer Action Button */}
        <div
          className={`flex items-center justify-center pt-6 fade-in-up ${
            inView ? 'visible' : ''
          }`}
        >
          <Link
            href={'/projects'}
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-950/90 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:-translate-y-0.5"
          >
            <Terminal size={14} className="text-cyan-400" />
            <span>[ EXPLORE_ALL_PROJECTS.sh ]</span>
            <ChevronRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProjectPage;
