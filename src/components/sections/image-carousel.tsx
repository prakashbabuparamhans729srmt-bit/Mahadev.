'use client';

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ImageCarouselSection() {
  const carouselImages = PlaceHolderImages.filter(img => img.id.startsWith('hero-carousel-'));

  return (
    <section id="image-carousel" className="py-12 md:py-16 bg-secondary/30">
      <div className="container">
        <div className="relative w-full h-[50vh] overflow-hidden rounded-lg">
          {carouselImages.map((image, index) => (
            <div
              key={image.id}
              className="absolute inset-0 w-full h-full animate-fade"
              style={{ animationDelay: `${index * 5}s` }}
            >
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
                priority={index === 0} // Load the first image eagerly
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
