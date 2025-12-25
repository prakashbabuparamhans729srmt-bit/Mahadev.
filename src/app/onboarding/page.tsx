'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  Briefcase,
  Building,
  Check,
  ChevronRight,
  CreditCard,
  Factory,
  GraduationCap,
  HeartPulse,
  LandPlot,
  Mail,
  Pen,
  Phone,
  Rocket,
  ShoppingBasket,
  Smile,
  User,
  Users,
  Wallet,
  Wand2,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691L12.125 19.45c1.643-4.113 5.518-7.012 9.875-7.012c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-5.657-5.657c-1.889 1.412-4.246 2.26-6.752 2.26c-4.444 0-8.3-2.921-9.849-7.012l-5.833 4.762C9.656 40.663 16.318 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.035 12.035 0 0 1-4.223 5.337l5.657 5.657C41.345 35.137 44 29.873 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>
    )
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"></path></svg>
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11H9.3v8.58h3.75v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94V10.02H5.5v8.48z"></path></svg>
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.67c.88-.53 1.56-1.37 1.88-2.38c-.83.49-1.74.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.22-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21c-.36.1-.74.15-1.14.15c-.28 0-.55-.03-.81-.08c.55 1.7 2.14 2.93 4.03 2.96c-1.46 1.14-3.3 1.82-5.3 1.82c-.34 0-.68-.02-1.02-.06C3.43 20.4 5.72 21 8.29 21C16 21 20.48 14.47 20.48 8.87c0-.23 0-.46-.02-.68c.84-.6 1.56-1.36 2.14-2.2z"></path></svg>
}

const steps = [
    { name: 'साइन अप', progress: 20 },
    { name: 'व्यवसाय', progress: 40 },
    { name: 'प्रोफाइल', progress: 60 },
    { name: 'प्रोजेक्ट', progress: 80 },
    { name: 'भुगतान', progress: 100 },
];

const SocialButton = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <Button variant="outline" className="flex-1 flex flex-col h-auto p-3 gap-1">
        {icon}
        <span className="text-xs">{label}</span>
    </Button>
)

const Step1 = ({ setStep }: { setStep: (step: number) => void }) => {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold font-headline text-primary">🙏 5 मिनट, 5 चरण - आपकी डिजिटल यात्रा की शुरुआत!</h2>
                <p className="text-muted-foreground mt-2">हजारो ग्राहको के साथ अपनी वेबसाइट/ऐप बनाने की प्रक्रिया शुरू करें।</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Rocket className="text-accent"/> चरण 1: त्वरित साइन अप</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <Label htmlFor="email">📧 ईमेल से तुरंत शुरू करें</Label>
                    <Input id="email" type="email" placeholder="rajes@example.com" />
                    <p className="text-sm text-muted-foreground">या सोशल मीडिया से जुड़ें:</p>
                    <div className="flex gap-2">
                       <SocialButton icon={<GoogleIcon />} label="Google" />
                       <SocialButton icon={<FacebookIcon />} label="Facebook" />
                       <SocialButton icon={<LinkedinIcon />} label="LinkedIn" />
                       <SocialButton icon={<TwitterIcon />} label="Twitter" />
                    </div>
                     <div className="flex gap-4 pt-4">
                        <Button className="w-full">⚡ 1-क्लिक साइन अप</Button>
                        <Button variant="secondary" className="w-full">🔑 पासवर्ड से साइन अप</Button>
                    </div>
                </CardContent>
            </Card>
            <div className="flex justify-between items-center">
                 <Button variant="ghost">❌ बाद में</Button>
                 <Button onClick={() => setStep(2)}>🚀 मैं जारी रखना चाहता हूँ <ChevronRight className="ml-2 h-4 w-4"/></Button>
            </div>
        </div>
    )
}

