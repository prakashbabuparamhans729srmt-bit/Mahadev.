
import Footer from '@/components/footer';
import Header from '@/components/header';
import { ProjectCategoryList } from './project-category-list';
import { QuickSelection } from './quick-selection';
import { Separator } from '@/components/ui/separator';

export default function StartProjectPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8">
              <div className="text-center space-y-4 max-w-4xl">
                <h1 className="font-headline text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
                  🚀 अपना प्रोजेक्ट शुरू करें
                </h1>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  हमारे 50+ विशेष रूप से तैयार किए गए वेबसाइट प्रकारों में से चुनें। अपनी आवश्यकताओं के लिए सही समाधान खोजें, बजट और समय-सीमा देखें, और आज ही अपनी डिजिटल यात्रा शुरू करें।
                </p>
              </div>

              <QuickSelection />
              
              <Separator className="my-8" />

              <div className="w-full">
                <ProjectCategoryList />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
