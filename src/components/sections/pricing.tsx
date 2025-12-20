import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "बेसिक",
    price: "₹15-35K",
    timeline: "2-4 सप्ताह",
    features: ["6-8 पेज", "बेसिक डिज़ाइन", "कॉन्टेक्ट फॉर्म"],
    cta: "बेसिक चुनें",
    variant: "outline",
    highlight: false,
  },
  {
    name: "स्टैंडर्ड",
    price: "₹40-80K",
    timeline: "4-8 सप्ताह",
    features: ["6-8 पेज", "ग्राहक पोर्टल", "प्रोजेक्ट ट्रैकिंग", "बेसिक से सब कुछ"],
    cta: "स्टैंडर्ड चुनें",
    variant: "default",
    highlight: true,
  },
  {
    name: "प्रीमियम",
    price: "₹90K-2L+",
    timeline: "8-16 सप्ताह",
    features: ["सभी पेज", "पूरा पोर्टल", "AI टूल्स", "ऑटोमेशन", "रियल-टाइम कोलैब"],
    cta: "प्रीमियम चुनें",
    variant: "outline",
    highlight: false,
  },
  {
    name: "एंटरप्राइज",
    price: "कस्टम",
    timeline: "12+ सप्ताह",
    features: ["कस्टम समाधान", "समर्पित टीम", "24/7 सपोर्ट", "प्रीमियम से सब कुछ"],
    cta: "कस्टम चुनें",
    variant: "outline",
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-card border-y">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
              मूल्य निर्धारण प्लान
            </div>
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">
              आपके बजट के लिए सही योजना
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              पारदर्शी मूल्य निर्धारण जो आपके व्यवसाय के साथ बढ़ता है। कोई छिपा हुआ शुल्क नहीं।
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-md items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-4 mt-12">
          {tiers.map((tier) => (
            <Card key={tier.name} className={`flex flex-col ${tier.highlight ? 'border-primary shadow-2xl relative' : 'shadow-md'}`}>
              {tier.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">सबसे लोकप्रिय</div>}
              <CardHeader className="pt-8">
                <CardTitle className="font-headline text-2xl">{tier.name}</CardTitle>
                <CardDescription className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">{tier.price}</span>
                  <span className="text-sm text-muted-foreground">/ {tier.timeline}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="mr-2 mt-1 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className={`w-full ${tier.highlight ? 'bg-accent text-accent-foreground hover:bg-accent/90' : ''}`} variant={tier.highlight ? "default" : "outline"}>
                   <Link href="/start-project">{tier.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
