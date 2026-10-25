import AppLayoutShell from '@/components/module/shared/AppLayoutShell';
import type { Metadata } from 'next';
import { Kanit, Roboto, Orbitron } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import ReduxProvider from '@/provider/ReduxProvider';
import fs from 'fs';
import path from 'path';

try {
  const pubPath = path.join(process.cwd(), 'public', 'favicon.ico');
  const appPath = path.join(process.cwd(), 'src', 'app', 'favicon.ico');
  if (fs.existsSync(pubPath)) {
    const pubBuf = fs.readFileSync(pubPath);
    fs.writeFileSync(appPath, pubBuf);
  }

  const myPhotoPath = path.join(process.cwd(), 'src', 'assets', 'myphoto.png');
  const ogDestPath = path.join(process.cwd(), 'public', 'og-image.png');
  if (fs.existsSync(myPhotoPath)) {
    fs.writeFileSync(ogDestPath, fs.readFileSync(myPhotoPath));
  }
} catch {}

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-roboto',
});

const kanit = Kanit({
  variable: '--font-kanit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.pmppiyas.dev'),
  title: {
    default: 'Prince Mahmud Piyas | Full-Stack AI Engineer & Systems Architect',
    template: '%s | Prince Mahmud Piyas',
  },
  description:
    'Full-Stack AI Engineer & Distributed Systems Architect specializing in intelligent production architectures, high-performance web systems, and autonomous AI agents.',
  keywords: [
    'Prince Mahmud Piyas',
    'Full-Stack Developer',
    'AI Engineer',
    'Distributed Systems',
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'NestJS',
    'PostgreSQL',
    'Machine Learning',
    'Software Engineer',
    'Portfolio',
  ],
  authors: [
    { name: 'Prince Mahmud Piyas', url: 'https://github.com/pmppiyas' },
  ],
  creator: 'Prince Mahmud Piyas',
  publisher: 'Prince Mahmud Piyas',
  alternates: {
    canonical: 'https://www.pmppiyas.dev',
  },
  icons: {
    icon: [{ url: '/favicon.ico?v=piyas2', sizes: 'any' }],
    shortcut: '/favicon.ico?v=piyas2',
    apple: '/favicon.ico?v=piyas2',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.pmppiyas.dev',
    siteName: 'Prince Mahmud Piyas - Engineering Portfolio',
    title: 'Prince Mahmud Piyas | Full-Stack AI Engineer & Systems Architect',
    description:
      'Full-Stack AI Engineer & Distributed Systems Architect building intelligent, scalable digital solutions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Prince Mahmud Piyas | Full-Stack AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prince Mahmud Piyas | Full-Stack AI Engineer',
    description:
      'Full-Stack AI Engineer & Distributed Systems Architect building intelligent, scalable digital solutions.',
    creator: '@pmppiyas',
    site: '@pmppiyas',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLdPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Prince Mahmud Piyas',
  alternateName: ['PMP Piyas', 'Prince Mahmud', 'pmppiyas'],
  jobTitle: 'Full-Stack AI Engineer & Distributed Systems Architect',
  url: 'https://www.pmppiyas.dev',
  image: 'https://www.pmppiyas.dev/og-image.png',
  sameAs: [
    'https://github.com/pmppiyas',
    'https://linkedin.com/in/pmppiyas',
    'https://twitter.com/pmppiyas',
  ],
  knowsAbout: [
    'Full-Stack Development',
    'AI Engineering',
    'Distributed Systems',
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'NestJS',
    'PostgreSQL',
    'Prisma ORM',
    'LangChain',
    'Vector Databases',
    'RAG Systems',
  ],
};

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Prince Mahmud Piyas - Engineering Portfolio',
  url: 'https://www.pmppiyas.dev',
  author: {
    '@type': 'Person',
    name: 'Prince Mahmud Piyas',
  },
  description:
    'Full-Stack AI Engineer & Distributed Systems Architect building intelligent, scalable digital solutions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body
        className={`${roboto.variable} ${kanit.variable} ${orbitron.variable} antialiased bg-background text-foreground min-h-screen `}
      >
        <ReduxProvider>
          <AppLayoutShell>{children}</AppLayoutShell>
          <Toaster position="top-right" richColors />
        </ReduxProvider>
      </body>
    </html>
  );
}
