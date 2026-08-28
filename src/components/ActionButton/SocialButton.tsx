'use client';
import { useInView } from '@/hooks/useInView';
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from 'react-icons/fa6';

interface SocialItem {
  name: string;
  tag: string;
  icon: any;
  link: string;
  glowColor: string;
  textColor: string;
}

const socials: SocialItem[] = [
  {
    name: 'GitHub',
    tag: 'GH_01',
    icon: FaGithub,
    link: 'https://www.github.com/pmppiyas',
    glowColor: 'group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]',
    textColor: 'group-hover:text-cyan-300',
  },
  {
    name: 'LinkedIn',
    tag: 'IN_02',
    icon: FaLinkedinIn,
    link: 'https://www.linkedin.com/in/pmppiyas',
    glowColor: 'group-hover:border-[#0A66C2] group-hover:shadow-[0_0_15px_rgba(10,102,194,0.4)]',
    textColor: 'group-hover:text-[#38bdf8]',
  },
  {
    name: 'Twitter / X',
    tag: 'X_03',
    icon: FaXTwitter,
    link: 'https://www.twitter.com/pmppiyas',
    glowColor: 'group-hover:border-white/60 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]',
    textColor: 'group-hover:text-white',
  },
  {
    name: 'Facebook',
    tag: 'FB_04',
    icon: FaFacebookF,
    link: 'https://www.facebook.com/princempiyas',
    glowColor: 'group-hover:border-[#1877F2] group-hover:shadow-[0_0_15px_rgba(24,119,242,0.4)]',
    textColor: 'group-hover:text-[#60a5fa]',
  },
  {
    name: 'Instagram',
    tag: 'IG_05',
    icon: FaInstagram,
    link: 'https://www.instagram.com/pmppiyas',
    glowColor: 'group-hover:border-[#E4405F] group-hover:shadow-[0_0_15px_rgba(228,64,95,0.4)]',
    textColor: 'group-hover:text-[#f472b6]',
  },
];

function SocialButton() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref as any}
      className={`flex flex-wrap items-center gap-2.5 py-2 font-mono fade-in-up ${
        inView ? 'visible' : ''
      }`}
    >
      {socials.map((social, index) => {
        const Icon = social.icon;
        return (
          <a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            title={social.name}
            className={`
              group relative flex items-center gap-1.5 px-3 py-2 rounded-lg
              bg-gray-950/80 border border-white/10
              text-gray-400 transition-all duration-200
              hover:bg-gray-900/90 hover:-translate-y-0.5
              ${social.glowColor}
            `}
          >
            {/* Cyber Corner Markers */}
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-transparent group-hover:border-cyan-400 transition-colors" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-transparent group-hover:border-cyan-400 transition-colors" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-transparent group-hover:border-cyan-400 transition-colors" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-transparent group-hover:border-cyan-400 transition-colors" />

            <Icon
              size={15}
              className={`transition-colors duration-200 ${social.textColor}`}
            />
            <span
              className={`text-[10px] font-bold tracking-wider transition-colors duration-200 ${social.textColor}`}
            >
              {social.tag}
            </span>
          </a>
        );
      })}
    </div>
  );
}

export default SocialButton;
