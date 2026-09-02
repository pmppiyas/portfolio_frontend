import DashboardPage from '@/components/module/dashboard/DashboardPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Console // Command Center',
  description: 'Administrative command center for Prince Mahmud Piyas portfolio.',
};

export default function Page() {
  return <DashboardPage />;
}
