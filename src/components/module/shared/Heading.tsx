'use client';

import { useInView } from '@/hooks/useInView';

interface CustomHeadingProps {
  heading: string;
}

const CustomHeading = ({ heading }: CustomHeadingProps) => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  return (
    <div
      className="relative flex items-center justify-center  overflow-hidden "
      ref={ref as any}
    >
      <h1
        className={`text-[60px] md:text-[90px] lg:text-[140px] font-black text-center text-muted-foreground uppercase tracking-tighter select-none fade-in-up ${inView ? 'visible' : ''}`}
        style={{ animationDuration: '1s' }}
      >
        {heading}
      </h1>
    </div>
  );
};

export default CustomHeading;
