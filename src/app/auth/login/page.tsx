import LoginPage from '@/components/module/auth/LoginPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Console // Login',
  description:
    'Authorized administrative authentication node for Prince Mahmud Piyas portfolio.',
};

export default function Page() {
  return <LoginPage />;
}
