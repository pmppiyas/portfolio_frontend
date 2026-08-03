/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import assets from '@/assets/assets';
import ProgressBar from '@/components/module/skills/ProgressBar';

import { useInView } from '@/hooks/useInView';
import SkillForceGraph from '@/components/module/skills/SkillForceGraph';
import CustomHeading from '@/components/module/shared/Heading';

const { skills } = assets;

function SkillsPage() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref as any}
      id="skills"
      className="relative min-h-screen py-20 overflow-hidden"
    >
      <div className="absolute top-40 left-0 w-72 h-72 bg-blue-600/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[120px] -z-10" />

      <CustomHeading heading={'I Know'} />

      <div
        className={`flex flex-col lg:flex-row gap-12 lg:gap-20 mx-auto max-w-7xl items-center justify-between px-6 mt-16 fade-in-up ${inView ? 'visible' : ''}`}
      >
        <div className="lg:w-1/2 w-full flex justify-center items-center  ">
          <SkillForceGraph
            skills={{
              frontend: skills.frontend?.map((img) => img.src),
              backend: skills.backend?.map((img) => img.src),
              database: skills.database?.map((img) => img.src),
              ai: skills.ai?.map((img) => img.src),
            }}
          />
        </div>

        <div className="lg:w-1/2 w-full space-y-4">
          <ProgressBar />
        </div>
      </div>
    </div>
  );
}

export default SkillsPage;
