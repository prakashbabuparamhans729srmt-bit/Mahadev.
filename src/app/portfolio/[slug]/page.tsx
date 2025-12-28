'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { caseStudies, type CaseStudy } from '@/lib/case-studies';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ArrowLeft, Download, HardHat, Rocket, Send, Share2, Video, Wallet, Zap } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

const TechBadge = ({ children }: { children: React.ReactNode }) => (
  <Badge variant="secondary" className="text-sm">{children}</Badge>
);

export default function CaseStudyPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const slug = params.slug as string;
  const caseStudy: CaseStudy | undefined = caseStudies.find(cs => cs.slug === slug);
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = () => {
    const input = pdfRef.current;
    if (!input) {
      toast({
        variant: "destructive",
        title: "त्रुटि",
        description: "PDF बनाने के लिए कंटेंट नहीं मिला।",
      });
      return;
    }

    toast({
        title: 'PDF तैयार हो रहा है...',
        description: 'कृपया कुछ क्षण प्रतीक्षा करें।',
    });

    html2canvas(input, {
      scale: 2,
      backgroundColor: `hsl(${getComputedStyle(document.documentElement).getPropertyValue('--background')})`,
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);
      const width = imgProps.width * ratio;
      const height = imgProps.height * ratio;
      const x = (pdfWidth - width) / 2;
      
      pdf.addImage(imgData, 'PNG', x, 0, width, height);
      pdf.save(`${caseStudy?.slug || 'case-study'}.pdf`);
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Hajaro Grahako Case Study: ${caseStudy?.title}`,
          text: `Check out this case study from Hajaro Grahako: ${caseStudy?.description}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Sharing failed', error);
        toast({
          variant: "destructive",
          title: "शेयरिंग विफल",
          description: "कुछ तकनीकी समस्या के कारण शेयर नहीं किया जा सका।",
        });
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "लिंक कॉपी किया गया",
        description: "केस स्टडी का लिंक आपके क्लिपबोर्ड पर कॉपी कर लिया गया है।",
      });
    }
  };


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

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1" ref={pdfRef}>
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
                 <div className="flex gap-4 justify-center mt-8">
                    <Button onClick={handleDownloadPdf} variant="outline"><Download className="mr-2 h-4 w-4"/> PDF डाउनलोड करें</Button>
                    <Button onClick={handleShare} variant="outline"><Share2 className="mr-2 h-4 w-4"/> शेयर करें</Button>
                </div>
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
                <Dialog>
                    <DialogTrigger asChild>
                         <div className="aspect-video bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow cursor-pointer group">
                            <Image src={caseStudy.imageUrl} alt={caseStudy.title} width={800} height={450} className="w-full h-full object-cover"/>
                            <div className="absolute bg-black/50 inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Video className="h-16 w-16 text-white"/>
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl p-0">
                        <DialogHeader className="p-4">
                            <DialogTitle>केस स्टडी वीडियो: {caseStudy.title}</DialogTitle>
                        </DialogHeader>
                        <div className="aspect-video">
                            <iframe 
                                width="100%" 
                                height="100%" 
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                        </div>
                    </DialogContent>
                </Dialog>
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
                <div className="flex flex-wrap gap-4 justify-center">
                    <Button asChild size="lg" className="animate-fast-blinking-glow">
                        <Link href="/contact">
                            <Send className="mr-2 h-5 w-5" />
                            फ्री कंसल्टेशन
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <a href="tel:+911234567890">
                           <Wallet className="mr-2 h-5 w-5" />
                            अभी कॉल करें
                        </a>
                    </Button>
                     <Button asChild size="lg" variant="outline">
                        <a href="mailto:sales@hajarograhako.com?subject=Project Inquiry">
                           <Wallet className="mr-2 h-5 w-5" />
                            कोटेशन मांगें
                        </a>
                    </Button>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
