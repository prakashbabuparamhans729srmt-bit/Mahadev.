
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-card border-b">
      <div className="px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4 py-12 md:py-24 lg:py-32">
            <div className="space-y-8">
              <div>
                <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none italic">
                  <span className="block text-foreground">डिजिटल</span>
                  <span className="block text-accent">उत्कृष्टता</span>
                  <span className="block text-foreground">का भविष्य</span>
                </h1>
                <p className="mt-4 max-w-[600px] text-muted-foreground md:text-lg">
                  हम आपके विज़न को शक्तिशाली सॉफ्टवेयर में बदलते हैं। Hajaro Grahako के साथ अपने डिजिटल सफर को शानदार बनाएं।
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="font-headline text-3xl font-bold tracking-tighter text-primary sm:text-5xl xl:text-6xl/none">
                  Hajaro Grahako - पूर्ण विकास समाधान
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  हम आपके विचारों को डिजिटल हकीकत में बदलते हैं। वेबसाइट, मोबाइल ऐप, और कस्टम सॉफ्टवेयर समाधानों के लिए आपके विश्वसनीय पार्टनर।
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
              <Button asChild size="lg" className="shadow-lg transition-transform duration-200 hover:scale-105">
                <Link href="/start-project">
                  <Rocket className="mr-2 h-5 w-5" />
                  प्रोजेक्ट शुरू करें
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="shadow-lg transition-transform duration-200 hover:scale-105">
                <Link href="#services">
                  हमारी सेवाएं देखें
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse"></div>
            </div>
            <img
              alt="Hero"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full"
              height="550"
              width="550"
              data-ai-hint="abstract geometric pattern"
              src="https://picsum.photos/seed/hero/550/550"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
