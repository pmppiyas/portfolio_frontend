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
        className={`absolute top-20 left-10 w-72 h-72 rounded-full -z-10 fade-in-up ${bg1InView ? 'visible' : ''}`}
        style={{
          background:
            'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        ref={bg2Ref as any}
        className={`absolute bottom-10 right-10 w-80 h-80 rounded-full -z-10 fade-in-up ${bg2InView ? 'visible' : ''}`}
        style={{
          background:
            'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        <CustomHeading
          heading={'I Do'}
          badge="SYS.SERVICES // ARCHITECTURE_MODULES"
          subtitle="Enterprise Full-Stack Architecture, ERP Systems & Cloud Engineering"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, idx) => (
            <ServiceCard key={idx} index={idx} service={service} />
          ))}
        </div>
      </div>

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

export default ServicePage;
