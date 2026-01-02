
'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Settings,
  Shield,
  Bell,
  Download,
  Upload,
  HardDrive,
  Database,
  CheckCircle,
  Loader2,
  Server,
  KeyRound
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function AdminSettingsPage() {
  const { toast } = useToast();

  const handleAction = (description: string) => {
    toast({
      title: 'सुविधा जल्द ही उपलब्ध होगी',
      description: description,
    });
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
                <Settings className="h-7 w-7 text-primary"/>
                एडमिन सेटिंग्स
              </h1>
              <p className="text-muted-foreground">
                संपूर्ण एप्लिकेशन और एडमिन पैनल को कॉन्फ़िगर करें।
              </p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* System Status Card */}
            <div className="lg:col-span-1">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Server />सिस्टम स्वास्थ्य</CardTitle>
                        <CardDescription>मुख्य सेवाओं की रीयल-टाइम स्थिति।</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2"><HardDrive /> Frontend Hosting</span>
                            <span className="flex items-center gap-2 text-green-500"><CheckCircle className="h-4 w-4" /> संचालित</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2"><Database /> Firestore Database</span>
                            <span className="flex items-center gap-2 text-green-500"><CheckCircle className="h-4 w-4" /> संचालित</span>
                        </div>
                         <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2"><Server /> Backend Functions</span>
                            <span className="flex items-center gap-2 text-green-500"><CheckCircle className="h-4 w-4" /> संचालित</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">स्थिति पेज देखें</Button>
                    </CardFooter>
                </Card>
            </div>

            {/* Main Settings Area */}
            <div className="lg:col-span-2 space-y-6">
                {/* Data Management Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Download />डेटा प्रबंधन</CardTitle>
                        <CardDescription>एप्लिकेशन डेटा का बैकअप लें और उसे निर्यात करें।</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4">
                        <Button variant="outline" onClick={() => handleAction('ग्राहक डेटा CSV में निर्यात किया जाएगा।')}>
                            <Download className="mr-2 h-4 w-4" /> ग्राहक डेटा निर्यात करें
                        </Button>
                         <Button variant="outline" onClick={() => handleAction('प्रोजेक्ट डेटा CSV में निर्यात किया जाएगा।')}>
                            <Download className="mr-2 h-4 w-4" /> प्रोजेक्ट डेटा निर्यात करें
                        </Button>
                        <Button variant="outline" disabled>
                            <Upload className="mr-2 h-4 w-4" /> डेटा आयात करें
                        </Button>
                    </CardContent>
                </Card>

                 {/* Notifications Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Bell />एडमिन सूचनाएं</CardTitle>
                        <CardDescription>चुनें कि महत्वपूर्ण सिस्टम अलर्ट कहाँ भेजे जाएं।</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                            <Label htmlFor="admin-email-notifications" className="font-normal">नए ग्राहक साइन-अप पर ईमेल भेजें</Label>
                            <Switch id="admin-email-notifications" onCheckedChange={(checked) => handleAction(`ईमेल सूचनाएं ${checked ? 'सक्षम' : 'अक्षम'} की गईं।`)} />
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="admin-email">सूचना ईमेल</Label>
                             <Input id="admin-email" defaultValue="admin@hajarograhako.com" />
                        </div>
                    </CardContent>
                </Card>

                {/* Security Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Shield />एक्सेस कंट्रोल</CardTitle>
                        <CardDescription>एडमिन पैनल की सुरक्षा सेटिंग्स प्रबंधित करें।</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                            <Label htmlFor="mfa-all-users" className="font-normal">सभी ग्राहकों के लिए 2FA अनिवार्य करें</Label>
                            <Switch id="mfa-all-users" onCheckedChange={(checked) => handleAction(`सभी के लिए 2FA ${checked ? 'अनिवार्य' : 'वैकल्पिक'} किया गया।`)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ip-whitelist">IP व्हाइटलिस्ट (कॉमा से अलग करें)</Label>
                            <Input id="ip-whitelist" placeholder="203.0.113.1, 198.51.100.5" />
                        </div>
                    </CardContent>
                     <CardFooter className="border-t pt-4">
                        <Button>सुरक्षा सेटिंग्स सहेजें</Button>
                    </CardFooter>
                </Card>
            </div>

        </div>
    </div>
  );
}
