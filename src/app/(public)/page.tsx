import AboutPage from '@/components/module/about/AboutPage';
import ContactPage from '@/components/module/contact/ContactPage';
import Hero from '@/components/module/home/Hero';
import ProjectPage from '@/components/module/project/ProjectPage';
import ReviewPage from '@/components/module/review/ReviewPage';
import ServicePage from '@/components/module/service/ServicePage';
import SkillsPage from '@/components/module/skills/centerSpark';

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutPage />
      <ServicePage />
      <SkillsPage />
      <ProjectPage />
      <ReviewPage />
      <ContactPage />
    </div>
  );
}
