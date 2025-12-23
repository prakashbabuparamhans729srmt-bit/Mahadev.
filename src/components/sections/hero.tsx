
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket, Loader2, Video } from "lucide-react";
import React, { useState, useEffect } from 'react';
import { generateVideo } from "@/ai/flows/veo-flow";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function HeroSection() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createVideo = async () => {
      try {
        const image = PlaceHolderImages.find(img => img.id === 'hero-carousel-8');
        if (!image) {
          throw new Error('Reference image not found for video generation.');
        }
        
        console.log('Generating video from image:', image.imageUrl);
        const result = await generateVideo(image.imageUrl);

        if (result.videoUrl) {
          setVideoUrl(result.videoUrl);
        } else {
          throw new Error('Video generation failed to return a URL.');
        }
      } catch (e: any) {
        console.error("Video generation error:", e);
        setError("वीडियो बनाने में विफल। कृपया बाद में पुनः प्रयास करें।");
      } finally {
        setIsLoading(false);
      }
    };

    createVideo();
  }, []);

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        {isLoading && (
          <div className="w-full h-full bg-black flex flex-col items-center justify-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">AI अपना जादू चला रहा है...</p>
          </div>
        )}
        {error && (
          <div className="w-full h-full bg-black flex flex-col items-center justify-center text-center p-4">
            <Video className="h-16 w-16 text-destructive" />
            <p className="mt-4 text-lg text-destructive">{error}</p>
          </div>
        )}
        {videoUrl && (
          <video
            src={videoUrl}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
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
