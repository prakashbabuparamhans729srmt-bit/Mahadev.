
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  Activity,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function UserActivityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Activity />ग्राहक गतिविधि</CardTitle>
        <CardDescription>ग्राहक की हाल की गतिविधियाँ।</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48 pr-4">
          <div className="space-y-4">
             <div className="text-center text-sm text-muted-foreground pt-10">
                कोई हाल की गतिविधि नहीं।
             </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
    
