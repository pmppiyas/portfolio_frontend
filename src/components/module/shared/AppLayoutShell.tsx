'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

interface AppLayoutShellProps {
  children: React.ReactNode;
}

export default function AppLayoutShell({ children }: AppLayoutShellProps) {
  const pathname = usePathname();

  const isDashboardOrAuth =
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/auth');

  if (isDashboardOrAuth) {
    return <main className="relative w-full min-h-screen">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="relative w-full min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
