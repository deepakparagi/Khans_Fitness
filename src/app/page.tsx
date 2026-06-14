import { HeroSection } from '@/components/home/HeroSection';
import { AboutPreview } from '@/components/home/AboutPreview';
import { ServicesSection } from '@/components/home/ServicesSection';
import { TransformationsPreview } from '@/components/home/TransformationsPreview';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { CTASection } from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <ServicesSection />
      <TransformationsPreview />
      <ReviewsSection />
      <CTASection />
    </>
  );
}
