import Blogs from '@/components/module/blog/BlogPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Blogs // Technical Articles',
  description: 'Technical blog articles on AI Systems, Distributed Architectures & Full-Stack Development.',
};

const page = () => {
  return (
    <div>
      <Blogs />
    </div>
  );
};

export default page;
