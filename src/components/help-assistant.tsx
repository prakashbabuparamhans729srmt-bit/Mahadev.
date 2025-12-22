'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HelpCircle, Search, BookOpen, MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HelpAssistant() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-2xl"
          size="icon"
        >
          <HelpCircle className="h-9 w-9" />
          <span className="sr-only">Help Assistant</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-4 mb-2" side="top" align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">सहायता केंद्र</h4>
            <p className="text-sm text-muted-foreground">
              आपको किसकी ज़रूरत है?
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="खोजें..." className="pl-9" />
          </div>
          <div className="grid gap-2">
             <Link href="/#faq" passHref>
                <Button variant="ghost" className="w-full justify-start">
                    <BookOpen className="mr-2 h-4 w-4" />
                    FAQs और नॉलेज बेस
                    <ArrowRight className="ml-auto h-4 w-4" />
                </Button>
            </Link>
             <Link href="/contact" passHref>
                <Button variant="ghost" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    हमसे संपर्क करें
                    <ArrowRight className="ml-auto h-4 w-4" />
                </Button>
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
