import { techBlogsDemo } from '@/assets/assets';
import { BlogCard } from '@/components/module/blog/BlogCard';
import CustomHeading from '@/components/module/shared/Heading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All blogs - Prisma blog',
  description: 'A blog built with Next.js, Prisma, and Tailwind CSS',
};

export default async function Blogs() {
  // const response = await fetchBlog();
  // const blogs: IBlog[] = response?.data;
  // console.log(blogs);
  return (
    <div className="relative w-full py-4  px-4 sm:px-6 lg:px-8 overflow-hidden mt-5 md:mt-0">
      <CustomHeading heading="All Blogs" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  w-full lg:max-w-6xl  mx-auto  px-6">
        {techBlogsDemo.map((blog, idx: number) => (
          <BlogCard key={idx} {...blog} />
        ))}
      </div>
    </div>
  );
}
