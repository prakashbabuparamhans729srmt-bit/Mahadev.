
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import React from 'react';
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative bg-black text-white w-full h-[600px] md:h-[700px] flex items-center justify-center text-center overflow-hidden">
      <Image
        alt="Paris street scene at night"
        src="https://images.unsplash.com/photo-1543349689-9a4d426bee8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMHN0cmVldCUyMGF0JTIwbmlnaHR8ZW58MHx8fHwxNzI1NTM4NzgxfDA&ixlib=rb-4.0.3&q=80&w=1920"
        fill
        className="object-cover"
        data-ai-hint="paris street night"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 container px-4 md:px-6">
        <div className="flex flex-col justify-center items-center space-y-4">
          <div className="space-y-4">
            <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none italic">
              <span className="block">डिजिटल</span>
              <span className="block text-accent animate-blinking-glow">उत्कृष्टता</span>
              <span className="block">का भविष्य</span>
            </h1>
            <p className="mt-4 max-w-[600px] mx-auto text-neutral-200 md:text-lg">
              हम आपके विज़न को शक्तिशाली सॉफ्टवेयर में बदलते हैं। Hajaro Grahako के साथ अपने डिजिटल सफर को शानदार बनाएं।
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
            <Button asChild size="lg" className="shadow-lg transition-transform duration-200 hover:scale-105">
              <Link href="/start-project">
                <Rocket className="mr-2 h-5 w-5" />
                प्रोजेक्ट शुरू करें
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="shadow-lg transition-transform duration-200 hover:scale-105 border-white text-white hover:bg-white hover:text-black">
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
