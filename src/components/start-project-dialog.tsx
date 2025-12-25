'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Search, Wand2, UserCircle, Target, Globe, Smartphone, Server, Wrench, X } from 'lucide-react';
import { projectCategories, categoryIcons } from '@/lib/project-categories.tsx';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from './ui/scroll-area';

const whoAreYouTags = ["छोटा व्यवसाय", "स्टार्टअप", "फ्रीलांसर", "कलाकार", "शिक्षक", "डॉक्टर"];
const yourGoalTags = ["उत्पाद बेचना", "सेवाएं देना", "ऑनलाइन पहचान", "बुकिंग प्राप्त करना"];

const projectTypes = [
  {
    icon: <Globe className="h-12 w-12 text-primary" />,
    title: 'वेबसाइट',
    description: 'एक आकर्षक और शक्तिशाली वेबसाइट के साथ अपनी ऑनलाइन उपस्थिति दर्ज करें।',
    step: 2,
  },
  {
    icon: <Smartphone className="h-12 w-12 text-primary" />,
    title: 'मोबाइल ऐप',
    description: 'अपने ग्राहकों तक पहुंचने के लिए एक शानदार मोबाइल एप्लिकेशन बनाएं।',
    step: '#',
  },
  {
    icon: <Server className="h-12 w-12 text-primary" />,
    title: 'एडमिन पैनल',
    description: 'अपने व्यवसाय को कुशलतापूर्वक प्रबंधित करने के लिए एक शक्तिशाली एडमिन पैनल।',
    step: '#',
  },
  {
    icon: <Wrench className="h-12 w-12 text-primary" />,
    title: 'कस्टम सॉल्यूशन',
    description: 'आपकी अनूठी जरूरतों के लिए एक विशेष रूप से तैयार किया गया समाधान।',
    step: '#',
  },
];


