import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="bg-card border-b">
      <div className="px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="grid items-center gap-6">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
               <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none">
                  <span className="block text-foreground">चलो कुछ</span>
                  <span className="block text-accent">बेहतरीन</span>
                  <span className="block text-foreground">बनाएं।</span>
                </h1>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                हमारे साथ जुड़ें और अपनी डिजिटल यात्रा को नई ऊंचाइयों पर ले जाएं। आइए आपके विजन को हकीकत में बदलें।
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
                <Button asChild size="lg" className="w-full shadow-lg transition-transform duration-200 hover:scale-105">
                    <Link href="/signup">
                        <Rocket className="mr-2 h-5 w-5" />
                        अभी साइन अप करें
                    </Link>
                </Button>
                <p className="text-xs text-muted-foreground">
                    आज ही शुरुआत करें और देखें कि हम आपके व्यवसाय को कैसे बदल सकते हैं।
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
