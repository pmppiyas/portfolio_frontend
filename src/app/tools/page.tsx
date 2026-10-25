import ToolsPage from '@/components/module/tools/ToolsPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Developer Tools // Engineering Utilities',
  description:
    'Interactive developer utilities, code playground, and engineering productivity tools built by Prince Mahmud Piyas.',
  alternates: {
    canonical: 'https://www.pmppiyas.dev/tools',
  },
  openGraph: {
    title: 'Developer Tools // Prince Mahmud Piyas',
    description: 'Interactive utilities and engineering productivity tools.',
    url: 'https://www.pmppiyas.dev/tools',
  },
};

export default function Page() {
  return <ToolsPage />;
}
