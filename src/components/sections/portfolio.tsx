'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { caseStudies } from "@/lib/case-studies";

export default function PortfolioSection() {
  const { toast } = useToast();

  return (
    <section id="portfolio">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
              हमारा काम
            </div>
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">
              हमारे सफल प्रोजेक्ट्स
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              हमारे कुछ बेहतरीन कामों पर एक नज़र डालें जो हमने अपने अद्भुत ग्राहकों के लिए बनाए हैं।
            </p>
          </div>
        </div>
        <div className="mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 mt-12">
          {caseStudies.map((caseStudy) => (
            <Link href={`/portfolio/${caseStudy.slug}`} key={caseStudy.id}>
              <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                <div className="aspect-video w-full relative">
                  <Image
                    alt={caseStudy.title}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    src={caseStudy.imageUrl}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-4 flex flex-col flex-1">
                  <div className="flex-1">
                    <h3 className="font-semibold font-headline text-lg">{caseStudy.title}</h3>
                    <p className="text-sm text-muted-foreground">{caseStudy.industry}</p>
                  </div>
                  <p className="text-sm text-accent font-semibold flex items-center mt-4">
                    केस स्टडी देखें <ArrowRight className="ml-1 h-4 w-4" />
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
