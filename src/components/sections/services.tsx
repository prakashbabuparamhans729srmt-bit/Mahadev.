
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Smartphone, Laptop, CloudCog } from "lucide-react";

const services = [
  {
    icon: <Globe className="h-8 w-8 text-accent" />,
    title: "वेबसाइट डेवलपमेंट",
    price: "₹15K - ₹80K",
    timeline: "2-4 सप्ताह",
  },
  {
    icon: <Smartphone className="h-8 w-8 text-accent" />,
    title: "मोबाइल ऐप्स",
    price: "₹30K - ₹1.5L",
    timeline: "4-8 सप्ताह",
  },
  {
    icon: <Laptop className="h-8 w-8 text-accent" />,
    title: "वेब ऐप",
    price: "₹50K - ₹3L",
    timeline: "6-12 सप्ताह",
  },
  {
    icon: <CloudCog className="h-8 w-8 text-accent" />,
    title: "कस्टम सॉल्यूशंस",
    price: "₹1L+",
    timeline: "8+ सप्ताह",
  },
];

export default function ServicesSection() {
  return (
    <section id="services">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
              हमारी सेवाएं
            </div>
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">
              आपकी सफलता के लिए निर्मित समाधान
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              हम आपकी विशिष्ट आवश्यकताओं को पूरा करने के लिए अत्याधुनिक वेब और मोबाइल समाधानों की एक विस्तृत श्रृंखला प्रदान करते हैं।
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 md:gap-8 lg:max-w-none lg:grid-cols-4 mt-12">
          {services.map((service) => (
            <Card key={service.title} className="text-center shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  {service.icon}
                </div>
                <CardTitle className="mt-4 font-headline">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-bold text-lg text-primary">{service.price}</p>
                <p className="text-sm text-muted-foreground">⏱️ {service.timeline}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
