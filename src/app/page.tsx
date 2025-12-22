
import HeroSection from '@/components/sections/hero';
import ServicesSection from '@/components/sections/services';
import PricingSection from '@/components/sections/pricing';
import PortfolioSection from '@/components/sections/portfolio';
import ProcessSection from '@/components/sections/process';
import TestimonialsSection from '@/components/sections/testimonials';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <PricingSection />
        <PortfolioSection />
        <ProcessSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
