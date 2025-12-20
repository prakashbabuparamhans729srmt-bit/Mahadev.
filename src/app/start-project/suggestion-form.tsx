'use client';

import { useActionState, useFormStatus } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, CheckCircle, AlertTriangle } from 'lucide-react';
import type { FormState } from './actions';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

type SuggestionFormProps = {
  handleSuggestion: (prevState: FormState, formData: FormData) => Promise<FormState>;
};

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
    <Card className="w-full max-w-lg shadow-2xl">
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
            <CardTitle className="font-headline">अपनी आवश्यकताएं बताएं</CardTitle>
            <CardDescription>हम आपके लिए सबसे अच्छा प्लान सुझाएंगे।</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectType">प्रोजेक्ट का प्रकार</Label>
              <Select name="projectType" required>
                <SelectTrigger id="projectType">
                  <SelectValue placeholder="एक प्रकार चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Website Development">वेबसाइट डेवलपमेंट</SelectItem>
                  <SelectItem value="Mobile App">मोबाइल ऐप</SelectItem>
                  <SelectItem value="Web App">वेब ऐप</SelectItem>
                  <SelectItem value="Custom Solution">कस्टम सॉल्यूशन</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="requiredFeatures">आवश्यक सुविधाएँ</Label>
              <Textarea id="requiredFeatures" name="requiredFeatures" placeholder="जैसे: ग्राहक पोर्टल, प्रोजेक्ट ट्रैकिंग..." required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">बजट</Label>
                <Input id="budget" name="budget" placeholder="जैसे: ₹15-35K" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline">समय-सीमा</Label>
                <Input id="timeline" name="timeline" placeholder="जैसे: 2-4 सप्ताह" required />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <SubmitButton />
          </CardFooter>
        </form>
      )}
    </Card>
  );
}
