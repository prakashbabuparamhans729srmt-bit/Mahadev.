
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function HeroSection() {
    const heroImage = PlaceHolderImages.find(img => img.id === 'hero-laptop');
  
    return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-4">
               <h1 className="font-headline text-7xl font-bold tracking-tighter sm:text-8xl xl:text-9xl/none italic">
                <span className="block text-foreground">डिजिटल</span>
                <span className="block text-accent">उत्कृष्टता</span>
                <span className="block text-foreground">का भविष्य</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                हम आपके विज़न को शक्तिशाली सॉफ्टवेयर में बदलते हैं। Hajaro Grahako के साथ अपने डिजिटल सफर को शानदार बनाएं।
              </p>
               <h2 className="font-headline text-4xl font-bold tracking-tighter text-accent pt-6">Hajaro Grahako - पूर्ण विकास समाधान</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-lg">
                हम आपके विचारों को डिजिटल हकीकत में बदलते हैं। वेबसाइट, मोबाइल ऐप, और कस्टम सॉफ्टवेयर समाधानों के लिए आपके विश्वसनीय पार्टनर।
                </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
              <Button asChild size="lg" className="shadow-lg transition-transform duration-200 hover:scale-105 animate-fast-blinking-glow">
                <Link href="/login">
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
          {heroImage && (
             <div className="mx-auto overflow-hidden rounded-xl lg:order-last">
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    width="600"
                    height="750"
                    className="object-cover w-full h-full"
                    data-ai-hint={heroImage.imageHint}
                    priority={true}
                />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
