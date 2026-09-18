'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatBubbleWidget from '@/components/module/ai-assistant/ChatBubbleWidget';

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

  const isAssistantPage = pathname === '/assistant';

  if (isAssistantPage) {
    return (
      <>
        <Navbar />
        <main className="relative w-full h-[100dvh] overflow-hidden">{children}</main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="relative w-full min-h-screen">{children}</main>
      <ChatBubbleWidget />
      <Footer />
    </>
  );
}
