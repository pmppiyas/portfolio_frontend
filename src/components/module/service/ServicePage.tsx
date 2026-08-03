'use client';

import assets from '@/assets/assets';
import ServiceCard from '@/components/module/service/ServiceCard';
import CustomHeading from '@/components/module/shared/Heading';
import { useInView } from '@/hooks/useInView';

const { services } = assets;

function ServicePage() {
  const { ref: bg1Ref, inView: bg1InView } = useInView({ threshold: 0.1 });
  const { ref: bg2Ref, inView: bg2InView } = useInView({ threshold: 0.1 });

  return (
    <div
      id="service"
      className="relative w-full py-12 px-4 sm:px-6 lg:px-8 overflow-hidden "
    >
      {/* Background Parallax Elements */}
      <div
        ref={bg1Ref as any}
        className={`absolute top-20 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10 fade-in-up ${bg1InView ? 'visible' : ''}`}
      />
      <div
        ref={bg2Ref as any}
        className={`absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl -z-10 fade-in-up ${bg2InView ? 'visible' : ''}`}
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        <CustomHeading heading={'I Do'} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
          {services.map((service, idx) => (
            <ServiceCard key={idx} service={service} />
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}

export default ServicePage;
