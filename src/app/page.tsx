'use client';
import dynamic from 'next/dynamic';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Skeleton } from '@/components/ui/skeleton';
import HeroSection from '@/components/sections/hero';

const ServicesSection = dynamic(() => import('@/components/sections/services'), {
    loading: () => <Skeleton className="h-[50vh] w-full" />,
});
const PortfolioSection = dynamic(() => import('@/components/sections/portfolio'), {
    loading: () => <Skeleton className="h-[50vh] w-full" />,
});
const ProcessSection = dynamic(() => import('@/components/sections/process'), {
    loading: () => <Skeleton className="h-[50vh] w-full" />,
});
const TestimonialsSection = dynamic(() => import('@/components/sections/testimonials'), {
    loading: () => <Skeleton className="h-[50vh] w-full" />,
});
const CtaSection = dynamic(() => import('@/components/sections/cta'), {
    loading: () => <Skeleton className="h-[50vh] w-full" />,
});
const PricingSection = dynamic(() => import('@/components/sections/pricing'), {
    loading: () => <Skeleton className="h-[50vh] w-full" />,
});


export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <TestimonialsSection />
        <CtaSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
