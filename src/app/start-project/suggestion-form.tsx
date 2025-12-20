'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, CheckCircle, Globe, Smartphone, Laptop, CloudCog } from 'lucide-react';
import type { FormState } from './actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type SuggestionFormProps = {
  handleSuggestion: (prevState: FormState, formData: FormData) => Promise<FormState>;
};

const projectTypes = [
  {
    id: "Website Development",
    title: "वेबसाइट डेवलपमेंट",
    icon: <Globe className="h-8 w-8 text-accent" />,
  },
  {
    id: "Mobile App",
    title: "मोबाइल ऐप",
    icon: <Smartphone className="h-8 w-8 text-accent" />,
  },
  {
    id: "Web App",
    title: "वेब ऐप",
    icon: <Laptop className="h-8 w-8 text-accent" />,
  },
   {
    id: "Custom Solution",
    title: "कस्टम सॉल्यूशन",
    icon: <CloudCog className="h-8 w-8 text-accent" />,
  },
];


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
      सुझाव प्राप्त करें
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


  return (
    <Card className="w-full max-w-2xl shadow-2xl">
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
            <CardTitle className="font-headline text-2xl">अपनी आवश्यकताएं बताएं</CardTitle>
            <CardDescription>हम आपके लिए सबसे अच्छा प्लान सुझाएंगे।</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-semibold">चरण 1: प्रोजेक्ट प्रकार चुनें</Label>
              <Input type="hidden" name="projectType" value={selectedProjectType ?? ''} />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {projectTypes.map((type) => (
                  <Card 
                    key={type.id}
                    onClick={() => setSelectedProjectType(type.id)}
                    className={cn(
                      "cursor-pointer text-center p-4 transition-all duration-200",
                      selectedProjectType === type.id 
                        ? "ring-2 ring-primary border-primary bg-primary/5" 
                        : "hover:shadow-md hover:-translate-y-1"
                    )}
                  >
                    <div className="flex justify-center items-center mb-2">{type.icon}</div>
                    <p className="font-semibold text-sm">{type.title}</p>
                  </Card>
                ))}
              </div>
            </div>

            {selectedProjectType && (
              <div className="space-y-4 animate-in fade-in-50 duration-500">
                <div className="space-y-2">
                  <Label htmlFor="requiredFeatures">चरण 2: आवश्यक सुविधाएँ बताएं</Label>
                  <Textarea id="requiredFeatures" name="requiredFeatures" placeholder="जैसे: ग्राहक पोर्टल, प्रोजेक्ट ट्रैकिंग, AI एकीकरण..." required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">चरण 3: आपका बजट क्या है?</Label>
                    <Input id="budget" name="budget" placeholder="जैसे: ₹15-35K" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeline">चरण 4: आपकी समय-सीमा क्या है?</Label>
                    <Input id="timeline" name="timeline" placeholder="जैसे: 2-4 सप्ताह" required />
                  </div>
                </div>
              </div>
            )}

          </CardContent>
          {selectedProjectType && (
            <CardFooter className="flex-col gap-4 animate-in fade-in-50 duration-500">
              <SubmitButton />
            </CardFooter>
          )}
        </form>
      )}
    </Card>
  );
}
