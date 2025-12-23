
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function HeroSection() {
    const heroImage = PlaceHolderImages.find(img => img.id === 'hero-carousel-1');
  
    return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        {heroImage && (
            <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
            />
        )}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col justify-center space-y-6 text-center items-center">
          <div className="space-y-4">
            <h1 className="font-headline text-7xl font-bold tracking-tighter sm:text-8xl xl:text-9xl/none italic">
              <span className="block">डिजिटल</span>
              <span className="block text-accent">उत्कृष्टता</span>
              <span className="block">का भविष्य</span>
            </h1>
            <p className="max-w-[600px] text-gray-200 md:text-lg mx-auto">
              हम आपके विज़न को शक्तिशाली सॉफ्टवेयर में बदलते हैं। Hajaro Grahako के साथ अपने डिजिटल सफर को शानदार बनाएं।
            </p>
          </div>
          <div className="space-y-4 pt-6 max-w-[700px]">
            <h2 className="font-headline text-4xl font-bold tracking-tighter text-accent">Hajaro Grahako - पूर्ण विकास समाधान</h2>
            <p className="text-gray-300 md:text-lg">
              हम आपके विचारों को डिजिटल हकीकत में बदलते हैं। वेबसाइट, मोबाइल ऐप, और कस्टम सॉफ्टवेयर समाधानों के लिए आपके विश्वसनीय पार्टनर।
            </p>
          </div>
          <div className="flex flex-col gap-4 min-[400px]:flex-row pt-4">
            <Button asChild size="lg" className="shadow-lg transition-transform duration-200 hover:scale-105 animate-fast-blinking-glow">
              <Link href="/start-project">
                <Rocket className="mr-2 h-5 w-5" />
                प्रोजेक्ट शुरू करें
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="shadow-lg transition-transform duration-200 hover:scale-105 border-white/50 text-white hover:bg-white hover:text-black">
              <Link href="#services">
                हमारी सेवाएं देखें
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
