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
            <div className="flex flex-col items-center space-y-8">
              <div className="text-center space-y-4 max-w-3xl">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                  प्रोजेक्ट शुरू करें
                </div>
                <h1 className="font-headline text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
                  आइए आपके प्रोजेक्ट के लिए सही योजना खोजें
                </h1>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  हमें अपनी प्रोजेक्ट आवश्यकताओं के बारे में कुछ विवरण प्रदान करें, और हमारा AI-संचालित टूल आपके लिए सबसे उपयुक्त सेवा टियर का सुझाव देगा। यह त्वरित, आसान है, और आपको एक सूचित निर्णय लेने में मदद करता है।
                </p>
              </div>
              <div className="w-full flex items-center justify-center">
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
