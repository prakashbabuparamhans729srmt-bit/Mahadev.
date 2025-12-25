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
    },
    {
      id: 'performance',
      name: 'प्रदर्शन',
      icon: <BarChart className="h-5 w-5 text-blue-500" />,
      total: 2,
    },
    {
      id: 'functional',
      name: 'कार्यात्मक',
      icon: <Sparkles className="h-5 w-5 text-purple-500" />,
      total: 3,
    },
    {
      id: 'advertising',
      name: 'विज्ञापन',
      icon: <Megaphone className="h-5 w-5 text-orange-500" />,
      total: 2,
    },
];


const cookieLifetimeData = [
  {
    name: 'session_id',
    duration: 'सत्र',
    expires: 'लॉगआउट पर',
  },
  {
    name: 'analytics_track',
    duration: '30 दिन',
    expires: '25/05/2024',
  },
  {
    name: 'chat_support',
    duration: '7 दिन',
    expires: '28/04/2024',
  },
  {
    name: 'targeted_ads',
    duration: '90 दिन',
    expires: '20/07/2024',
  },
];

export default function CookieStatusPage() {
  const { toast } = useToast();
  const { preferences } = useCookieConsent();

  const activeCookiesData = {
      categories: categoryConfig.map(cat => {
          const key = cat.id as keyof typeof preferences;
          // For necessary cookies, we can assume all are active. For others, 1 if enabled.
          const activeCount = key === 'necessary' ? cat.total : preferences[key] ? 1 : 0;
          return {
              ...cat,
              active: activeCount,
          };
      })
  };
  
  const totalActive = activeCookiesData.categories.reduce((acc, cat) => acc + cat.active, 0);
  const totalCookies = activeCookiesData.categories.reduce((acc, cat) => acc + cat.total, 0);
  const overallProgress = totalCookies > 0 ? (totalActive / totalCookies) * 100 : 0;


  const handleAction = (message: string) => {
    toast({
      description: message,
    });
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1.5">
            <CardTitle className="font-headline text-2xl flex items-center gap-3">
              <Cookie className="h-6 w-6 text-primary" />
              कुकीज़ स्थिति डैशबोर्ड
            </CardTitle>
            <CardDescription>
              आपकी साइट पर सक्रिय कुकीज़ का रियल-टाइम ओवरव्यू।
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            रीफ्रेश
          </Button>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <Card className="bg-secondary/30">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <BarChart className="mr-2" />
                सक्रिय कुकीज़: {totalActive}/{totalCookies}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={overallProgress} className="mb-4 h-3" />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>प्रकार</TableHead>
                    <TableHead className="text-center">सक्रिय/कुल</TableHead>
                    <TableHead className="text-right">प्रतिशत</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeCookiesData.categories.map((cat) => (
                    <TableRow key={cat.name}>
                      <TableCell className="font-medium flex items-center gap-2">
                        {cat.icon}
                        {cat.name}
                      </TableCell>
                      <TableCell className="text-center">
                        {cat.active}/{cat.total}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {((cat.active / cat.total) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="bg-secondary/30">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">⏱️ कुकीज़ जीवनकाल</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>कुकी</TableHead>
                    <TableHead>अवधि</TableHead>
                    <TableHead className="text-right">समाप्ति</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cookieLifetimeData.map((cookie) => (
                    <TableRow key={cookie.name}>
                      <TableCell className="font-medium">{cookie.name}</TableCell>
                      <TableCell>{cookie.duration}</TableCell>
                      <TableCell className="text-right">{cookie.expires}</TableCell>
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
            सेटिंग्स निर्यात करें
          </Button>
          <Button
            variant="outline"
            onClick={() => handleAction('स्वचालित नवीनीकरण सक्षम/अक्षम किया गया।')}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            स्वचालित नवीनीकरण
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
