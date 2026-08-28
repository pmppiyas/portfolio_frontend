import { techBlogsDemo } from '@/assets/assets';
import { BlogCard } from '@/components/module/blog/BlogCard';
import CustomHeading from '@/components/module/shared/Heading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All blogs - Prisma blog',
  description: 'A blog built with Next.js, Prisma, and Tailwind CSS',
};

export default async function Blogs() {
  return (
    <div className="relative w-full min-h-screen pt-13  pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-8">
        <CustomHeading
          heading="All Blogs"
          badge="SYS.DISPATCH // TECHNICAL_ARTICLES"
          subtitle="Deep Dives into AI Systems, Distributed Architectures & Full-Stack Development"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {techBlogsDemo.map((blog, idx: number) => (
            <BlogCard key={idx} {...blog} />
          ))}
        </div>
      </div>
    </div>
  );
}
