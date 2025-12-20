'use client';

import { useActionState, useEffect, useState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, CheckCircle, Globe, Smartphone, Laptop, Wrench, Link as LinkIcon, RefreshCw, ArrowRight } from 'lucide-react';
import type { FormState } from './actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type SuggestionFormProps = {
  handleSuggestion: (prevState: FormState, formData: FormData) => Promise<FormState>;
};

const projectTypes = [
  {
    id: "Website Development",
    title: "वेबसाइट",
    icon: <Globe className="h-8 w-8 text-accent" />,
    subcategories: ["कॉर्पोरेट", "ई-कॉमर्स", "ब्लॉग", "पोर्टफोलियो"],
    price: "₹15K - ₹80K",
    timeline: "2-4 सप्ताह",
  },
  {
    id: "Mobile App",
    title: "मोबाइल ऐप",
    icon: <Smartphone className="h-8 w-8 text-accent" />,
    subcategories: ["iOS", "Android", "हाइब्रिड", "गेम्स"],
    price: "₹30K - ₹1.5L",
    timeline: "4-8 सप्ताह",
  },
  {
    id: "Web App",
    title: "वेब ऐप",
    icon: <Laptop className="h-8 w-8 text-accent" />,
    subcategories: ["SaaS", "ERP/CRM", "डैशबोर्ड", "कस्टम सॉल्यूशन"],
    price: "₹50K - ₹3L",
    timeline: "6-12 सप्ताह",
  },
   {
    id: "Custom Solution",
    title: "कस्टम सॉल्यूशन",
    icon: <Wrench className="h-8 w-8 text-accent" />,
    subcategories: ["AI/ML", "IoT", "ब्लॉकचेन", "AR/VR"],
    price: "₹1L+",
    timeline: "8+ सप्ताह",
  },
  {
    id: "Other",
    title: "अन्य",
    icon: <LinkIcon className="h-8 w-8 text-accent" />,
    subcategories: ["रिडिज़ाइन", "सपोर्ट", "मार्केटिंग", "SEO"],
    price: "कॉन्ट्रैक्ट आधारित",
    timeline: "",
  },
];


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <>अगला चरण: आवश्यकताएं <ArrowRight className="ml-2 h-4 w-4" /></>}
    </Button>
  );
}

export function SuggestionForm({ handleSuggestion }: SuggestionFormProps) {
  const initialState: FormState = { message: '', isSuccess: false };
  const [state, formAction] = useActionState(handleSuggestion, initialState);
  const { toast } = useToast();
  const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null);
  
  useEffect(() => {
    if (!state.isSuccess && state.message) {
      toast({
        title: 'त्रुटि',
        description: state.message,
        variant: 'destructive',
      })
    }
  }, [state, toast])

  const handleReset = () => {
    setSelectedProjectType(null);
    // You might want to reset the form action state as well if needed,
    // but a page reload is a simpler way to achieve a full reset.
    window.location.reload();
  };

  return (
    <Card className="w-full max-w-4xl shadow-2xl">
      {state.isSuccess && state.suggestion ? (
        <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
                <h2 className="text-2xl font-bold font-headline">सुझाव तैयार है!</h2>
                <p className="text-muted-foreground">आपकी आवश्यकताओं के आधार पर, हम इस टियर की अनुशंसा करते हैं:</p>
            </div>
            <Card className="mt-6 bg-secondary">
                <CardHeader>
                    <CardTitle className="text-primary font-headline text-center text-3xl">{state.suggestion.suggestedTier}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">अनुमानित बजट:</span>
                        <span className="font-bold">{state.suggestion.estimatedBudget}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">अनुमानित समय-सीमा:</span>
                        <span className="font-bold">{state.suggestion.estimatedTimeline}</span>
                    </div>
                     <div>
                        <span className="font-semibold">औचित्य:</span>
                        <p className="text-sm text-muted-foreground mt-1">{state.suggestion.justification}</p>
                    </div>
                </CardContent>
            </Card>
             <Button onClick={() => window.location.reload()} className="w-full mt-6" variant="outline">
                फिर से शुरू करें
            </Button>
        </CardContent>
      ) : (
        <form action={formAction}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="font-headline text-2xl">चरण 1: प्रोजेक्ट प्रकार चुनें</CardTitle>
              <p className="text-sm text-muted-foreground">चरण 1/5</p>
            </div>
            <CardDescription>अपनी यात्रा शुरू करने के लिए एक श्रेणी चुनें।</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Input type="hidden" name="projectType" value={selectedProjectType ?? ''} />
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {projectTypes.map((type) => (
                  <Card 
                    key={type.id}
                    onClick={() => setSelectedProjectType(type.id)}
                    className={cn(
                      "cursor-pointer text-center p-4 transition-all duration-200 flex flex-col justify-between",
                      selectedProjectType === type.id 
                        ? "ring-2 ring-primary border-primary bg-primary/5" 
                        : "hover:shadow-md hover:-translate-y-1"
                    )}
                  >
                    <div>
                      <div className="flex justify-center items-center mb-2">{type.icon}</div>
                      <p className="font-bold text-md mb-2">{type.title}</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {type.subcategories.map(sub => <li key={sub}>• {sub}</li>)}
                      </ul>
                    </div>
                    <div className="mt-4">
                        <p className="font-semibold text-xs text-primary">{type.price}</p>
                        {type.timeline && <p className="text-xs text-muted-foreground mt-1">⏱️ {type.timeline}</p>}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {selectedProjectType && (
              <div className="space-y-4 animate-in fade-in-50 duration-500 border-t pt-6">
                 <CardTitle className="font-headline text-xl">💰 तुरंत मूल्य अनुमान प्राप्त करें</CardTitle>
                <div className="space-y-2">
                  <Label htmlFor="requiredFeatures" className="text-base font-semibold">आपकी मुख्य आवश्यकताएं क्या हैं?</Label>
                  <Textarea id="requiredFeatures" name="requiredFeatures" placeholder="जैसे: ग्राहक पोर्टल, प्रोजेक्ट ट्रैकिंग, AI एकीकरण..." required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="font-semibold">आपका अनुमानित बजट क्या है?</Label>
                    <Input id="budget" name="budget" placeholder="जैसे: ₹15-35K" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeline" className="font-semibold">आपकी वांछित समय-सीमा क्या है?</Label>
                    <Input id="timeline" name="timeline" placeholder="जैसे: 2-4 सप्ताह" required />
                  </div>
                </div>
                 <div className="flex justify-between items-center pt-4">
                    <Button type="button" variant="ghost" onClick={handleReset}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      रीसेट
                    </Button>
                    <SubmitButton />
                </div>
              </div>
            )}

          </CardContent>
          {!selectedProjectType && (
             <CardFooter>
                 <p className="text-center text-sm text-muted-foreground w-full">
                    📞 **अभी बात करें?** +91-XXXXXXXXXX या 💬 लाइव चैट शुरू करें
                 </p>
            </CardFooter>
          )}
        </form>
      )}
    </Card>
  );
}
