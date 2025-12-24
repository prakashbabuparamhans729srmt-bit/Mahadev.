'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ProjectScopeInputSchema,
  type ProjectScopeInput,
  type ProjectScopeOutput,
} from '@/ai/flows/scope-project.types';
import { scopeProject } from '@/ai/flows/scope-project';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
  Loader2,
  Wand2,
  CheckCircle,
  IndianRupee,
  CalendarClock,
  Layers,
  Download,
  Mail,
  Pencil,
  FileBox,
  Clock,
  Cpu,
} from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

function ScopeResultDialog({
  result,
  isOpen,
  onOpenChange,
  onReset,
  description,
}: {
  result: ProjectScopeOutput;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onReset: () => void;
  description: string;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl flex items-center">
            <Cpu className="mr-2" />
            🔮 AI प्रोजेक्ट स्कोप
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 animate-in fade-in-50">
          <p className="text-muted-foreground italic border-l-4 pl-4">
            "{description}"
          </p>

          <div className="p-4 border rounded-lg bg-secondary/30">
            <h3 className="font-headline text-xl mb-4">🤖 AI विश्लेषण:</h3>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  अनुशंसित सुविधाएं:
                </h4>
                <ul className="list-disc list-inside space-y-1.5 text-muted-foreground pl-2 text-sm">
                  {result.recommendedFeatures.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold flex items-center mb-1">
                    <IndianRupee className="mr-2 h-5 w-5 text-primary" />
                    अनुमानित बजट:
                  </h4>
                  <p className="font-bold text-lg">{result.estimatedBudget}</p>
                </div>
                <div>
                  <h4 className="font-semibold flex items-center mb-1">
                    <CalendarClock className="mr-2 h-5 w-5 text-primary" />
                    अनुमानित समय:
                  </h4>
                  <p className="font-bold text-lg">{result.estimatedTimeline}</p>
                </div>
                <div>
                  <h4 className="font-semibold flex items-center mb-2">
                    <Layers className="mr-2 h-5 w-5 text-primary" />
                    तकनीकी स्टैक:
                  </h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                      <strong>फ्रंटएंड:</strong> {result.techStack.frontend}
                    </p>
                    <p>
                      <strong>बैकएंड:</strong> {result.techStack.backend}
                    </p>
                    <p>
                      <strong>डेटाबेस:</strong> {result.techStack.database}
                    </p>
                    <p>
                      <strong>होस्टिंग:</strong> {result.techStack.hosting}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-headline text-lg mb-2">
              📄 स्वचालित प्रस्ताव तैयार:
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline">
                <Pencil className="mr-2 h-4 w-4" />
                कस्टमाइज़ करें
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                PDF डाउनलोड
              </Button>
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                क्लाइंट को भेजें
              </Button>
            </div>
          </div>

          <DialogFooter className="sm:justify-between pt-2">
            <Button variant="ghost" onClick={onReset}>
              ⬅️ नया स्कोप
            </Button>
            <DialogClose asChild>
              <Button>✅ प्रोजेक्ट शुरू करें</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function AIScoperPage() {
  const [result, setResult] = useState<ProjectScopeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isResultOpen, setIsResultOpen] = useState(false);

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
      setIsResultOpen(true);
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
    setIsResultOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-5xl font-bold font-headline text-foreground">AI स्कोपर</h1>
        <p className="mt-2 text-lg text-primary animate-blinking-glow">
          अपने प्रोजेक्ट विज़न को हकीकत में बदलें
        </p>

        <div className="mt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="अपना आईडिया यहाँ लिखें..."
                        className="min-h-[200px] bg-card/50 border-border/30 rounded-2xl p-4 text-base focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-lg rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-all duration-300 transform hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    विश्लेषण हो रहा है...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-3 h-5 w-5" />
                    स्कोप जनरेट करें
                  </>
                )}
              </Button>
            </form>
          </Form>
          {error && (
            <p className="mt-4 text-destructive-foreground bg-destructive/80 p-3 rounded-md">
              {error}
            </p>
          )}
        </div>
      </div>
      {result && (
        <ScopeResultDialog
          result={result}
          isOpen={isResultOpen}
          onOpenChange={setIsResultOpen}
          onReset={handleReset}
          description={form.getValues('description')}
        />
      )}
    </div>
  );
}
