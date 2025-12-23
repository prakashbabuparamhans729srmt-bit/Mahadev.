"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import React from 'react';
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full bg-background text-foreground">
      <div className="container px-4 md:px-6 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="font-headline text-7xl font-bold tracking-tighter sm:text-8xl xl:text-9xl/none italic">
                <span className="block">डिजिटल</span>
                <span className="block text-accent">उत्कृष्टता</span>
                <span className="block">का भविष्य</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-lg">
                हम आपके विज़न को शक्तिशाली सॉफ्टवेयर में बदलते हैं। Hajaro Grahako के साथ अपने डिजिटल सफर को शानदार बनाएं।
              </p>
            </div>
            <div className="space-y-4 pt-6">
                 <h2 className="font-headline text-4xl font-bold tracking-tighter text-accent">Hajaro Grahako - पूर्ण विकास समाधान</h2>
                 <p className="max-w-[600px] text-muted-foreground md:text-lg">
                    हम आपके विचारों को डिजिटल हकीकत में बदलते हैं। वेबसाइट, मोबाइल ऐप, और कस्टम सॉफ्टवेयर समाधानों के लिए आपके विश्वसनीय पार्टनर।
                 </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
              <Button asChild size="lg" className="shadow-lg transition-transform duration-200 hover:scale-105 animate-fast-blinking-glow">
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
           <div className="flex items-center justify-center">
             <Image
                alt="Paris street scene"
                src="https://images.unsplash.com/photo-1543349689-9a4d426bee8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMHN0cmVldCUyMGF0JTIwbmlnaHR8ZW58MHx8fHwxNzI1NTM4NzgxfDA&ixlib=rb-4.0.3&q=80&w=1080"
                width={600}
                height={600}
                className="rounded-lg object-cover shadow-2xl"
                data-ai-hint="paris street night"
              />
           </div>
        </div>
      </div>
    </section>
  );
}
