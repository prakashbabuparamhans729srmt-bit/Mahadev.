import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Users } from "lucide-react";

const testimonials = [
  {
    id: "testimonial-1",
    name: "प्रिया शर्मा",
    title: "सीईओ, फैशन फॉरवर्ड",
    quote: "Hajaro Grahako ने हमारी ई-कॉमर्स साइट को बदल दिया। उनकी टीम पेशेवर और अविश्वसनीय रूप से कुशल है। बिक्री में 30% की वृद्धि हुई!",
  },
  {
    id: "testimonial-2",
    name: "रोहित वर्मा",
    title: "संस्थापक, यात्रा डायरी",
    quote: "हमारे मोबाइल ऐप को शानदार फीडबैक मिला है, यह सब उनकी विशेषज्ञता के कारण है। प्रक्रिया सहज थी और परिणाम अपेक्षाओं से बढ़कर थे।",
  },
  {
    id: "testimonial-3",
    name: "अमित सिंह",
    title: "प्रबंधक, टेक सॉल्यूशंस",
    quote: "एक जटिल वेब ऐप के लिए एक समर्पित टीम की आवश्यकता थी, और उन्होंने इसे पूरा किया। 24/7 समर्थन जीवन रक्षक रहा है। अत्यधिक अनुशंसित!",
  },
];

export default function TestimonialsSection() {
  const testimonialImages = PlaceHolderImages.filter(img => img.id.startsWith("testimonial-"));

  return (
    <section id="testimonials">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
              ग्राहक प्रशंसापत्र
            </div>
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">
              हमारे ग्राहक क्या कहते हैं
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              हम अपने ग्राहकों के साथ स्थायी संबंध बनाने में विश्वास करते हैं।
            </p>
          </div>
        </div>
        <div className="mt-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => {
                const image = testimonialImages.find(img => img.id === testimonial.id);
                return (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                    <div className="p-1">
                      <Card className="h-full shadow-md">
                        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                          {image && (
                            <Image
                              alt={testimonial.name}
                              className="rounded-full mb-4"
                              height="80"
                              src={image.imageUrl}
                              style={{
                                aspectRatio: "80/80",
                                objectFit: "cover",
                              }}
                              width="80"
                              data-ai-hint={image.imageHint}
                            />
                          )}
                          <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                          <div className="mt-4">
                            <p className="font-bold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
