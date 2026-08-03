'use client';

import myPhoto from '@/assets/myphoto.png';
import { Download, Mail, Phone, MapPin, Calendar, Globe } from 'lucide-react';
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

import RotatingText from '@/components/module/home/RotatingText';
import CustomHeading from '@/components/module/shared/Heading';

function AboutPage() {
  const details = [
    {
      label: 'Phone',
      value: '+8801777233703',
      icon: <Phone size={16} />,
      link: 'tel:+8801777233703',
    },
    {
      label: 'Email',
      value: 'princemahmudpiyas@gmail.com',
      icon: <Mail size={16} />,
      link: 'mailto:princemahmudpiyas@gmail.com',
    },
    { label: 'From', value: 'Rangpur, Bangladesh', icon: <MapPin size={16} /> },
    { label: 'Language', value: 'Bangla, English', icon: <Globe size={16} /> },
  ];

  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <div
      id="about"
      className="relative w-full py-4  px-4 sm:px-6 lg:px-8 overflow-hidden mt-5 md:mt-0"
      ref={ref as any}
    >
      <div className="max-w-6xl mx-auto">
        <CustomHeading heading="About Me" />

        <div className="mt-4 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Photo Section with Stronger Parallax */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-2 bg-linear-to-r from-cyan-500/30 to-blue-600/30 rounded-full blur-xl group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative h-64 w-64 md:h-85 md:w-85 rounded-full border border-white/10 overflow-hidden bg-gray-900 shadow-2xl shadow-cyan-500/10">
              <Image
                alt="Prince Mahmud Piyas"
                src={myPhoto}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* Content Section with Subtle Parallax */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="space-y-3">
              <h1
                className={`text-4xl md:text-5xl font-bold text-white uppercase tracking-tight fade-in-up ${inView ? 'visible' : ''}`}
              >
                Hi! I&apos;m{' '}
                <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                  Prince Mahmud Piyas
                </span>
              </h1>
              <h2 className="text-2xl">
                <RotatingText />
              </h2>
            </div>

            <p
              className={`text-gray-300 leading-relaxed font-light text-base md:text-lg max-w-2xl mx-auto lg:mx-0 fade-in-up ${inView ? 'visible' : ''}`}
              style={{ animationDelay: '0.2s' }}
            >
              I am a{' '}
              <span className="text-cyan-400 font-medium">Backend-focused</span>{' '}
              Full Stack Developer dedicated to architecting high-performance,
              scalable systems. Specializing in the{' '}
              <span className="text-white font-medium border-b border-cyan-500/30">
                Next.js ecosystem
              </span>
              , I bridge the gap between complex server-side logic and seamless
              user interfaces. My goal is to build robust, secure, and
              SEO-optimized applications that don`&#39;`t just work—they excel
              under pressure.
            </p>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 border-t border-white/10 pt-8 mt-4">
              {details.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-4 text-sm md:text-base group/item fade-in-up ${inView ? 'visible' : ''}`}
                  style={{ animationDelay: `${idx * 0.1 + 0.3}s` }}
                >
                  <span className="text-cyan-400 bg-cyan-400/5 p-2.5 rounded-xl border border-white/5 group-hover/item:bg-cyan-400/20 transition-colors">
                    {item.icon}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest text-left">
                      {item.label}
                    </span>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-white hover:text-cyan-400 transition-colors truncate font-medium"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-white truncate font-medium">
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Download Button */}
            <div className="pt-8 flex justify-center lg:justify-start">
              <a
                href="/resume.pdf"
                download="PrinceMahmudPiyas_CV"
                className="flex items-center gap-3 bg-linear-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]"
              >
                <Download size={20} className="animate-pulse" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
