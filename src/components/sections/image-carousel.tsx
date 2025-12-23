'use client';

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ImageCarouselSection() {
  const carouselImages = PlaceHolderImages.filter(img => img.id.startsWith('hero-carousel-'));

  return (
    <section id="image-carousel" className="py-12 md:py-16 bg-secondary/30">
      <div className="container">
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: true,
            }),
          ]}
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {carouselImages.map((image) => (
              <CarouselItem key={image.id} className="basis-full">
                <div className="p-1">
                  <div className="overflow-hidden rounded-lg aspect-video relative">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
