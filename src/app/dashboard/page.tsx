'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Users,
  Briefcase,
  IndianRupee,
  TrendingUp,
  TriangleAlert,
  HeartPulse,
  Activity,
  ShieldAlert,
  Bell,
  RefreshCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const overviewStats = [
  { title: 'सक्रिय यूज़र्स', value: '1,248', change: '80% सक्रिय', icon: <Users className="h-5 w-5 text-muted-foreground" /> },
  { title: 'एक्टिव प्रोजेक्ट्स', value: '45', change: '60% क्षमता पर', icon: <Briefcase className="h-5 w-5 text-muted-foreground" /> },
  { title: 'आज की कमाई', value: '₹2,87,500', change: '▲ 12.5% कल से', changeColor: 'text-green-500', icon: <IndianRupee className="h-5 w-5 text-muted-foreground" /> },
  { title: 'मासिक रेवेन्यू', value: '₹45.2 लाख', change: '▲ 18% पिछले महीने से', changeColor: 'text-green-500', icon: <TrendingUp className="h-5 w-5 text-muted-foreground" /> },
  { title: 'पेंडिंग इश्यूज', value: '8', change: '2 महत्वपूर्ण', changeColor: 'text-yellow-500', icon: <TriangleAlert className="h-5 w-5 text-muted-foreground" /> },
  { title: 'सिस्टम हेल्थ', value: '98%', change: 'सभी सिस्टम ऑनलाइन', changeColor: 'text-green-500', icon: <HeartPulse className="h-5 w-5 text-muted-foreground" /> },
];

const bottomCards = [
    { title: 'क्रिटिकल अलर्ट्स', icon: <ShieldAlert className="text-red-500"/>, content: 'प्रोजेक्ट #1042 डेडलाइन आज है।', },
    { title: 'आज की एक्टिविटी', icon: <Activity className="text-blue-500"/>, content: '09:30 - प्रिया ने नई फाइल अपलोड की।', },
    { title: 'रीसेंट एक्शंस', icon: <RefreshCcw className="text-green-500"/>, content: 'admin ने 2 नए यूज़र्स जोड़े।', },
]

export default function AdminDashboard() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold font-headline">
          मास्टर एडमिन पैनल
        </h1>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-lg">सिस्टम ओवरव्यू</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {overviewStats.map((stat) => (
              <Card key={stat.title} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  {stat.icon}
                </div>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className={`text-xs ${stat.changeColor || 'text-muted-foreground'}`}>{stat.change}</p>
              </Card>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {bottomCards.map(card => (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                    {card.icon} {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-md text-muted-foreground">{card.content}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
