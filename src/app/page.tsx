'use client';
import dynamic from 'next/dynamic';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Skeleton } from '@/components/ui/skeleton';
import HeroSection from '@/components/sections/hero';
import LazySection from '@/components/lazy-section';

const ServicesSection = dynamic(() => import('@/components/sections/services'), {
  loading: () => <Skeleton className="h-[50vh] w-full" />,
  ssr: false,
});
const PortfolioSection = dynamic(
  () => import('@/components/sections/portfolio'),
  {
    loading: () => <Skeleton className="h-[50vh] w-full" />,
    ssr: false,
  }
);
const ProcessSection = dynamic(() => import('@/components/sections/process'), {
  loading: () => <Skeleton className="h-[50vh] w-full" />,
  ssr: false,
});
const TestimonialsSection = dynamic(
  () => import('@/components/sections/testimonials'),
  {
    loading: () => <Skeleton className="h-[50vh] w-full" />,
    ssr: false,
  }
);
const CtaSection = dynamic(() => import('@/components/sections/cta'), {
  loading: () => <Skeleton className="h-[50vh] w-full" />,
  ssr: false,
});
const PricingSection = dynamic(() => import('@/components/sections/pricing'), {
  loading: () => <Skeleton className="h-[50vh] w-full" />,
  ssr: false,
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <LazySection>
          <ServicesSection />
        </LazySection>
        <LazySection>
          <PortfolioSection />
        </LazySection>
        <LazySection>
          <ProcessSection />
        </LazySection>
        <LazySection>
          <TestimonialsSection />
        </LazySection>
        <LazySection>
          <CtaSection />
        </LazySection>
        <LazySection>
          <PricingSection />
        </LazySection>
      </main>
      <Footer />
    </div>
  );
}
