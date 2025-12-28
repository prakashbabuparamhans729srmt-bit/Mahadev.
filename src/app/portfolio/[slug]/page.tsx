'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { caseStudies, type CaseStudy } from '@/lib/case-studies';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CheckCircle, Download, GitBranch, Handshake, HardHat, Layers, Mail, Phone, Rocket, Send, ShieldCheck, Share2, Video, Wallet, Zap } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const TechBadge = ({ children }: { children: React.ReactNode }) => (
  <Badge variant="secondary" className="text-sm">{children}</Badge>
);

const MetricCard = ({ value, label, icon }: { value: string, label: string, icon: React.ReactNode }) => (
    <div className="bg-card p-4 rounded-lg text-center">
        <div className="text-primary mb-2">{icon}</div>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
    </div>
);

export default function CaseStudyPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const slug = params.slug as string;
  const caseStudy: CaseStudy | undefined = caseStudies.find(cs => cs.slug === slug);

  if (!caseStudy) {
    return (
      <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 flex items-center justify-center text-center">
            <div>
                <h1 className="text-4xl font-bold font-headline">केस स्टडी नहीं मिली</h1>
                <p className="text-muted-foreground mt-2">यह केस स्टडी मौजूद नहीं है।</p>
                <Button onClick={() => router.push('/#portfolio')} className="mt-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    वापस पोर्टफोलियो पर जाएं
                </Button>
            </div>
          </main>
          <Footer />
      </div>
    );
  }
  
  const handleAction = (message: string) => {
    toast({
        title: 'सुविधा जल्द ही आ रही है',
        description: message,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-card overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src={caseStudy.imageUrl}
                    alt={caseStudy.title}
                    fill
                    className="object-cover opacity-10"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
            </div>
            <div className="container relative z-10 text-center">
                <Badge variant="outline" className="mb-4 text-sm py-1 px-3 border-accent text-accent">{caseStudy.industry}</Badge>
                <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter">
                    {caseStudy.title}
                </h1>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground md:text-xl">
                    {caseStudy.description}
                </p>
            </div>
        </section>

        {/* Overview & Video Section */}
        <section className="py-16">
            <div className="container grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">🎯 प्रोजेक्ट ओवरव्यू</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-muted-foreground">
                            <p><strong>क्लाइंट:</strong> {caseStudy.overview.client}</p>
                            <p><strong>अवधि:</strong> {caseStudy.overview.duration}</p>
                            <p><strong>टीम:</strong> {caseStudy.overview.team}</p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {caseStudy.overview.tech.map(t => <TechBadge key={t}>{t}</TechBadge>)}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="aspect-video bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow">
                     <div 
                        className="w-full h-full flex items-center justify-center cursor-pointer group"
                        onClick={() => handleAction('वीडियो प्लेयर जल्द ही उपलब्ध होगा।')}
                    >
                         <Image src={caseStudy.imageUrl} alt={caseStudy.title} width={800} height={450} className="w-full h-full object-cover"/>
                         <div className="absolute bg-black/50 inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <Video className="h-16 w-16 text-white"/>
                         </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Challenges & Solutions */}
        <section className="bg-card py-16">
             <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold font-headline text-primary">चुनौतियाँ और समाधान</h2>
                    <p className="text-muted-foreground mt-2">हमने कैसे जटिल समस्याओं को सरल समाधानों में बदला।</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {caseStudy.challenges.map((item, index) => (
                        <div key={index} className="space-y-4">
                            <h3 className="font-headline text-xl font-semibold flex items-center gap-3"><HardHat className="text-accent" /> चुनौती: {item.title}</h3>
                            <p className="text-muted-foreground">{item.problem}</p>
                            <div className="bg-secondary/30 p-4 rounded-lg border-l-4 border-accent">
                                <h4 className="font-semibold flex items-center gap-2"><Zap className="h-5 w-5"/> हमारा समाधान:</h4>
                                <p className="text-muted-foreground mt-2">{item.solution}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Results & Metrics */}
        <section className="py-16">
            <div className="container">
                 <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold font-headline text-primary">परिणाम और मेट्रिक्स</h2>
                    <p className="text-muted-foreground mt-2">नंबर झूठ नहीं बोलते। हमारे काम का प्रभाव देखें।</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {caseStudy.metrics.map(metric => (
                        <Card key={metric.label} className="text-center p-6 bg-card/50">
                            <p className="text-5xl font-bold text-accent">{metric.value}</p>
                            <p className="text-sm text-muted-foreground mt-2">{metric.label}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

         {/* Testimonial */}
        <section className="bg-card py-16">
            <div className="container max-w-3xl text-center">
                <Image src={caseStudy.testimonial.imageUrl} alt={caseStudy.testimonial.name} width={100} height={100} className="rounded-full mx-auto mb-6 border-4 border-primary" />
                <blockquote className="text-xl md:text-2xl font-semibold italic text-foreground">
                    "{caseStudy.testimonial.quote}"
                </blockquote>
                <p className="font-bold mt-6">{caseStudy.testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{caseStudy.testimonial.title}</p>
            </div>
        </section>

        {/* CTA */}
         <section className="py-20">
            <div className="container text-center">
                <h2 className="text-4xl font-bold font-headline">इसी तरह का प्रोजेक्ट चाहिए?</h2>
                <p className="text-muted-foreground mt-2 mb-8">आइए आपके विचार को हकीकत में बदलें।</p>
                <div className="flex gap-4 justify-center">
                    <Button asChild size="lg" className="animate-fast-blinking-glow">
                        <Link href="/contact">
                            <Send className="mr-2 h-5 w-5" />
                            फ्री कंसल्टेशन
                        </Link>
                    </Button>
                     <Button asChild size="lg" variant="outline">
                        <Link href="/#pricing">
                           <Wallet className="mr-2 h-5 w-5" />
                            मूल्य देखें
                        </Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
