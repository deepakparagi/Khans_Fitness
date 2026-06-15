import { HeroSection } from '@/components/home/HeroSection';
import { AboutPreview } from '@/components/home/AboutPreview';
import { ServicesSection } from '@/components/home/ServicesSection';
import { TransformationsPreview } from '@/components/home/TransformationsPreview';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { CTASection } from '@/components/home/CTASection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Khan's Fitness | Gadag's Premier Gym | Est. 2015",
  description: "North Karnataka's most advanced fitness destination. Est. 2015 · Unisex · AI-Powered. Results guaranteed.",
};

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