function Step1({ setStep }: { setStep: (step: number | string) => void }) {
  const { toast } = useToast();
  
  const handleCardClick = (step: number | string) => {
    if (step === '#') {
      toast({
        title: 'सुविधा जल्द ही आ रही है',
        description: 'यह प्रोजेक्ट प्रकार जल्द ही उपलब्ध होगा।',
      });
    } else {
      setStep(step);
    }
  };

  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <h1 className="font-headline text-2xl font-bold tracking-tighter text-primary">
        अपना प्रोजेक्ट प्रकार चुनें
      </h1>
      <p className="max-w-[700px] text-muted-foreground text-sm">
        चलिए कुछ बेहतरीन बनाते हैं। शुरू करने के लिए नीचे दिए गए विकल्पों में से एक चुनें।
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full pt-4">
        {projectTypes.map((type) => (
          <div
            key={type.title}
            onClick={() => handleCardClick(type.step)}
            className="cursor-pointer"
          >
            <Card className="flex flex-col items-center justify-center p-6 text-center h-full transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1">
              <div className="mb-4">{type.icon}</div>
              <h3 className="text-lg font-bold font-headline mb-2">{type.title}</h3>
              <p className="text-muted-foreground text-xs flex-1">{type.description}</p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}


function Step2({ setStep }: { setStep: (step: number | string) => void }) {
    const { toast } = useToast();
    const [activeFilter, setActiveFilter] = useState('सब');
    const [searchQuery, setSearchQuery] = useState('');

    const handleTagClick = (tag: string) => {
        toast({
            title: 'AI चयन जल्द ही आ रहा है',
            description: ` आपने "${tag}" को चुना। यह सुविधा जल्द ही आपके लिए वेबसाइट के प्रकारों का सुझाव देगी।`,
        });
    };

    const getFilteredCategories = () => {
        let categories = [...projectCategories];

        if (activeFilter !== 'सब' && activeFilter !== 'लोकप्रिय') {
            categories = categories.filter(group => group.group.includes(activeFilter));
        }

        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            categories = categories.map(group => {
                const filteredTypes = group.types.filter(type =>
                    type.name.toLowerCase().includes(lowerCaseQuery) ||
                    type.features.some(feature => feature.toLowerCase().includes(lowerCaseQuery))
                );
                return { ...group, types: filteredTypes };
            }).filter(group => group.types.length > 0);
        }
        return categories;
    };

    const filteredCategories = getFilteredCategories();
    const isHot = (name: string) => ['ई-कॉमर्स', 'कॉर्पोरेट', 'ब्लॉग', 'शैक्षिक'].includes(name);

    return (
        <div className="space-y-6">
            <Card className="p-6 bg-card/80 border-border/50 rounded-2xl">
                <h2 className="text-lg font-bold font-headline flex items-center mb-4">
                    <Wand2 className="mr-2 text-primary h-5 w-5"/>
                    त्वरित चयन - AI संचालित
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center"><UserCircle className="mr-2 h-4 w-4"/>मैं हूँ:</h3>
                        <div className="flex flex-wrap gap-2">
                            {whoAreYouTags.map(tag => (
                                <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary/20" onClick={() => handleTagClick(tag)}>{tag}</Badge>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center"><Target className="mr-2 h-4 w-4"/>मेरा उद्देश्य:</h3>
                        <div className="flex flex-wrap gap-2">
                            {yourGoalTags.map(tag => (
                                <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary/20" onClick={() => handleTagClick(tag)}>{tag}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>

            <div className="sticky top-0 z-10 p-4 bg-background/80 backdrop-blur-sm rounded-2xl border border-border/50">
                <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                    placeholder="वेबसाइट प्रकार खोजें (उदा. ई-कॉमर्स)" 
                    className="pl-9 bg-card/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                    {['सब', 'लोकप्रिय', 'व्यवसाय', 'टेक्नोलॉजी', 'क्रिएटिव', 'स्थानीय'].map((filter) => (
                    <Button
                        key={filter}
                        variant={activeFilter === filter ? 'default' : 'secondary'}
                        size="sm"
                        onClick={() => setActiveFilter(filter)}
                        className="rounded-full flex-shrink-0"
                    >
                        {filter}
                    </Button>
                    ))}
                </div>
                </div>
            </div>

            <div className="space-y-12">
                {filteredCategories.map((group) => (
                <div key={group.group}>
                    <h2 className="text-2xl font-bold font-headline mb-6 text-primary">{group.group}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {group.types.map((type) => (
                        <Card key={type.name} className="bg-card/80 border-border/50 rounded-2xl p-6 flex flex-col justify-between hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                            <div className="p-4 bg-secondary rounded-xl">
                                {categoryIcons[type.name] || categoryIcons['अन्य']}
                            </div>
                            {isHot(type.name) && (
                                <Badge variant="destructive" className="bg-accent text-accent-foreground text-xs">HOT</Badge>
                            )}
                            </div>
                            <h3 className="text-xl font-bold font-headline mb-2">{type.name}</h3>
                            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                            {type.features.slice(0, 3).map((feature) => (
                                <li key={feature}>{feature}</li>
                            ))}
                            </ul>
                        </div>
                        <div className="mt-6 border-t border-border/30 pt-4 space-y-3">
                            <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">बजट</span>
                            <span className="font-bold text-primary">{type.budget}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">समय</span>
                            <span className="font-bold">{type.timeline}</span>
                            </div>
                        </div>
                        </Card>
                    ))}
                    </div>
                </div>
                ))}
                {filteredCategories.length === 0 && (
                <div className="text-center py-20 bg-card/50 rounded-lg">
                    <p className="text-muted-foreground">कोई परिणाम नहीं मिला। कृपया अपनी खोज बदलें।</p>
                </div>
                )}
            </div>
             <div className="flex justify-between items-center mt-6">
                <Button variant="ghost" onClick={() => setStep(1)}>पीछे जाएं</Button>
                <Button onClick={() => toast({ title: 'अगला चरण जल्द ही आ रहा है' })}>
                अगला चरण: आवश्यकताएं &gt;
                </Button>
            </div>
        </div>
    );
}

export function StartProjectDialog({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (open: boolean) => void }) {
  const [step, setStep] = useState<number | string>(1);
  const totalSteps = 6;
  const progress = ( (typeof step === 'number' ? step : 1) / totalSteps) * 100;

   const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      // Reset to step 1 when dialog is closed
      setTimeout(() => setStep(1), 300);
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {step > 1 && (
                <Button variant="ghost" size="icon" onClick={() => setStep(1)}>
                  <ArrowLeft />
                </Button>
              )}
              <div>
                <DialogTitle className="text-xl font-bold font-headline">नया प्रोजेक्ट शुरू करें</DialogTitle>
                <p className="text-sm text-muted-foreground">चरण {step}/{totalSteps}: {step === 1 ? "प्रोजेक्ट प्रकार चुनें" : "वेबसाइट प्रकार चुनें"}</p>
              </div>
            </div>
            <div className="w-48 flex items-center gap-3">
              <Progress value={progress} className="h-1.5" />
              <span className="text-xs text-muted-foreground whitespace-nowrap">{typeof step === 'number' ? step : 1} / {totalSteps}</span>
            </div>
          </div>
        </DialogHeader>
        <ScrollArea className="flex-1">
            <div className="p-6">
            {step === 1 && <Step1 setStep={setStep} />}
            {step === 2 && <Step2 setStep={setStep} />}
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
