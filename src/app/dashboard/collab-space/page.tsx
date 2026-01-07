
'use client';

import { Button } from '@/components/ui/button';
import { Expand, Users, Video, Mic, Share2, Lightbulb } from 'lucide-react';

export default function CollabSpacePage() {
  return (
    <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 bg-background">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl h-[70vh] bg-card/50 border border-border/30 rounded-3xl flex flex-col items-center justify-center relative shadow-lg">
          
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <div className="flex -space-x-2">
              <span className="h-8 w-8 rounded-full bg-red-500 border-2 border-card"></span>
              <span className="h-8 w-8 rounded-full bg-blue-500 border-2 border-card"></span>
              <span className="h-8 w-8 rounded-full bg-green-500 border-2 border-card"></span>
            </div>
            <Button variant="outline" size="sm"><Users className="mr-2 h-4 w-4"/> ३ लोग ऑनलाइन</Button>
          </div>

          <div className="text-center">
            <div className="inline-block p-6 bg-background rounded-2xl mb-6 shadow-inner">
              <Lightbulb className="h-16 w-16 text-primary animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold font-headline">कोलैबोरेशन स्पेस</h1>
            <p className="mt-2 text-muted-foreground">यह सुविधा जल्द ही आ रही है!</p>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mt-4">
              यह एक इंटरैक्टिव व्हाइटबोर्ड होगा जहां आप और आपकी टीम वास्तविक समय में विचार-मंथन कर सकते हैं, डिज़ाइन बना सकते हैं और योजनाओं पर सहयोग कर सकते हैं।
            </p>
          </div>

          <div className="absolute bottom-4 flex items-center gap-3">
             <Button variant="secondary" size="lg" className="rounded-full h-14 w-14 p-0"><Mic className="h-6 w-6" /></Button>
             <Button variant="secondary" size="lg" className="rounded-full h-14 w-14 p-0"><Video className="h-6 w-6" /></Button>
             <Button variant="destructive" size="lg" className="rounded-full px-6 h-14">लीव करें</Button>
             <Button variant="secondary" size="lg" className="rounded-full h-14 w-14 p-0"><Share2 className="h-6 w-6" /></Button>
             <Button variant="secondary" size="lg" className="rounded-full h-14 w-14 p-0"><Expand className="h-6 w-6" /></Button>
          </div>

        </div>
      </div>
    </div>
  );
}
