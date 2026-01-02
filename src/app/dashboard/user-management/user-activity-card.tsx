
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
  LogIn,
  FileUp,
  MessageSquare,
  DollarSign
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const mockActivity = [
    { icon: <LogIn className="h-4 w-4 text-green-500"/>, text: 'डैशबोर्ड में लॉग इन किया', time: '2 घंटे पहले' },
    { icon: <FileUp className="h-4 w-4 text-blue-500"/>, text: '"final-logo.png" अपलोड किया', time: '1 दिन पहले' },
    { icon: <MessageSquare className="h-4 w-4 text-purple-500"/>, text: 'प्रोजेक्ट मैनेजर को एक संदेश भेजा', time: '1 दिन पहले' },
    { icon: <DollarSign className="h-4 w-4 text-yellow-500"/>, text: 'चालान INV-003 का भुगतान किया', time: '3 दिन पहले' },
    { icon: <LogIn className="h-4 w-4 text-green-500"/>, text: 'डैशबोर्ड में लॉग इन किया', time: '4 दिन पहले' },
];

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
            {mockActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-1">{activity.icon}</div>
                <div className="flex-1">
                  <p className="text-sm">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

    