'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { KeyRound, Smartphone, LogOut, Trash2 } from 'lucide-react';

export function SecuritySettings() {
  const { toast } = useToast();

  const handleAction = (message: string) => {
    toast({
      title: "सुविधा जल्द ही आ रही है",
      description: message,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>पासवर्ड बदलें</CardTitle>
          <CardDescription>
            एक मजबूत पासवर्ड का उपयोग करने की सलाह दी जाती है जिसे आप कहीं और उपयोग नहीं कर रहे हैं।
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">वर्तमान पासवर्ड</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">नया पासवर्ड</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">पासवर्ड की पुष्टि करें</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button onClick={() => handleAction('पासवर्ड बदलने की कार्यक्षमता जल्द ही लागू की जाएगी।')}>पासवर्ड सहेजें</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>टू-फैक्टर ऑथेंटिकेशन (2FA)</CardTitle>
          <CardDescription>
            अपने खाते में सुरक्षा की एक अतिरिक्त परत जोड़ें।
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg">
            <Smartphone className="h-8 w-8 text-primary" />
            <div className="flex-1">
              <h3 className="font-semibold">प्रमाणीकरण ऐप</h3>
              <p className="text-sm text-muted-foreground">Google Authenticator या Authy जैसे ऐप का उपयोग करें।</p>
            </div>
            <Switch onCheckedChange={(checked) => handleAction(checked ? '2FA सक्षम किया जा रहा है...' : '2FA अक्षम किया जा रहा है...')} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>सक्रिय सत्र</CardTitle>
          <CardDescription>ये वे डिवाइस हैं जो वर्तमान में आपके खाते में लॉग इन हैं।</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Chrome on Windows</p>
              <p className="text-sm text-muted-foreground">वर्तमान सत्र</p>
            </div>
            <Button variant="ghost" className="text-primary hover:text-primary">सक्रिय</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Safari on iPhone 15</p>
              <p className="text-sm text-muted-foreground">गुरुग्राम, भारत</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleAction('इस सत्र से लॉग आउट करने की सुविधा जल्द ही आएगी।')}>
              <LogOut className="mr-2 h-4 w-4" />
              लॉग आउट
            </Button>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button variant="outline" onClick={() => handleAction('सभी अन्य सत्रों से लॉग आउट करने की सुविधा जल्द ही आएगी।')}>
            अन्य सभी सत्रों से लॉग आउट करें
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
            <CardTitle className="text-destructive">खाता हटाएं</CardTitle>
            <CardDescription>
                एक बार जब आप अपना खाता हटा देते हैं, तो इसे वापस नहीं लाया जा सकता। कृपया निश्चित रहें।
            </CardDescription>
        </CardHeader>
        <CardFooter className="border-t border-destructive/20 px-6 py-4">
          <Button variant="destructive" onClick={() => handleAction('खाता हटाने की प्रक्रिया जल्द ही लागू की जाएगी।')}>
            <Trash2 className="mr-2 h-4 w-4" />
            मैं अपना खाता हटाना चाहता हूँ
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
