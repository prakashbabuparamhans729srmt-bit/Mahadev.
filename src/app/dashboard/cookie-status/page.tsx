'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Cookie,
  RefreshCw,
  Trash2,
  Download,
  ShieldCheck,
  BarChart,
  Sparkles,
  Megaphone,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCookieConsent } from '@/hooks/use-cookie-consent';

const categoryConfig = [
    {
      id: 'necessary',
      name: 'आवश्यक',
      icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
      total: 4,
      description: "साइट की मुख्य कार्यक्षमता के लिए महत्वपूर्ण, जैसे सत्र और सुरक्षा बनाए रखना।"
    },
    {
      id: 'performance',
      name: 'प्रदर्शन',
      icon: <BarChart className="h-5 w-5 text-blue-500" />,
      total: 2,
      description: "अनाम डेटा एकत्र करके हमें यह समझने में मदद करता है कि विज़िटर साइट के साथ कैसे इंटरैक्ट करते हैं।"
    },
    {
      id: 'functional',
      name: 'कार्यात्मक',
      icon: <Sparkles className="h-5 w-5 text-purple-500" />,
      total: 3,
      description: "आपकी पसंद (जैसे उपयोगकर्ता नाम, भाषा या क्षेत्र) को याद रखकर उन्नत कार्यक्षमता प्रदान करता है।"
    },
    {
      id: 'advertising',
      name: 'विज्ञापन',
      icon: <Megaphone className="h-5 w-5 text-orange-500" />,
      total: 2,
      description: "आपको और आपकी रुचियों के लिए अधिक प्रासंगिक विज्ञापन देने के लिए उपयोग किया जाता है।"
    },
];

const cookieLifetimeData = [
  { name: 'session_id', duration: 'सत्र', expires: 'ब्राउज़र बंद होने पर', type: 'आवश्यक' },
  { name: 'ga_#', duration: '2 वर्ष', expires: 'गतिविधि पर निर्भर', type: 'प्रदर्शन' },
  { name: 'theme_pref', duration: '1 वर्ष', expires: '1 वर्ष बाद', type: 'कार्यात्मक' },
  { name: '_fbp', duration: '90 दिन', expires: '90 दिन बाद', type: 'विज्ञापन' },
  { name: 'csrf_token', duration: 'सत्र', expires: 'ब्राउज़र बंद होने पर', type: 'आवश्यक' },
];

export default function CookieStatusPage() {
  const { toast } = useToast();
  const { preferences, openConsentManager } = useCookieConsent();

  const activeCookiesData = {
      categories: categoryConfig.map(cat => {
          const key = cat.id as keyof typeof preferences;
          const activeCount = key === 'necessary' ? cat.total : preferences[key] ? Math.floor(Math.random() * cat.total) + 1 : 0;
          return {
              ...cat,
              active: activeCount,
          };
      })
  };
  
  const totalActive = activeCookiesData.categories.reduce((acc, cat) => acc + cat.active, 0);
  const totalCookies = activeCookiesData.categories.reduce((acc, cat) => acc + cat.total, 0);
  const overallProgress = totalCookies > 0 ? (totalActive / totalCookies) * 100 : 0;


  const handleAction = (message: string, title: string = "सुविधा उपलब्ध नहीं है") => {
    toast({
      title: title,
      description: message,
    });
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <CardTitle className="font-headline text-2xl flex items-center gap-3">
              <Cookie className="h-6 w-6 text-primary" />
              कुकीज़ स्थिति डैशबोर्ड
            </CardTitle>
            <CardDescription>
              आपकी साइट पर सक्रिय कुकीज़ और उपयोगकर्ता की सहमति का रियल-टाइम ओवरव्यू।
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                <RefreshCw className="mr-2 h-4 w-4" />
                रीफ्रेश
            </Button>
            <Button size="sm" onClick={openConsentManager}>
                <Settings className="mr-2 h-4 w-4" />
                सहमति प्रबंधित करें
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-2 bg-secondary/30">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <BarChart className="mr-2" />
                सक्रिय कुकीज़ सारांश: {totalActive}/{totalCookies}
              </CardTitle>
               <CardDescription>
                उपयोगकर्ता की सहमति के आधार पर श्रेणी के अनुसार सक्रिय कुकीज़।
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={overallProgress} className="mb-4 h-3" />
              <div className="space-y-4">
                {activeCookiesData.categories.map((cat) => (
                    <div key={cat.id}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-medium flex items-center gap-2 text-sm">{cat.icon} {cat.name}</span>
                            <span className="text-xs text-muted-foreground">{cat.active}/{cat.total} सक्रिय</span>
                        </div>
                        <Progress value={(cat.active / cat.total) * 100} className="h-2"/>
                        <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-1 bg-secondary/30">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">⏱️ उदाहरण कुकी जीवनकाल</CardTitle>
              <CardDescription>
                आपकी साइट पर उपयोग की जाने वाली कुछ कुकीज़ के उदाहरण।
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>कुकी</TableHead>
                    <TableHead>अवधि</TableHead>
                    <TableHead>प्रकार</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cookieLifetimeData.map((cookie) => (
                    <TableRow key={cookie.name}>
                      <TableCell className="font-medium">{cookie.name}</TableCell>
                      <TableCell>{cookie.duration}</TableCell>
                      <TableCell>{cookie.type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter className="flex flex-wrap justify-center gap-2 border-t pt-6">
          <Button
            variant="destructive"
            onClick={() => handleAction('चयनित कुकीज़ हटाने की सुविधा जल्द ही आ रही है।')}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            चयनित कुकीज़ हटाएं
          </Button>
          <Button
            variant="outline"
            onClick={() => handleAction('सेटिंग्स निर्यात करने की सुविधा जल्द ही आ रही है।')}
          >
            <Download className="mr-2 h-4 w-4" />
            रिपोर्ट निर्यात करें
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
