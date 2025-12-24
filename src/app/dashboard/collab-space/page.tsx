
'use client';

import { Expand } from 'lucide-react';

export default function CollabSpacePage() {
  return (
    <div className="flex items-center justify-center h-full p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-4xl h-[60vh] bg-card/50 border border-border/30 rounded-3xl flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-6 bg-background rounded-2xl mb-6">
            <Expand className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold font-headline">कोलैबोरेशन स्पेस</h1>
          <p className="mt-2 text-muted-foreground animate-pulse">सर्वर से जुड़ रहा है...</p>
        </div>
      </div>
    </div>
  );
}
