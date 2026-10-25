import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Prince Mahmud Piyas | Full-Stack AI Engineer',
    short_name: 'PMP Piyas',
    description:
      'Full-Stack AI Engineer & Distributed Systems Architect specializing in intelligent production architectures, high-performance web systems, and autonomous AI agents.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030712',
    theme_color: '#06b6d4',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/og-image.png',
        sizes: '1200x630',
        type: 'image/png',
      },
    ],
  };
}
