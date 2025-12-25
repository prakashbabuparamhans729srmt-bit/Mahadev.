
'use client';

import React, { useState, useRef } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  FileText,
  Shield,
  Wallet,
  Users,
  Briefcase,
  GitCommit,
  AlertTriangle,
  Mail,
  Printer,
  Share2,
  Download,
  Check,
  X,
  BookOpen,
  Building,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

const Section = ({
  icon,
  title,
  id,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  id: string;
  children: React.ReactNode;
}) => (
  <AccordionItem value={title} id={id}>
    <AccordionTrigger className="font-headline text-lg hover:no-underline">
      <div className="flex items-center gap-3">
        {icon}
        {title}
      </div>
    </AccordionTrigger>
    <AccordionContent className="pl-10 text-muted-foreground prose prose-sm max-w-none">
      {children}
    </AccordionContent>
  </AccordionItem>
);

const IndexLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} className="block py-1 text-primary hover:underline">{children}</a>
)

export default function TermsPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [readChecked, setReadChecked] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const isAcceptDisabled = !readChecked || !agreeChecked;
  const today = format(new Date(), 'dd MMMM, yyyy');

  const handleDownloadPdf = () => {
    const cardElement = contentRef.current;
    if (cardElement) {
      toast({
        title: 'PDF तैयार हो रहा है...',
        description: 'कृपया कुछ क्षण प्रतीक्षा करें।',
      });
      html2canvas(cardElement, { 
          scale: 2, 
          backgroundColor: window.getComputedStyle(document.body).getPropertyValue('--background-hsl-val') ? `hsl(${window.getComputedStyle(document.body).getPropertyValue('--background-hsl-val')})` : '#0a0a0a'
        }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 0;
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save('HajaroGrahako-Terms-and-Policy.pdf');
      });
    }
  };
  
  const handleShareEmail = () => {
    const subject = "Hajaro Grahako - नियम और शर्तें";
    const body = `नमस्ते,\n\nकृपया इस लिंक पर जाकर हजारो ग्राहको की सेवा की शर्तें और गोपनीयता नीति देखें:\n\n${window.location.href}\n\nधन्यवाद!`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  
  const handleAccept = () => {
    if (isAcceptDisabled) {
        toast({
            variant: "destructive",
            title: 'आवश्यक',
            description: 'आगे बढ़ने के लिए कृपया दोनों बक्सों को चेक करें।',
        });
        return;
    }
    toast({
      title: 'स्वीकृत!',
      description: 'शर्तें और नीतियां स्वीकार कर ली गई हैं। डैशबोर्ड पर रीडायरेक्ट किया जा रहा है...',
    });
    router.push('/dashboard');
  }

  const toggleAllSections = () => {
    if (openSections.length > 0) {
        setOpenSections([]);
    } else {
        setOpenSections(["1.0 सेवा समझौता", "2.0 उपयोगकर्ता जिम्मेदारियाँ", "3.0 भुगतान और धनवापसी नीति", "4.0 बौद्धिक संपदा अधिकार", "5.0 गोपनीयता और डेटा सुरक्षा", "6.0 सीमित गारंटी और दायित्व", "7.0 विवाद समाधान"]);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24">
        <div className="container max-w-4xl">
          <Card className="shadow-2xl" id="terms-card">
            <div ref={contentRef}>
                <CardHeader className="text-center border-b p-8 bg-secondary/30">
                <CardTitle className="font-headline text-4xl text-primary">
                    📜 शर्तें और गोपनीयता नीति
                </CardTitle>
                <CardDescription>
                    संस्करण 2.1.0 | अंतिम अपडेट: 15 अप्रैल, 2024 | अगला समीक्षा: 15 अक्टूबर, 2024
                </CardDescription>
                </CardHeader>
                <CardContent className="p-6 md:p-8">
                <Card className="mb-8 p-4 bg-secondary/30 rounded-lg">
                    <h3 className="font-headline text-xl mb-2 flex items-center gap-2"><Building /> हजारो ग्राहको प्रा. लि.</h3>
                    <p className="text-sm text-muted-foreground">
                    <strong>मिशन:</strong> "हजारो ग्राहकों को विश्व स्तरीय डिजिटल समाधान प्रदान करना जो उनके व्यवसाय को नई ऊंचाइयों तक ले जाए।"
                    <br />
                    <strong>पता:</strong> ए-101, टेक्नोलॉजी पार्क, नोएडा सेक्टर-62, उत्तर प्रदेश 201309, भारत
                    <br />
                    <strong>संपर्क:</strong> +91-120-1234567 | legal@hajarograhako.com
                    </p>
                </Card>

                 <Card className="mb-8 p-4 bg-secondary/30 rounded-lg">
                    <h3 className="font-headline text-xl mb-2 flex items-center gap-2"><BookOpen /> अनुक्रमणिका</h3>
                    <div className="columns-2 text-sm">
                        <IndexLink href="#section-1">1.0 सेवा समझौता</IndexLink>
                        <IndexLink href="#section-2">2.0 उपयोगकर्ता जिम्मेदारियाँ</IndexLink>
                        <IndexLink href="#section-3">3.0 भुगतान और धनवापसी नीति</IndexLink>
                        <IndexLink href="#section-4">4.0 बौद्धिक संपदा अधिकार</IndexLink>
                        <IndexLink href="#section-5">5.0 गोपनीयता और डेटा सुरक्षा</IndexLink>
                        <IndexLink href="#section-6">6.0 सीमित गारंटी और दायित्व</IndexLink>
                        <IndexLink href="#section-7">7.0 विवाद समाधान</IndexLink>
                    </div>
                </Card>

                <Accordion type="multiple" value={openSections} onValueChange={setOpenSections} className="w-full">
                    <Section icon={<Briefcase />} title="1.0 सेवा समझौता" id="section-1">
                    <p className="font-semibold">हम प्रदान करते हैं:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>कस्टम वेबसाइट डेवलपमेंट, मोबाइल ऐप्लिकेशन, वेब ऐप्लिकेशन/सॉफ्टवेयर सॉल्यूशंस</li>
                        <li>UI/UX डिज़ाइन सेवाएं, डिजिटल मार्केटिंग, और ऑनगोइंग सपोर्ट</li>
                    </ul>
                    <p className="font-semibold mt-4">समझौता शर्तें:</p>
                    <ol className="list-decimal pl-5 mt-2 space-y-1">
                        <li>सभी प्रोजेक्ट लिखित प्रस्ताव/अनुबंध के आधार पर होंगे।</li>
                        <li>कार्य का दायरा (Scope of Work) स्पष्ट रूप से परिभाषित होगा।</li>
                        <li>टाइमलाइन और माइलस्टोन्स पर दोनों पक्षों की सहमति होगी।</li>
                        <li>भुगतान संरचना: 50% अग्रिम, 25% मिड-पॉइंट, 25% डिलिवरी पर (प्रोजेक्ट के आधार पर भिन्न हो सकता है)।</li>
                        <li>किसी भी अतिरिक्त कार्य के लिए एक औपचारिक चेंज रिक्वेस्ट प्रक्रिया का पालन किया जाएगा।</li>
                    </ol>
                    </Section>
                    
                    <Section icon={<Users />} title="2.0 उपयोगकर्ता जिम्मेदारियाँ" id="section-2">
                        <p>उपयोगकर्ता के रूप में, आप सहमत हैं कि आप:</p>
                         <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>प्रोजेक्ट के लिए आवश्यक सभी जानकारी, सामग्री, और फीडबैक समय पर प्रदान करेंगे।</li>
                            <li>हमारे प्लेटफॉर्म का उपयोग किसी भी अवैध, अनैतिक, या अनधिकृत उद्देश्य के लिए नहीं करेंगे।</li>
                            <li>अपने खाते की क्रेडेंशियल्स की सुरक्षा के लिए पूरी तरह से जिम्मेदार होंगे।</li>
                        </ul>
                    </Section>

                    <Section icon={<Wallet />} title="3.0 भुगतान और धनवापसी नीति" id="section-3">
                    <p className="font-semibold">भुगतान विकल्प:</p>
                    <p>हम क्रेडिट/डेबिट कार्ड (Visa, MasterCard, RuPay), UPI, नेट बैंकिंग, डिजिटल वॉलेट, EMI विकल्प, और बैंक ट्रांसफर स्वीकार करते हैं।</p>
                    <p className="font-semibold mt-4">धनवापसी नीति:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li><strong>अग्रिम राशि:</strong> प्रोजेक्ट पर काम शुरू होने से पहले रद्दीकरण पर 90% वापसी योग्य।</li>
                        <li><strong>कार्य प्रगति के दौरान:</strong> धनवापसी पूरे किए गए कार्य के अनुपात में होगी।</li>
                        <li><strong>नो-कॉस्ट रद्दीकरण:</strong> अनुबंध पर हस्ताक्षर करने के 24 घंटे के भीतर 100% धनवापसी।</li>
                        <li><strong>प्रसंस्करण समय:</strong> सभी धनवापसी 7-10 कार्य दिवसों के भीतर संसाधित की जाएंगी।</li>
                    </ul>
                    </Section>
                    
                    <Section icon={<GitCommit />} title="4.0 बौद्धिक संपदा अधिकार" id="section-4">
                        <p>अंतिम और पूर्ण भुगतान प्राप्त होने पर, विकसित कोड, डिज़ाइन, और अन्य सभी डिलिवरेबल्स की बौद्धिक संपदा (Intellectual Property) ग्राहक को पूरी तरह से हस्तांतरित कर दी जाएगी। हम अपने पोर्टफोलियो में प्रोजेक्ट को (आपकी अनुमति के साथ) प्रदर्शित करने का अधिकार सुरक्षित रखते हैं।</p>
                    </Section>

                    <Section icon={<Shield />} title="5.0 गोपनीयता और डेटा सुरक्षा" id="section-5">
                    <p className="font-semibold">हम क्या संग्रह करते हैं:</p>
                     <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>व्यक्तिगत जानकारी (नाम, ईमेल, फोन), व्यवसाय विवरण, प्रोजेक्ट फाइलें, और उपयोग डेटा।</li>
                    </ul>
                    <p className="font-semibold mt-4">डेटा सुरक्षा उपाय:</p>
                    <p>हम आपके डेटा को सुरक्षित रखने के लिए TLS 1.3 एन्क्रिप्शन, सुरक्षित क्लाउड सर्वर (AWS/GCP), रोल-आधारित एक्सेस नियंत्रण, और दैनिक ऑटोमेटेड बैकअप का उपयोग करते हैं। हम GDPR और भारतीय IT अधिनियम, 2000 का अनुपालन करते हैं।</p>
                    <p className="font-semibold mt-4">आपके अधिकार:</p>
                    <p>आपको अपने डेटा तक पहुंचने, उसे सुधारने, हटाने, और उसके प्रसंस्करण को प्रतिबंधित करने का अधिकार है। इसके लिए आप हमारे गोपनीयता अधिकारी से संपर्क कर सकते हैं: <a href="mailto:privacy@hajarograhako.com" className="text-primary">privacy@hajarograhako.com</a></p>
                    </Section>
                    
                    <Section icon={<AlertTriangle />} title="6.0 सीमित गारंटी और दायित्व" id="section-6">
                    <p className="font-semibold">हमारी गारंटी:</p>
                     <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>हम 30-दिन की बग-फ्री वारंटी प्रदान करते हैं।</li>
                        <li>हम 6 महीने के मुफ्त सुरक्षा पैच और 99.5% सर्वर अपटाइम की गारंटी देते हैं।</li>
                    </ul>
                    <p className="font-semibold mt-4">हमारी सीमाएं:</p>
                    <p>हम तृतीय-पक्ष सेवाओं (जैसे होस्टिंग, डोमेन, APIs) की विफलताओं या क्लाइंट द्वारा प्रदान की गई गलत जानकारी के कारण होने वाली समस्याओं के लिए जिम्मेदार नहीं हैं। हमारा कुल दायित्व किसी भी स्थिति में प्रोजेक्ट के कुल अनुबंध मूल्य से अधिक नहीं होगा।</p>
                    </Section>

                    <Section icon={<FileText />} title="7.0 विवाद समाधान" id="section-7">
                    <p>किसी भी विवाद को पहले आपसी चर्चा (7 दिन) के माध्यम से हल किया जाएगा। यदि आवश्यक हो, तो एक तटस्थ मध्यस्थ (14 दिन) की नियुक्ति की जाएगी। सभी कानूनी मामले नोएडा, उत्तर प्रदेश (भारत) के न्यायालयों के अनन्य अधिकार क्षेत्र में होंगे।</p>
                     <p className="font-semibold mt-4">विवाद समाधान अधिकारी:</p>
                     <p>श्री अमित कुमार (COO) | +91-120-1234567 (Ext: 101) | <a href="mailto:grievance@hajarograhako.com" className="text-primary">grievance@hajarograhako.com</a></p>
                    </Section>
                </Accordion>

                <Separator className="my-8" />
                
                <div className="text-center">
                    <h3 className="font-headline text-xl mb-4">स्वीकृति और स्वीकारोक्ति</h3>
                     <Card className="space-y-4 p-4 bg-secondary/30 rounded-lg text-left">
                        <div className="flex items-start space-x-3">
                            <Checkbox id="terms-read" checked={readChecked} onCheckedChange={(checked) => setReadChecked(!!checked)} className="mt-1" />
                            <Label htmlFor="terms-read" className="font-normal text-sm">
                            मैं प्रमाणित करता हूं कि मैंने सेवा समझौते, भुगतान नीति, और गोपनीयता नीति को पढ़ और समझ लिया है।
                            </Label>
                        </div>
                        <div className="flex items-start space-x-3">
                            <Checkbox id="terms-agree" checked={agreeChecked} onCheckedChange={(checked) => setAgreeChecked(!!checked)} className="mt-1" />
                            <Label htmlFor="terms-agree" className="font-normal text-sm">
                            मैं सहमत हूँ कि मैं 18 वर्ष या उससे अधिक आयु का हूँ और इन सभी शर्तों का कानूनी रूप से पालन करने के लिए सहमत हूँ।
                            </Label>
                        </div>
                         <div className="text-sm text-muted-foreground pt-2">स्वीकृति तिथि: {today}</div>
                    </Card>
                    <div className="flex flex-wrap gap-2 mt-6 justify-center">
                        <Button variant="outline" size="sm" onClick={toggleAllSections}><FileText className="mr-2 h-4 w-4"/> {openSections.length > 0 ? 'सभी अनुभाग बंद करें' : 'पूरा दस्तावेज़ देखें'}</Button>
                        <Button variant="outline" size="sm" onClick={handleDownloadPdf}><Download className="mr-2 h-4 w-4"/> PDF डाउनलोड</Button>
                        <Button variant="outline" size="sm" onClick={() => window.print()}><Printer className="mr-2 h-4 w-4"/> प्रिंट करें</Button>
                        <Button variant="outline" size="sm" onClick={handleShareEmail}><Mail className="mr-2 h-4 w-4"/> टीम को भेजें</Button>
                    </div>
                </div>
                </CardContent>
            </div>
            <CardFooter className="flex flex-col sm:flex-row justify-between items-center p-6 bg-secondary/30">
                <Button variant="destructive" size="lg" onClick={() => router.push('/')}>
                    <X className="mr-2 h-5 w-5" />
                    अस्वीकार करें
                </Button>
                <Button size="lg" className="mt-4 sm:mt-0" onClick={handleAccept} disabled={isAcceptDisabled}>
                    <Check className="mr-2 h-5 w-5" />
                    स्वीकार करें और आगे बढ़ें
                </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
