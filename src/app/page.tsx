
import HeroSection from '@/components/sections/hero';
import ServicesSection from '@/components/sections/services';
import PricingSection from '@/components/sections/pricing';
import PortfolioSection from '@/components/sections/portfolio';
import ProcessSection from '@/components/sections/process';
import TestimonialsSection from '@/components/sections/testimonials';
import CtaSection from '@/components/sections/cta';
import Footer from '@/components/footer';
import Header from '@/components/header';
import ImageCarouselSection from '@/components/sections/image-carousel';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ImageCarouselSection />
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
