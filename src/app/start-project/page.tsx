import Header from '@/components/header';
import Footer from '@/components/footer';
import { SuggestionForm } from './suggestion-form';
import { Lightbulb } from 'lucide-react';
import { handleSuggestion } from './actions';

export default function StartProjectPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card border-b">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                  प्रोजेक्ट शुरू करें
                </div>
                <h1 className="font-headline text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
                  आइए आपके प्रोजेक्ट के लिए सही योजना खोजें
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  हमें अपनी प्रोजेक्ट आवश्यकताओं के बारे में कुछ विवरण प्रदान करें, और हमारा AI-संचालित टूल आपके लिए सबसे उपयुक्त सेवा टियर का सुझाव देगा। यह त्वरित, आसान है, और आपको एक सूचित निर्णय लेने में मदद करता है।
                </p>
                 <div className="rounded-lg border bg-background p-4 flex items-start gap-4">
                  <Lightbulb className="mt-1 h-6 w-6 text-accent" />
                  <div>
                    <h3 className="font-semibold">यह कैसे काम करता है?</h3>
                    <p className="text-sm text-muted-foreground">
                      बस फॉर्म भरें। हमारा सिस्टम आपके इनपुट का विश्लेषण करेगा और एक अनुमानित बजट, समय-सीमा और औचित्य के साथ एक सेवा टियर की सिफारिश करेगा।
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <SuggestionForm handleSuggestion={handleSuggestion} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
