'use client';

import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  Home,
  LayoutDashboard,
  MessageSquare,
  Folder,
  User,
  X,
  ArrowLeft,
  Paperclip,
  UploadCloud,
  BarChart2,
} from 'lucide-react';
import { Icons } from './icons';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="left"
        className="w-full max-w-sm p-0 flex flex-col bg-card text-card-foreground"
      >
        <SheetHeader className="flex-row items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onClose} asChild>
              <Link href="/">
                <ArrowLeft />
              </Link>
            </Button>
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">Hajaro Grahako</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <h3 className="font-semibold">प्रोजेक्ट #1042</h3>
            <Progress value={75} className="my-2 h-3" />
          </div>

          <div>
            <div className="flex items-center justify-between text-sm">
              <span>फ्रंटएंड</span>
              <span>80%</span>
            </div>
            <Progress value={80} className="h-2" />
          </div>
          <div>
            <div className="flex items-center justify-between text-sm">
              <span>बैकएंड</span>
              <span>90%</span>
            </div>
            <Progress value={90} className="h-2" />
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-2 text-sm">💬 नया मैसेज:</h4>
            <p className="text-sm text-muted-foreground p-3 bg-secondary rounded-md">
              "क्लाइंट ने लोगो डिजाइन पर नया फीडबैक दिया है।"
            </p>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-2 text-sm">📁 अपलोड फाइल:</h4>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Paperclip className="mr-2" /> चुनें
              </Button>
              <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
                <UploadCloud className="mr-2" /> अपलोड
              </Button>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-2 text-sm">🔄 लाइव अपडेट:</h4>
            <p className="text-sm text-muted-foreground">
              "राहुल ने `feat/user-auth` ब्रांच में नया कोड कमिट किया है।"
            </p>
          </div>
        </div>

        <div className="border-t p-2">
          <div className="flex justify-around">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <div className="flex flex-col items-center gap-1">
                  <Home />
                  <span className="text-xs">होम</span>
                </div>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <div className="flex flex-col items-center gap-1">
                  <BarChart2 />
                  <span className="text-xs">डैशबोर्ड</span>
                </div>
              </Link>
            </Button>
            <Button variant="ghost" size="sm">
              <div className="flex flex-col items-center gap-1">
                <MessageSquare />
                <span className="text-xs">चैट</span>
              </div>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/files">
                <div className="flex flex-col items-center gap-1">
                  <Folder />
                  <span className="text-xs">फाइल्स</span>
                </div>
              </Link>
            </Button>
            <Button variant="ghost" size="sm">
              <div className="flex flex-col items-center gap-1">
                <User />
                <span className="text-xs">प्रोफाइल</span>
              </div>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
