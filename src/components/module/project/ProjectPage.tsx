'use client';

import { useState, useEffect } from 'react';
import assets from '@/assets/assets';
import SafeImage from '@/components/ui/SafeImage';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CustomHeading from '@/components/module/shared/Heading';
import { useInView } from '@/hooks/useInView';
import { useGetAllPostsQuery } from '@/redux/features/post/postApi';
import {
  ExternalLink,
  Github,
  Terminal,
  ChevronRight,
  ChevronDown,
  Code2,
  Server,
  Sparkles,
} from 'lucide-react';

const { myWorks } = assets;

function ProjectPage() {
  const pathname = usePathname();
  const isProjectsPage = pathname === '/projects';
  const { ref, inView } = useInView({ threshold: 0.1 });
  const { data: dbPosts } = useGetAllPostsQuery({ isPublished: true });
  const [activeTooltipId, setActiveTooltipId] = useState<
    string | number | null
  >(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-source-tooltip]')) {
        setActiveTooltipId(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const displayWorks =
    dbPosts && dbPosts.length > 0
      ? dbPosts.map((post) => ({
          id: post.id,
          name: post.title,
          description: post.description,
          photo:
            post.thumbnail || 'https://i.ibb.co.com/fV500sDk/download-2.jpg',
          live: post.liveUrl || undefined,
          github: post.githubUrl || undefined,
          backendGithub: post.backendGithubUrl || undefined,
          tags:
            post.tags && post.tags.length > 0
              ? post.tags
              : ['Next.js', 'TypeScript', 'Prisma'],
        }))
      : myWorks.map((work, idx) => ({
          id: `static-${idx}`,
          name: work.name,
          description: work.description,
          photo: work.photo,
          live: work.live || undefined,
          github: work.github || undefined,
          backendGithub:
            idx === 0
              ? 'https://github.com/pmppiyas/EMS_School_Backend'
              : undefined,
          tags: work.tags || ['Next.js', 'TypeScript', 'Tailwind CSS'],
        }));

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

            const hasSource = Boolean(work.github || work.backendGithub);
            const isTooltipOpen = activeTooltipId === work.id;

            return (
              <div
                key={work.id}
                className={`group relative flex flex-col justify-between rounded-xl bg-gray-950/80 border border-cyan-500/20 hover:border-cyan-400/60 shadow-lg hover:shadow-[0_0_25px_rgba(34,211,238,0.18)] transition-all duration-300 hover:-translate-y-1 overflow-visible fade-in-up ${
                  inView ? 'visible' : ''
                }`}
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                {/* Cyber Corner Markers */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-transparent group-hover:border-cyan-400 transition-colors duration-200 z-20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-transparent group-hover:border-cyan-400 transition-colors duration-200 z-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-transparent group-hover:border-cyan-400 transition-colors duration-200 z-20 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-transparent group-hover:border-cyan-400 transition-colors duration-200 z-20 pointer-events-none" />

                <div>
                  {/* Browser Terminal Top HUD Bar */}
                  <div className="flex items-center justify-between px-3 py-2 bg-black/60 border-b border-white/10 font-mono text-[9px] text-gray-500 z-10 rounded-t-xl">
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
                      priority={idx < 2}
                      loading={idx < 2 ? 'eager' : 'lazy'}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-transparent to-transparent opacity-80 pointer-events-none" />

                    {/* Module Index Badge */}
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 border border-cyan-500/30 text-cyan-300 font-mono text-[9px] font-bold">
                      {`// PROJ_0${idx + 1}`}
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-4 space-y-3 font-mono">
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

                    {/* All Tech Badges (Completely visible without truncation) */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[8px] text-gray-500 uppercase tracking-wider">
                        <span>// TECH_STACK</span>
                        <span className="text-cyan-400/80">
                          {projectTags.length} NODES
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {projectTags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300/90 border border-cyan-500/25 hover:border-cyan-400 hover:text-cyan-200 hover:bg-cyan-500/10 transition-all duration-200 uppercase tracking-wider"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-4 pt-0">
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 font-mono text-xs font-bold">
                    {work.live ? (
                      <a
                        href={work.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-cyan-400 text-black hover:bg-cyan-300 transition-colors duration-200 uppercase tracking-wider text-[10px] shadow-sm active:scale-95 cursor-pointer"
                      >
                        <ExternalLink size={12} />
                        <span>[ LIVE_DEMO ]</span>
                      </a>
                    ) : (
                      <div className="flex items-center justify-center py-2 px-3 rounded-lg bg-white/5 text-gray-500 font-mono text-[9.5px] uppercase">
                        LOCAL_ONLY
                      </div>
                    )}

                    {/* Source Code Trigger with Cyber Tooltip */}
                    <div className="relative" data-source-tooltip>
                      {hasSource ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              setActiveTooltipId(isTooltipOpen ? null : work.id)
                            }
                            className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border transition-all duration-200 uppercase tracking-wider text-[10px] cursor-pointer ${
                              isTooltipOpen
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                                : 'bg-white/5 hover:bg-cyan-500/10 border-white/10 hover:border-cyan-500/40 text-gray-300 hover:text-cyan-300'
                            }`}
                          >
                            <Github size={12} />
                            <span>SOURCE</span>
                            <ChevronDown
                              size={11}
                              className={`transition-transform duration-200 ${
                                isTooltipOpen
                                  ? 'rotate-180 text-cyan-400'
                                  : 'text-gray-400'
                              }`}
                            />
                          </button>

                          {/* Mini Cyber Tooltip Popover */}
                          {isTooltipOpen && (
                            <div className="absolute bottom-full mb-2.5 right-0 sm:left-0 sm:right-auto z-50 w-56 p-2 bg-gray-950/95 border border-cyan-500/50 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.35)] backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150 font-mono text-left">
                              {/* Tooltip Header */}
                              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10 text-[9px]">
                                <span className="text-cyan-400 font-bold tracking-wider flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                  SELECT_REPOSITORY
                                </span>
                                <span className="text-[8px] text-gray-500">
                                  GIT_NODE
                                </span>
                              </div>

                              <div className="space-y-1">
                                {/* Frontend Repository Option */}
                                {work.github ? (
                                  <a
                                    href={work.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setActiveTooltipId(null)}
                                    className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white/5 hover:bg-cyan-500/15 border border-white/5 hover:border-cyan-500/40 text-gray-200 hover:text-cyan-300 transition-all text-[10px] group/item cursor-pointer"
                                  >
                                    <div className="flex items-center gap-2">
                                      <Code2
                                        size={13}
                                        className="text-cyan-400 shrink-0"
                                      />
                                      <div className="text-left">
                                        <div className="font-bold text-white group-hover/item:text-cyan-300">
                                          Frontend Repo
                                        </div>
                                        <div className="text-[8px] text-gray-400">
                                          Client / UI
                                        </div>
                                      </div>
                                    </div>
                                    <ExternalLink
                                      size={11}
                                      className="text-gray-400 group-hover/item:text-cyan-300 shrink-0"
                                    />
                                  </a>
                                ) : (
                                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] text-gray-500 text-[9px]">
                                    <Code2
                                      size={12}
                                      className="text-gray-600"
                                    />
                                    <span>Frontend: Private</span>
                                  </div>
                                )}

                                {/* Backend Repository Option */}
                                {work.backendGithub ? (
                                  <a
                                    href={work.backendGithub}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setActiveTooltipId(null)}
                                    className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white/5 hover:bg-purple-500/15 border border-white/5 hover:border-purple-500/40 text-gray-200 hover:text-purple-300 transition-all text-[10px] group/item cursor-pointer"
                                  >
                                    <div className="flex items-center gap-2">
                                      <Server
                                        size={13}
                                        className="text-purple-400 shrink-0"
                                      />
                                      <div className="text-left">
                                        <div className="font-bold text-white group-hover/item:text-purple-300">
                                          Backend Repo
                                        </div>
                                        <div className="text-[8px] text-gray-400">
                                          Server / API
                                        </div>
                                      </div>
                                    </div>
                                    <ExternalLink
                                      size={11}
                                      className="text-gray-400 group-hover/item:text-purple-300 shrink-0"
                                    />
                                  </a>
                                ) : (
                                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] text-gray-500 text-[9px]">
                                    <Server
                                      size={12}
                                      className="text-gray-600"
                                    />
                                    <span>Backend: Monorepo / Cloud</span>
                                  </div>
                                )}
                              </div>

                              {/* Tooltip Pointer Arrow */}
                              <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-gray-950 border-r border-b border-cyan-500/50 rotate-45 pointer-events-none" />
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex items-center justify-center py-2 px-3 rounded-lg bg-white/5 text-gray-500 font-mono text-[9.5px] uppercase">
                          PROPRIETARY
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Explorer Action Button (Only on home page / outside /projects) */}
        {!isProjectsPage && (
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
        )}
      </div>
    </section>
  );
}

export default ProjectPage;
