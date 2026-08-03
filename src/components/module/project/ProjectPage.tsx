'use client';

import assets from '@/assets/assets';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { fadeInUp } from '@/lib/utils';
import CustomHeading from '@/components/module/shared/Heading';

const { myWorks } = assets;

function ProjectPage() {
  const router = useRouter();

  return (
    <div
      id="projects"
      className="relative w-full py-12 px-4 sm:px-6 lg:px-8  overflow-hidden mt-5 md:mt-0"
    >
      <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl -z-10" />

      <CustomHeading heading={'I Build'} />

      <div className="space-y-16 w-full lg:max-w-7xl mx-auto  mt-16 grid grid-cols-1 md:grid-cols-2  gap-8">
        {myWorks.map((work, idx) => {
          return (
            <motion.div
              key={idx}
              {...fadeInUp}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              {/* Project Image - Takes 80-90% width on large screens */}
              <div
                onClick={() => router.push(work.live)}
                className="group relative w-full  cursor-pointer"
              >
                <div className="relative h-80 md:h-100 lg:h-125 w-full overflow-hidden rounded-2xl bg-gray-900 border border-white/10 group-hover:border-cyan-500/50 transition-all duration-500 shadow-2xl group-hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]">
                  <Image
                    src={work?.photo}
                    alt={work?.name || 'Project'}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-gray-950/90 via-gray-950/20 to-transparent" />

                  {/* Floating Badge */}
                  <div className="absolute top-6 left-6 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 px-4 py-2 rounded-full">
                    <span className="text-cyan-400 text-sm font-semibold">
                      Project {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Hover Corner Accents */}
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-tr-2xl" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-bl-2xl" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        {...fadeInUp}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="flex items-center justify-center pt-16"
      >
        <Link href={'/projects'}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="link"
              className=" shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
            >
              See All Projects
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}

export default ProjectPage;
