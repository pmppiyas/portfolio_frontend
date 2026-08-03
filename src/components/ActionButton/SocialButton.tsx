'use client';
import { useInView } from '@/hooks/useInView';
import {
  FaFacebookSquare,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa';

function SocialButton() {
  const socials = [
    {
      icon: <FaFacebookSquare size={24} />,
      link: 'https://www.facebook.com/princempiyas',
      color: 'hover:text-[#1877F2]',
      shadow: 'shadow-[#1877F2]/40',
    },
    {
      icon: <FaTwitter size={24} />,
      link: 'https://www.twitter.com/pmppiyas',
      color: 'hover:text-[#1DA1F2]',
      shadow: 'shadow-[#1DA1F2]/40',
    },
    {
      icon: <FaLinkedin size={24} />,
      link: 'https://www.linkedin.com/in/pmppiyas',
      color: 'hover:text-[#0A66C2]',
      shadow: 'shadow-[#0A66C2]/40',
    },
    {
      icon: <FaGithub size={24} />,
      link: 'https://www.github.com/pmppiyas',
      color: 'hover:text-primary',
      shadow: 'shadow-primary/40',
    },
    {
      icon: <FaInstagram size={24} />,
      link: 'https://www.instagram.com/pmppiyas',
      color: 'hover:text-[#E4405F]',
      shadow: 'shadow-[#E4405F]/40',
    },
  ];

  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref as any}
      className={`flex items-center gap-4 py-4 fade-in-up ${inView ? 'visible' : ''}`}
    >
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ animationDelay: `${index * 0.1}s` }}
          className={`
            fade-in-up ${inView ? 'visible' : ''}
            relative p-3 rounded-xl border border-white/10 bg-white/5
            text-white/60 transition-all duration-300
            ${social.color} hover:bg-white/10 hover:border-white/20
            hover:shadow-[0_0_15px_-3px_rgba(255,255,255,0.1)]
            flex items-center justify-center
            group
          `}
        >
          <span className="relative z-10">{social.icon}</span>
        </a>
      ))}
    </div>
  );
}

export default SocialButton;
