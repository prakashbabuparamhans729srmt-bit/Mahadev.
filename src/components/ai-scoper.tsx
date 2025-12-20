'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ProjectScopeInputSchema,
  scopeProject,
  type ProjectScopeInput,
  type ProjectScopeOutput,
} from '@/ai/flows/scope-project';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Cpu,
  Loader2,
  Wand2,
  CheckCircle,
  IndianRupee,
  CalendarClock,
  Layers,
  FileText,
  Download,
  Mail,
  Pencil,
} from 'lucide-react';
import { Separator } from './ui/separator';

export function AiScoper() {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState<ProjectScopeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ProjectScopeInput>({
    resolver: zodResolver(ProjectScopeInputSchema),
    defaultValues: {
      description: '',
    },
  });

  async function onSubmit(values: ProjectScopeInput) {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await scopeProject(values);
      setResult(response);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }
  
  const handleReset = () => {
    form.reset();
    setResult(null);
    setError(null);
    setIsLoading(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="w-full flex justify-center my-4">
             <Button>
                <Wand2 className="mr-2 h-4 w-4" />
                AI प्रोजेक्ट स्कोप जनरेटर लॉन्च करें
            </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl flex items-center">
            <Cpu className="mr-2" />
            🔮 AI प्रोजेक्ट स्कोप जनरेटर
          </DialogTitle>
          <DialogDescription>
            अपने प्रोजेक्ट के बारे में बताएं और हमारे AI को एक विस्तृत स्कोप तैयार करने दें।
          </DialogDescription>
        </DialogHeader>
        
        {!result && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="उदाहरण: 'मुझे 1000+ उत्पादों को संभालने में सक्षम एक ई-कॉमर्स वेबसाइट चाहिए जिसमें ग्राहक समीक्षा और भुगतान गेटवे एकीकरण हो।'"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      विश्लेषण हो रहा है...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      स्कोप जनरेट करें
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}

        {isLoading && !result && (
            <div className="flex flex-col items-center justify-center space-y-4 min-h-[300px]">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <p className="text-muted-foreground">AI अपना जादू चला रहा है...</p>
            </div>
        )}

        {result && (
          <div className="space-y-6 animate-in fade-in-50">
            <div>
                <h3 className="font-semibold text-lg mb-2">मूल अनुरोध:</h3>
                <p className="text-muted-foreground italic">"{form.getValues('description')}"</p>
            </div>

            <div className="p-4 border rounded-lg bg-secondary/30">
              <h3 className="font-headline text-xl mb-4">🤖 AI विश्लेषण:</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center"><CheckCircle className="mr-2 h-5 w-5 text-green-500" />अनुशंसित सुविधाएं:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-2">
                    {result.recommendedFeatures.map((feature, i) => <li key={i}>{feature}</li>)}
                  </ul>
                </div>
                 <div className="space-y-4">
                    <h4 className="font-semibold flex items-center"><IndianRupee className="mr-2 h-5 w-5 text-primary" />अनुमानित बजट:</h4>
                    <p className="font-bold text-lg">{result.estimatedBudget}</p>
                    
                    <h4 className="font-semibold flex items-center"><CalendarClock className="mr-2 h-5 w-5 text-primary" />अनुमानित समय:</h4>
                    <p className="font-bold text-lg">{result.estimatedTimeline}</p>

                    <h4 className="font-semibold flex items-center"><Layers className="mr-2 h-5 w-5 text-primary" />तकनीकी स्टैक:</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                        <p><strong>फ्रंटएंड:</strong> {result.techStack.frontend}</p>
                        <p><strong>बैकएंड:</strong> {result.techStack.backend}</p>
                        <p><strong>डेटाबेस:</strong> {result.techStack.database}</p>
                        <p><strong>होस्टिंग:</strong> {result.techStack.hosting}</p>
                    </div>
                 </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
                <h3 className="font-headline text-lg mb-2">📄 स्वचालित प्रस्ताव तैयार:</h3>
                <div className="flex flex-wrap gap-2">
                    <Button variant="outline"><Pencil className="mr-2 h-4 w-4"/>कस्टमाइज़ करें</Button>
                    <Button variant="outline"><Download className="mr-2 h-4 w-4"/>PDF डाउनलोड</Button>
                    <Button variant="outline"><Mail className="mr-2 h-4 w-4"/>क्लाइंट को भेजें</Button>
                </div>
            </div>

            <DialogFooter className="sm:justify-between">
              <Button variant="ghost" onClick={handleReset}>⬅️ पीछे</Button>
              <DialogClose asChild>
                <Button>✅ प्रोजेक्ट शुरू करें</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        )}

        {error && (
            <div className="text-destructive-foreground bg-destructive p-4 rounded-md text-center">
                <p>{error}</p>
                <Button variant="ghost" onClick={handleReset} className="mt-2 text-destructive-foreground hover:bg-destructive/80">पुनः प्रयास करें</Button>
            </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

    