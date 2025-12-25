'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Bell, Mail, Smartphone } from 'lucide-react';
import { useNotificationSettings, type NotificationPreferences } from '@/hooks/use-notification-settings';

const notificationTypes: { id: keyof NotificationPreferences['detailed']; label: string; description: string }[] = [
  { id: 'newMessages', label: 'नए संदेश', description: 'जब कोई आपको संदेश भेजता है।' },
  { id: 'projectUpdates', label: 'प्रोजेक्ट अपडेट', description: 'महत्वपूर्ण प्रोजेक्ट मील के पत्थर और स्थिति परिवर्तन।' },
  { id: 'fileUploads', label: 'फ़ाइल अपलोड', description: 'जब कोई नई फ़ाइल प्रोजेक्ट में जोड़ी जाती है।' },
  { id: 'invoices', label: 'चालान और भुगतान', description: 'नए चालान और भुगतान की पुष्टि।' },
  { id: 'promotions', label: 'प्रचार और घोषणाएँ', description: 'Hajaro Grahako से विशेष ऑफ़र और समाचार।' },
];

export function NotificationSettings() {
  const { toast } = useToast();
  const { preferences, setPreference, savePreferences } = useNotificationSettings();

  const handleSave = () => {
    savePreferences();
    toast({
      title: "सेटिंग्स सहेजी गईं",
      description: "आपकी नोटिफिकेशन प्राथमिकताएँ सफलतापूर्वक अपडेट हो गई हैं।",
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
            <Switch
              checked={preferences.channels.email}
              onCheckedChange={(checked) => setPreference('channels', 'email', checked)}
            />
          </div>
          <div className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg">
            <Smartphone className="h-6 w-6 text-primary" />
            <div className="flex-1">
              <h3 className="font-semibold">पुश नोटिफिकेशन्स</h3>
              <p className="text-sm text-muted-foreground">
                अपने डिवाइस पर रीयल-टाइम अलर्ट प्राप्त करें।
              </p>
            </div>
            <Switch
              checked={preferences.channels.push}
              onCheckedChange={(checked) => setPreference('channels', 'push', checked)}
            />
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
              <Switch
                checked={preferences.detailed[type.id]}
                onCheckedChange={(checked) => setPreference('detailed', type.id, checked)}
              />
            </div>
          ))}
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
            <Button onClick={handleSave}>
                सेटिंग्स सहेजें
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
