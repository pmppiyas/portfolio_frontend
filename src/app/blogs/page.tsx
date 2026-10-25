import Blogs from '@/components/module/blog/BlogPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Blogs // Technical Articles',
  description:
    'Technical blog articles on AI Systems, Distributed Architectures & Full-Stack Development by Prince Mahmud Piyas.',
  alternates: {
    canonical: 'https://www.pmppiyas.dev/blogs',
  },
  openGraph: {
    title: 'All Blogs // Prince Mahmud Piyas',
    description:
      'Deep dives into AI Systems, Distributed Architectures & Full-Stack Development.',
    url: 'https://www.pmppiyas.dev/blogs',
  },
};

const page = () => {
  return (
    <div>
      <Blogs />
    </div>
  );
};

export default page;
