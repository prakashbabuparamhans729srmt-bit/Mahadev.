
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Bell,
  Plus,
  BarChart,
  Code,
  Layers,
  Database,
  TestTube,
  Eye,
  Calendar,
  MessageSquare,
  Wand2,
  Download,
  Mail,
  Pencil,
  RefreshCw,
  Folder,
  Smartphone,
  Laptop,
  Paintbrush,
  Camera,
  Vr,
  Settings,
  Menu,
} from 'lucide-react';
import { useUser } from '@/firebase';
import { AiScoper } from '@/components/ai-scoper';


const projects = [
  {
    name: 'ई-कॉमर्स',
    icon: <Smartphone className="h-6 w-6 text-purple-500" />,
    progress: 75,
    color: 'purple',
  },
  {
    name: 'वेब स्टोर',
    icon: <Folder className="h-6 w-6 text-blue-500" />,
    progress: 40,
    color: 'blue',
  },
  {
    name: 'ERP सिस्टम',
    icon: <Laptop className="h-6 w-6 text-green-500" />,
    progress: 90,
    color: 'green',
  },
  {
    name: 'डेटा विज़ुअल',
    icon: <BarChart className="h-6 w-6 text-yellow-500" />,
    progress: 25,
    color: 'yellow',
  },
  {
    name: 'कॉरपोरेट',
    icon: <Folder className="h-6 w-6 text-red-500" />,
    progress: 60,
    color: 'red',
  },
];

const chat = [
    { name: 'राहुल', message: 'डिज़ाइन अपडेट कब आएगा?' },
    { name: 'प्रिया', message: 'फाइनल प्रूफ अपलोड कर दिया है' }
]

const upcoming = [
    { date: '20/04', time: '11:00 AM', event: 'क्लाइंट मीटिंग'},
    { date: '22/04', time: '3:00 PM', event: 'कोड रिव्यू'}
]

export default function DevPortalDashboard() {
  const { user } = useUser();

  const totalProgress = useMemo(() => {
    const total = projects.reduce((acc, p) => acc + p.progress, 0);
    return Math.round(total / projects.length);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-sm">
      <main className="flex-1 space-y-6 p-6">
        <div className='flex justify-between items-center'>
             <h1 className="text-2xl font-bold font-headline">
                🏢 डैशबोर्ड
            </h1>
            <p className="text-muted-foreground text-sm">
                नमस्ते, {user?.displayName ?? 'ग्राहक'}!
            </p>
        </div>
       
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline text-lg">
              🎯 सक्रिय प्रोजेक्ट्स
            </CardTitle>
            <Button size="sm" variant="outline">
              <Plus className="mr-2 h-4 w-4" /> नया
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-3 md:grid-cols-5">
              {projects.map((p) => (
                <Link href="/dashboard/project" key={p.name}>
                  <Card className="flex flex-col items-center justify-center p-4 transition-all hover:shadow-md hover:-translate-y-1">
                    {p.icon}
                    <p className="mt-2 text-sm font-semibold">{p.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{p.progress}%</p>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-1 flex flex-col gap-6">
            <AiScoper />
             <Card>
                 <CardHeader>
                    <CardTitle className="font-headline text-base flex items-center">🎨 डिज़ाइन प्रीव्यू</CardTitle>
                 </CardHeader>
                 <CardContent className="flex flex-col items-center gap-4">
                    <div className="w-full aspect-square bg-secondary rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">3D मोड प्रीव्यू</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 w-full">
                        <Button variant="outline" size="sm"><Smartphone className="h-4 w-4"/> मोबाइल</Button>
                        <Button variant="outline" size="sm"><Laptop className="h-4 w-4"/> डेस्कटॉप</Button>
                        <Button variant="outline" size="sm"><Vr className="h-4 w-4"/> AR देखें</Button>
                    </div>
                 </CardContent>
             </Card>
          </div>
          <div className="md:col-span-2 flex flex-col gap-6">
             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-base flex items-center">💬 ताजा चैट</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {chat.map(c => (
                            <div key={c.name}>
                                <p className="font-semibold text-sm">👤 {c.name}:</p>
                                <p className="text-xs text-muted-foreground">"{c.message}"</p>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter>
                        <Button variant="link" size="sm" className="p-0">💬 सभी देखें</Button>
                    </CardFooter>
                 </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-base flex items-center">📅 अपकमिंग</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {upcoming.map(u => (
                            <div key={u.event}>
                                <p className="font-semibold text-sm">🗓️ {u.date}:</p>
                                <p className="text-xs text-muted-foreground">{u.event} @ {u.time}</p>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter>
                        <Button variant="link" size="sm" className="p-0">📅 कैलेंडर</Button>
                    </CardFooter>
                 </Card>
             </div>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-base flex items-center">🔄 रियल-टाइम कोड ट्रैकर</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="font-semibold">प्रोजेक्ट: "ग्लोबल ई-कॉमर्स"</span>
                                <span className="text-muted-foreground">{totalProgress}%</span>
                            </div>
                            <Progress value={totalProgress} />
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
                             <div>
                                <p>फ्रंटएंड</p>
                                <Progress value={80} className="h-2 mt-1" />
                             </div>
                             <div>
                                <p>बैकएंड</p>
                                <Progress value={90} className="h-2 mt-1" />
                             </div>
                             <div>
                                <p>डेटाबेस</p>
                                <Progress value={70} className="h-2 mt-1" />
                             </div>
                             <div>
                                <p>टेस्टिंग</p>
                                <Progress value={40} className="h-2 mt-1" />
                             </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" size="sm"><Eye className="mr-2 h-4 w-4"/> लाइव कोड देखें</Button>
                    <Button variant="outline" size="sm" className="ml-2"><BarChart className="mr-2 h-4 w-4"/> विस्तृत रिपोर्ट</Button>
                </CardFooter>
             </Card>
          </div>
        </div>
      </main>
      
       <footer className="sticky bottom-0 z-40 w-full border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container h-14 flex items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>🔔 नई सूचना: "प्रोजेक्ट #1042 का डिज़ाइन स्वीकृत"</p>
             <Button variant="ghost" size="sm">[3 नई]</Button>
        </div>
      </footer>
    </div>
  );
}