const Step2 = ({ setStep }: { setStep: (step: number) => void }) => {
    const industries = ["उत्पादन/विनिर्माण", "खुदरा/व्यापार", "सेवा प्रदाता (शिक्षा, स्वास्थ्य, परामर्श)", "प्रौद्योगिकी/सॉफ्टवेयर", "रियल एस्टेट/निर्माण", "कृषि/खाद्य प्रसंस्करण", "परिवहन/लॉजिस्टिक्स", "मनोरंजन/मीडिया"];
    const businessSizes = ["एकल स्वामित्व/फ्रीलांसर", "छोटा व्यवसाय (1-10 कर्मचारी)", "मध्यम व्यवसाय (11-50 कर्मचारी)", "बड़ा उद्यम (50+ कर्मचारी)"];
    const customerBases = ["स्थानीय/शहर स्तर", "राज्य/क्षेत्रीय स्तर", "राष्ट्रीय स्तर", "अंतर्राष्ट्रीय स्तर", "B2B (व्यवसाय से व्यवसाय)", "B2C (व्यवसाय से उपभोक्ता)"];

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold font-headline text-primary">🎯 हमें अपने व्यवसाय को बेहतर समझने में मदद करें</h2>
            </div>
            <Card>
                <CardHeader>
                     <CardTitle className="flex items-center gap-2"><Briefcase className="text-accent"/> व्यवसाय विवरण</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div>
                        <h3 className="font-semibold mb-3 text-lg">🏭 उद्योग चुनें</h3>
                        <RadioGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {industries.map(item => (
                                <div key={item} className="flex items-center space-x-2">
                                    <RadioGroupItem value={item} id={item} />
                                    <Label htmlFor={item} className="font-normal">{item}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                    <Separator />
                     <div>
                        <h3 className="font-semibold mb-3 text-lg">📊 व्यवसाय का आकार</h3>
                        <RadioGroup>
                             {businessSizes.map(item => (
                                <div key={item} className="flex items-center space-x-2 mb-2">
                                    <RadioGroupItem value={item} id={item} />
                                    <Label htmlFor={item} className="font-normal">{item}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                     <Separator />
                     <div>
                        <h3 className="font-semibold mb-3 text-lg">🌍 आपके ग्राहक कौन हैं?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {customerBases.map(item => (
                                <div key={item} className="flex items-center space-x-2">
                                    <Checkbox id={item} />
                                    <Label htmlFor={item} className="font-normal">{item}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
             <div className="flex justify-between items-center">
                 <Button variant="ghost" onClick={() => setStep(1)}><ArrowLeft className="mr-2 h-4 w-4"/> पीछे जाएं</Button>
                 <Button onClick={() => setStep(3)}>💾 सेव करें और आगे बढ़ें <ChevronRight className="ml-2 h-4 w-4"/></Button>
            </div>
        </div>
    )
}

const Step3 = ({ setStep }: { setStep: (step: number) => void }) => {
    return (
         <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold font-headline text-primary">✨ अपने बारे में कुछ विवरण जोड़ें</h2>
                <p className="text-muted-foreground mt-2">यह वैकल्पिक है, लेकिन हमें बेहतर सेवा देने में मदद करता है।</p>
            </div>
            <Card>
                <CardHeader>
                     <CardTitle className="flex items-center gap-2"><User className="text-accent"/> बुनियादी जानकारी</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="full-name">पूरा नाम</Label>
                            <Input id="full-name" placeholder="राजेश कुमार" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="phone">फ़ोन नंबर</Label>
                            <Input id="phone" placeholder="+91 98XXXXXX21" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="company-name">कंपनी नाम</Label>
                        <Input id="company-name" placeholder="राजेश इंडस्ट्रीज" />
                    </div>
                     <div className="flex gap-4 pt-2">
                        <Button variant="outline">📸 प्रोफाइल फोटो जोड़ें</Button>
                        <Button variant="outline">🎨 थीम रंग चुनें</Button>
                    </div>
                </CardContent>
            </Card>
            <Card>
                 <CardHeader>
                     <CardTitle className="flex items-center gap-2"><Phone className="text-accent"/> पसंदीदा संचार विधि</CardTitle>
                </CardHeader>
                 <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {["व्हाट्सएप", "ईमेल", "फोन कॉल", "टेलीग्राम"].map(method => (
                             <div key={method} className="flex items-center space-x-2">
                                <Checkbox id={method} />
                                <Label htmlFor={method} className="font-normal">{method}</Label>
                            </div>
                        ))}
                    </div>
                    <Label>पसंदीदा समय:</Label>
                    <RadioGroup defaultValue="morning" className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="morning" id="morning" /><Label htmlFor="morning">सुबह (9-12)</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="afternoon" id="afternoon" /><Label htmlFor="afternoon">दोपहर (12-4)</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="evening" id="evening" /><Label htmlFor="evening">शाम (4-7)</Label></div>
                    </RadioGroup>
                 </CardContent>
            </Card>
             <div className="flex justify-between items-center">
                 <Button variant="ghost" onClick={() => setStep(2)}><ArrowLeft className="mr-2 h-4 w-4"/> पीछे जाएं</Button>
                 <Button onClick={() => setStep(4)}>🚀 छोड़ें और आगे बढ़ें <ChevronRight className="ml-2 h-4 w-4"/></Button>
            </div>
        </div>
    )
}

const ProjectCard = ({ title, features, timeline }: {title: string, features: string[], timeline: string}) => (
    <Card className="p-4 text-center">
        <CardTitle className="font-headline text-xl">{title}</CardTitle>
        <CardContent className="p-0 pt-4 space-y-2 text-sm text-muted-foreground">
            {features.map(f => <p key={f}>• {f}</p>)}
        </CardContent>
        <CardFooter className="flex-col p-0 pt-4">
            <p className="text-xs text-muted-foreground">{timeline}</p>
            <Button variant="outline" size="sm" className="mt-2 w-full">[✅ चुनें]</Button>
        </CardFooter>
    </Card>
)

const Step4 = ({ setStep }: { setStep: (step: number) => void }) => {
    const { toast } = useToast();
    const specificProjects = [
        { icon: <HeartPulse/>, name: 'स्वास्थ्य', projects: '120+ प्रोजेक्ट्स', timeline: '4-8 सप्ताह', budget: '₹55K-₹3L' },
        { icon: <Building/>, name: 'रियल एस्टेट', projects: '90+ प्रोजेक्ट्स', timeline: '4-10 सप्ताह', budget: '₹50K-₹4L' },
        { icon: <Factory/>, name: 'उत्पादन', projects: '75+ प्रोजेक्ट्स', timeline: '6-14 सप्ताह', budget: '₹80K-₹6L' },
        { icon: <GraduationCap/>, name: 'शिक्षा', projects: '150+ प्रोजेक्ट्स', timeline: '4-10 सप्ताह', budget: '₹40K-₹3L' },
    ];
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold font-headline text-primary">🚀 अब मजेदार हिस्सा! आप क्या बनाना चाहते हैं?</h2>
            </div>
             <Card>
                <CardHeader>
                     <CardTitle className="flex items-center gap-2">🔥 लोकप्रिय विकल्प</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                   <ProjectCard title="🌐 वेबसाइट" features={["कॉर्पोरेट", "ब्लॉग", "पोर्टफोलियो"]} timeline="2-4 सप्ताह" />
                   <ProjectCard title="📱 मोबाइल ऐप" features={["iOS ऐप", "Android", "हाइब्रिड ऐप"]} timeline="4-8 सप्ताह" />
                   <ProjectCard title="💻 वेब ऐप" features={["SaaS", "डैशबोर्ड", "इन्वेंटरी सिस्टम"]} timeline="6-12 सप्ताह" />
                   <ProjectCard title="🛒 ई-कॉमर्स" features={["ऑनलाइन स्टोर", "मार्केटप्लेस"]} timeline="4-10 सप्ताह" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <CardTitle className="flex items-center gap-2">🎯 या विशिष्ट प्रकार चुनें</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {specificProjects.map(p => (
                        <Card key={p.name} className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="text-primary">{p.icon}</div>
                                <div>
                                    <p className="font-bold">{p.name} <span className="text-xs font-normal text-muted-foreground">({p.projects})</span></p>
                                    <p className="text-sm text-muted-foreground">{p.budget} • {p.timeline}</p>
                                </div>
                            </div>
                            <Checkbox />
                        </Card>
                    ))}
                    <Button variant="link" onClick={() => toast({description: 'जल्द ही और विकल्प जोड़े जाएंगे!'})}>⬇️ और 15+ विकल्प देखें</Button>
                </CardContent>
            </Card>
            <div className="flex justify-between items-center">
                 <Button variant="ghost" onClick={() => setStep(3)}><ArrowLeft className="mr-2 h-4 w-4"/> पीछे जाएं</Button>
                 <Button onClick={() => setStep(5)}>🚀 मेरा प्रोजेक्ट चुनें <ChevronRight className="ml-2 h-4 w-4"/></Button>
            </div>
        </div>
    )
}

const Step5 = ({ setStep }: { setStep: (step: number) => void }) => {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold font-headline text-primary">🎉 बधाई हो! आपकी यात्रा पूरी होने वाली है</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">📋 आपका चयनित प्रोजेक्ट</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <h3 className="font-bold text-lg">🏘️ रियल एस्टेट वेबसाइट</h3>
                        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                            <li>प्रॉपर्टी लिस्टिंग पेज</li>
                            <li>वर्चुअल प्रॉपर्टी टूर</li>
                            <li>एजेंट संपर्क फॉर्म</li>
                            <li>मोबाइल रिस्पॉन्सिव डिज़ाइन</li>
                            <li>बेसिक SEO</li>
                        </ul>
                         <Separator />
                        <div className="space-y-1 text-sm">
                            <p className="flex justify-between"><span>⏱️ समय:</span> <strong>4-6 सप्ताह</strong></p>
                            <p className="flex justify-between"><span>💰 मूल्य:</span> <strong>₹65,000</strong></p>
                            <p className="flex justify-between text-green-500"><span>🎁 स्वागत छूट (10%):</span> <strong>-₹6,500</strong></p>
                             <Separator />
                             <p className="flex justify-between text-lg font-bold"><span>✅ अंतिम मूल्य:</span> <strong>₹58,500</strong></p>
                        </div>
                    </CardContent>
                </Card>
                <div className="space-y-6">
                    <Card>
                         <CardHeader>
                             <CardTitle className="flex items-center gap-2">💳 भुगतान विधि चुनें</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Label htmlFor="card-number">कार्ड नंबर</Label>
                                <Input id="card-number" placeholder="**** **** **** 1234"/>
                            </div>
                             <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry">समाप्ति तिथि</Label>
                                    <Input id="expiry" placeholder="MM/YY"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvc">सीवीसी</Label>
                                    <Input id="cvc" placeholder="***"/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">📱 अन्य विकल्प</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {["UPI", "नेट बैंकिंग", "EMI विकल्प", "बाद में भुगतान (केवल 25% अदा करें)"].map(opt => (
                                <div key={opt} className="flex items-center space-x-2">
                                    <Checkbox id={opt} />
                                    <Label htmlFor={opt} className="font-normal text-sm">{opt}</Label>
                                </div>
                            ))}
                             <div className="flex gap-2 pt-2">
                                <Button variant="link" size="sm">🏦 बैंक विवरण देखें</Button>
                                <Button variant="link" size="sm">📄 इनवॉइस डाउनलोड</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="flex justify-between items-center">
                 <Button variant="ghost" onClick={() => setStep(4)}><ArrowLeft className="mr-2 h-4 w-4"/> पीछे जाएं</Button>
                 <div className="flex gap-4">
                    <Button variant="outline">📞 सहायता चाहिए</Button>
                    <Button onClick={() => setStep(6)}>🔒 सुरक्षित भुगतान करें</Button>
                 </div>
            </div>
        </div>
    )
}

const CompletionScreen = ({ setStep }: { setStep: (step: number) => void }) => {
    return (
        <div className="text-center space-y-6 py-10">
            <h1 className="text-4xl font-bold font-headline text-primary">🎉 बधाई हो! आप हजारो ग्राहको के सदस्य बन गए हैं!</h1>
            <p className="text-xl text-muted-foreground">✅ आपका ऑनबोर्डिंग सफलतापूर्वक पूरा हुआ</p>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 text-left pt-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-green-500 flex items-center gap-2">🎁 आपकी सदस्यता सक्रिय है!</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p><strong>📧 सत्यापन ईमेल भेजा गया:</strong> rajesh@example.com</p>
                        <p><strong>👨‍💼 आपका प्रोजेक्ट मैनेजर:</strong> राहुल शर्मा</p>
                        <p className="text-sm">📞 +91 99XXXXXX32 | ✉️ rahul@hajarograhako.com</p>
                        <p><strong>📅 पहली मीटिंग:</strong> कल सुबह 11:00 बजे (आपको लिंक भेजा जाएगा)</p>
                        <Separator />
                        <div>
                             <h4 className="font-bold mb-2">🚀 अगले 24 घंटों में:</h4>
                             <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                <li>प्रोजेक्ट विशिष्टताएँ तैयार होंगी</li>
                                <li>डिज़ाइन स्केच भेजे जाएंगे</li>
                                <li>आपकी टीम का परिचय होगा</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">🔧 त्वरित शुरुआत के लिए</CardTitle>
                    </CardHeader>
                     <CardContent className="grid grid-cols-2 gap-3">
                         <Button variant="outline" className="w-full justify-start">🏠 अपना डैशबोर्ड देखें</Button>
                         <Button variant="outline" className="w-full justify-start">📁 प्रोजेक्ट दस्तावेज़ अपलोड करें</Button>
                         <Button variant="outline" className="w-full justify-start">💬 अपनी टीम से चैट करें</Button>
                         <Button variant="outline" className="w-full justify-start">📋 प्रोजेक्ट आवश्यकताएँ भरें</Button>
                         <Button variant="outline" className="w-full justify-start col-span-2">🎬 डेमो वीडियो देखें</Button>
                    </CardContent>
                </Card>
            </div>
            <div className="pt-8">
                <Button size="lg" onClick={() => window.location.href='/dashboard'}>🚀 अपने डैशबोर्ड पर जाएं</Button>
            </div>
        </div>
    )
}


export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const progressValue = steps[step - 1]?.progress || 0;
    
    const renderStep = () => {
        switch (step) {
            case 1: return <Step1 setStep={setStep} />;
            case 2: return <Step2 setStep={setStep} />;
            case 3: return <Step3 setStep={setStep} />;
            case 4: return <Step4 setStep={setStep} />;
            case 5: return <Step5 setStep={setStep} />;
            case 6: return <CompletionScreen setStep={setStep} />;
            default: return <Step1 setStep={setStep} />;
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl md:text-2xl font-bold font-headline flex items-center gap-3">
                           <Rocket className="text-primary"/> 🏢 Hajaro Grahako - 5 आसान चरणों में शुरुआत
                        </h1>
                         <p className="font-mono text-sm md:text-base">🚀 Step {step > 5 ? '🎉' : step}/5</p>
                    </div>
                     {step <= 5 && (
                        <div className="mt-4">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                <span>{steps[step-1].name}</span>
                                <span>{progressValue}% पूर्ण</span>
                            </div>
                            <Progress value={progressValue} />
                        </div>
                    )}
                </header>

                <main>
                    {renderStep()}
                </main>
            </div>
        </div>
    )
}
