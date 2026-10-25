import ProjectPage from '@/components/module/project/ProjectPage';
import StringArt from '@/components/wrapper/StringArt';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects // Production Systems & Architectures',
  description:
    'Explore full-stack web applications, scalable ERPs, and distributed cloud systems engineered by Prince Mahmud Piyas.',
  alternates: {
    canonical: 'https://www.pmppiyas.dev/projects',
  },
  openGraph: {
    title: 'Projects // Prince Mahmud Piyas',
    description:
      'Full-Stack Web Applications, Scalable ERPs & Cloud Systems engineered by Prince Mahmud Piyas.',
    url: 'https://www.pmppiyas.dev/projects',
  },
};

const page = () => {
  return (
    <div>
      <StringArt>
        <ProjectPage />
      </StringArt>
    </div>
  );
};

export default page;
