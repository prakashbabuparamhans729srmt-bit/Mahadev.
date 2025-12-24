'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Globe, Smartphone, Server, Wrench } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

const projectTypes = [
  {
    icon: <Globe className="h-12 w-12 text-primary" />,
    title: 'वेबसाइट',
    description: 'एक आकर्षक और शक्तिशाली वेबसाइट के साथ अपनी ऑनलाइन उपस्थिति दर्ज करें।',
    link: '/start-project/website',
  },
  {
    icon: <Smartphone className="h-12 w-12 text-primary" />,
    title: 'मोबाइल ऐप',
    description: 'अपने ग्राहकों तक पहुंचने के लिए एक शानदार मोबाइल एप्लिकेशन बनाएं।',
    link: '#',
  },
  {
    icon: <Server className="h-12 w-12 text-primary" />,
    title: 'एडमिन पैनल',
    description: 'अपने व्यवसाय को कुशलतापूर्वक प्रबंधित करने के लिए एक शक्तिशाली एडमिन पैनल।',
    link: '#',
  },
  {
    icon: <Wrench className="h-12 w-12 text-primary" />,
    title: 'कस्टम सॉल्यूशन',
    description: 'आपकी अनूठी जरूरतों के लिए एक विशेष रूप से तैयार किया गया समाधान।',
    link: '#',
  },
];

export default function StartProjectPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h1 className="font-headline text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
                अपना प्रोजेक्ट प्रकार चुनें
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                चलिए कुछ बेहतरीन बनाते हैं। शुरू करने के लिए नीचे दिए गए विकल्पों में से एक चुनें।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {projectTypes.map((type) => (
                <Card
                  key={type.title}
                  onClick={() => router.push(type.link)}
                  className="flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2"
                >
                  <div className="mb-6">{type.icon}</div>
                  <h3 className="text-xl font-bold font-headline mb-2">{type.title}</h3>
                  <p className="text-muted-foreground text-sm">{type.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
