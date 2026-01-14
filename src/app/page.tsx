'use client';
import Header from '@/components/header';
import Footer from '@/components/footer';
import HeroSection from '@/components/sections/hero';
import ServicesSection from '@/components/sections/services';
import LazySection from '@/components/lazy-section';
import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import sections that are below the fold
const PortfolioSection = React.lazy(() => import('@/components/sections/portfolio'));
const ProcessSection = React.lazy(() => import('@/components/sections/process'));
const TestimonialsSection = React.lazy(() => import('@/components/sections/testimonials'));
const CtaSection = React.lazy(() => import('@/components/sections/cta'));
const PricingSection = React.lazy(() => import('@/components/sections/pricing'));

const SectionSkeleton = () => (
  <div className="container py-12 md:py-24 lg:py-32">
      <Skeleton className="h-[50vh] w-full" />
  </div>
);


export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <LazySection>
            <Suspense fallback={<SectionSkeleton />}>
                <PortfolioSection />
            </Suspense>
        </LazySection>
        <LazySection>
            <Suspense fallback={<SectionSkeleton />}>
                <ProcessSection />
            </Suspense>
        </LazySection>
        <LazySection>
            <Suspense fallback={<SectionSkeleton />}>
                <TestimonialsSection />
            </Suspense>
        </LazySection>
        <LazySection>
            <Suspense fallback={<SectionSkeleton />}>
                <CtaSection />
            </Suspense>
        </LazySection>
        <LazySection>
            <Suspense fallback={<SectionSkeleton />}>
                <PricingSection />
            </Suspense>
        </LazySection>
      </main>
      <Footer />
    </div>
  );
}
