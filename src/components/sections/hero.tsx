
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import React from 'react';

export default function HeroSection() {
  return (
    <section className="bg-card border-b w-full">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 items-center md:grid-cols-1 text-center h-[450px]">
          <div className="flex flex-col justify-center items-center space-y-4">
            <div className="space-y-4">
              <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none italic">
                <span className="block text-foreground">डिजिटल</span>
                <span className="block text-accent">उत्कृष्टता</span>
                <span className="block text-foreground">का भविष्य</span>
              </h1>
              <p className="mt-4 max-w-[600px] mx-auto text-muted-foreground md:text-lg">
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
              <Button asChild size="lg" variant="outline" className="shadow-lg transition-transform duration-200 hover:scale-105">
                <Link href="#services">
                   हमारी सेवाएं देखें
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
