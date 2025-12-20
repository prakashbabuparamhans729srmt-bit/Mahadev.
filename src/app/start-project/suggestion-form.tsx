'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Smartphone, Laptop, Wrench, Link as LinkIcon, RefreshCw, ArrowRight, ChevronsRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Data for the multi-step form
const projectData = {
  types: [
    { id: 'website', title: 'वेबसाइट', icon: <Globe className="h-8 w-8 text-accent" /> },
    { id: 'mobile', title: 'मोबाइल ऐप', icon: <Smartphone className="h-8 w-8 text-accent" /> },
    { id: 'webapp', title: 'वेब ऐप', icon: <Laptop className="h-8 w-8 text-accent" /> },
    { id: 'custom', title: 'कस्टम सॉल्यूशन', icon: <Wrench className="h-8 w-8 text-accent" /> },
    { id: 'other', title: 'अन्य', icon: <LinkIcon className="h-8 w-8 text-accent" /> },
  ],
  subcategories: {
    website: [
      { id: 'corporate', title: 'कॉर्पोरेट', budget: '₹20K - ₹40K', timeline: '3-4 सप्ताह' },
      { id: 'ecommerce_small', title: 'ई-कॉमर्स (छोटा)', budget: '₹45K - ₹75K', timeline: '4-6 सप्ताह' },
      { id: 'blog', title: 'ब्लॉग/पोर्टफोलियो', budget: '₹15K - ₹30K', timeline: '2-3 सप्ताह' },
    ],
    mobile: [
       { id: 'simple', title: 'सरल ऐप (एक प्लेटफॉर्म)', budget: '₹50K - ₹90K', timeline: '5-8 सप्ताह' },
       { id: 'complex', title: 'जटिल ऐप (दोनों प्लेटफॉर्म)', budget: '₹1.5L - ₹3L', timeline: '10-16 सप्ताह' },
       { id: 'game', title: 'गेम', budget: '₹2L+', timeline: '12+ सप्ताह' },
    ],
     webapp: [
       { id: 'saas', title: 'SaaS MVP', budget: '₹80K - ₹1.5L', timeline: '8-12 सप्ताह' },
       { id: 'erp', title: 'ERP/CRM', budget: '₹1.2L - ₹2.5L', timeline: '10-15 सप्ताह' },
       { id: 'dashboard', title: 'डैशबोर्ड/पोर्टल', budget: '₹60K - ₹1L', timeline: '6-9 सप्ताह' },
    ],
    custom: [
       { id: 'ai', title: 'AI/ML एकीकरण', budget: '₹1L+', timeline: '10+ सप्ताह' },
       { id: 'iot', title: 'IoT सॉल्यूशन', budget: '₹2L+', timeline: '12+ सप्ताह' },
       { id: 'blockchain', title: 'ब्लॉकचेन ऐप', budget: '₹2.5L+', timeline: '14+ सप्ताह' },
    ],
    other: [
      { id: 'redesign', title: 'रिडिज़ाइन', budget: 'कस्टम', timeline: 'कस्टम' },
      { id: 'support', title: 'सपोर्ट/मेंटेनेंस', budget: 'कस्टम', timeline: 'कस्टम' },
    ]
  },
};


export function SuggestionForm() {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<{ type: string | null; subcategory: string | null }>({
    type: null,
    subcategory: null,
  });

  const currentSubcategories = useMemo(() => {
    if (!selections.type) return [];
    return projectData.subcategories[selections.type as keyof typeof projectData.subcategories] || [];
  }, [selections.type]);

  const selectedSubcategoryDetails = useMemo(() => {
    if (!selections.subcategory) return null;
    return currentSubcategories.find(sub => sub.id === selections.subcategory);
  }, [selections.subcategory, currentSubcategories]);


  const handleTypeSelect = (typeId: string) => {
    setSelections({ type: typeId, subcategory: null });
    setStep(2);
  };
  
  const handleSubcategorySelect = (subId: string) => {
      setSelections(prev => ({ ...prev, subcategory: subId }));
      setStep(3);
  }

  const handleReset = () => {
    setSelections({ type: null, subcategory: null });
    setStep(1);
  };

  const getStepTitle = () => {
    const typeTitle = projectData.types.find(t => t.id === selections.type)?.title;
    switch (step) {
      case 1:
        return 'चरण 1: प्रोजेक्ट प्रकार चुनें';
      case 2:
        return `चरण 2: '${typeTitle}' चुनें`;
      case 3:
        return 'चरण 3: अपना अनुमान देखें';
      default:
        return 'प्रोजेक्ट शुरू करें';
    }
  };


  return (
    <Card className="w-full max-w-4xl shadow-2xl transition-all duration-500">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-headline text-2xl">{getStepTitle()}</CardTitle>
          <p className="text-sm text-muted-foreground">{`चरण ${step}/3`}</p>
        </div>
        <CardDescription>अपनी यात्रा शुरू करने के लिए एक विकल्प चुनें।</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 min-h-[300px]">
        {/* Step 1: Select Project Type */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-in fade-in-50 duration-300">
            {projectData.types.map((type) => (
              <Card
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                className="cursor-pointer text-center p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-1 flex flex-col justify-center items-center"
              >
                <div className="flex justify-center items-center mb-2">{type.icon}</div>
                <p className="font-bold text-md">{type.title}</p>
              </Card>
            ))}
          </div>
        )}

        {/* Step 2: Select Subcategory */}
        {step === 2 && (
          <div className="animate-in fade-in-50 duration-300">
             <div className="flex items-center text-sm text-muted-foreground mb-4">
                <p>{projectData.types.find(t => t.id === selections.type)?.title}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {currentSubcategories.map(sub => (
                    <Card key={sub.id} onClick={() => handleSubcategorySelect(sub.id)} className="cursor-pointer p-4 text-center hover:bg-primary/5 transition-colors">
                        <p className="font-semibold">{sub.title}</p>
                    </Card>
                ))}
            </div>
          </div>
        )}
        
        {/* Step 3: Show Estimate */}
        {step === 3 && selectedSubcategoryDetails && (
            <div className="animate-in fade-in-50 duration-300 space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-sm md:text-base">
                    <Badge variant="secondary">{projectData.types.find(t => t.id === selections.type)?.title}</Badge>
                    <ChevronsRight className="h-4 w-4 text-muted-foreground" />
                    <Badge variant="secondary">{selectedSubcategoryDetails.title}</Badge>
                </div>
                
                <Card className="bg-secondary/50">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary">💰 तुरंत मूल्य अनुमान</CardTitle>
                    </CardHeader>
                     <CardContent className="space-y-4 text-lg">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-muted-foreground">अनुमानित बजट:</span>
                            <span className="font-bold text-foreground">{selectedSubcategoryDetails.budget}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-muted-foreground">अनुमानित समय:</span>
                            <span className="font-bold text-foreground">{selectedSubcategoryDetails.timeline}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )}

      </CardContent>

      <CardFooter>
        <div className="w-full flex justify-between items-center">
            {step > 1 ? (
                 <Button type="button" variant="ghost" onClick={handleReset}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    रीसेट
                </Button>
            ) : (
                <p className="text-center text-sm text-muted-foreground w-full">
                    📞 **अभी बात करें?** +91-XXXXXXXXXX या 💬 लाइव चैट शुरू करें
                </p>
            )}
            
            {step === 3 && (
                 <Button type="button">
                    अगला चरण: आवश्यकताएं
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            )}
        </div>
      </CardFooter>
    </Card>
  );
}
