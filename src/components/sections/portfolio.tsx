
'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import React from "react";

export default function PortfolioSection() {
  const portfolioImages = PlaceHolderImages.filter(img => img.id.startsWith("portfolio-"));
  const { toast } = useToast();

  const handleCaseStudyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    toast({
      title: "सुविधा जल्द ही आ रही है",
      description: "यह केस स्टडी जल्द ही उपलब्ध होगी।",
    });
  };


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
          {portfolioImages.map((image) => (
            <Link href="#" key={image.id} onClick={handleCaseStudyClick}>
              <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <Image
                  alt={image.description}
                  className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  height="337"
                  src={image.imageUrl}
                  width="600"
                  data-ai-hint={image.imageHint}
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold font-headline text-lg">{image.description}</h3>
                  <p className="text-sm text-accent font-semibold flex items-center mt-2">
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
