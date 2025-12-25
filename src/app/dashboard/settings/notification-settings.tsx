'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Bell, Mail, Smartphone } from 'lucide-react';

const notificationTypes = [
  { id: 'new-messages', label: 'नए संदेश', description: 'जब कोई आपको संदेश भेजता है।' },
  { id: 'project-updates', label: 'प्रोजेक्ट अपडेट', description: 'महत्वपूर्ण प्रोजेक्ट मील के पत्थर और स्थिति परिवर्तन।' },
  { id: 'file-uploads', label: 'फ़ाइल अपलोड', description: 'जब कोई नई फ़ाइल प्रोजेक्ट में जोड़ी जाती है।' },
  { id: 'invoices', label: 'चालान और भुगतान', description: 'नए चालान और भुगतान की पुष्टि।' },
  { id: 'promotions', label: 'प्रचार और घोषणाएँ', description: 'Hajaro Grahako से विशेष ऑफ़र और समाचार।' },
];

export function NotificationSettings() {
  const { toast } = useToast();

  const handleAction = (message: string) => {
    toast({
      title: "सेटिंग्स अपडेट की गईं",
      description: message,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>नोटिफिकेशन चैनल</CardTitle>
          <CardDescription>
            आप सूचनाएं कैसे प्राप्त करना चाहते हैं, यह चुनें।
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg">
            <Mail className="h-6 w-6 text-primary" />
            <div className="flex-1">
              <h3 className="font-semibold">ईमेल नोटिफिकेशन्स</h3>
              <p className="text-sm text-muted-foreground">
                आपके पंजीकृत ईमेल पर अपडेट प्राप्त करें।
              </p>
            </div>
            <Switch defaultChecked onCheckedChange={(checked) => handleAction(`ईमेल नोटिफिकेशन्स ${checked ? 'चालू' : 'बंद'} की गईं।`)} />
          </div>
          <div className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg">
            <Smartphone className="h-6 w-6 text-primary" />
            <div className="flex-1">
              <h3 className="font-semibold">पुश नोटिफिकेशन्स</h3>
              <p className="text-sm text-muted-foreground">
                अपने डिवाइस पर रीयल-टाइम अलर्ट प्राप्त करें।
              </p>
            </div>
            <Switch onCheckedChange={(checked) => handleAction(`पुश नोटिफिकेशन्स ${checked ? 'चालू' : 'बंद'} की गईं।`)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>विस्तृत नोटिफिकेशन्स</CardTitle>
          <CardDescription>
            चुनें कि आपको किस प्रकार के अपडेट प्राप्त करने हैं।
          </CardDescription>
        </CardHeader>
        <CardContent className="divide-y divide-border">
          {notificationTypes.map((type) => (
            <div key={type.id} className="flex items-center justify-between py-4">
              <div>
                <h4 className="font-medium">{type.label}</h4>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
              <Switch defaultChecked onCheckedChange={(checked) => handleAction(`"${type.label}" के लिए नोटिफिकेशन्स ${checked ? 'सक्षम' : 'अक्षम'} की गईं।`)} />
            </div>
          ))}
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
            <Button onClick={() => handleAction('सभी नोटिफिकेशन सेटिंग्स सहेज ली गई हैं।')}>
                सेटिंग्स सहेजें
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
