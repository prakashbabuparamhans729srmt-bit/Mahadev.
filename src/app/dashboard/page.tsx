'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/firebase';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Loader2,
  PlusSquare,
  Bell,
  LayoutDashboard,
  Search,
  MessageSquare,
  Folder,
  Settings,
  ArrowRight,
  Calendar,
  Eye,
  BarChart2,
  RefreshCw,
  Cpu,
  Monitor,
  Smartphone,
  Layers3d,
} from 'lucide-react';
import { Icons } from '@/components/icons';

const activeProjects = [
  { name: 'ई-कॉमर्स', progress: 75, icon: <Smartphone /> },
  { name: 'वेब स्टोर', progress: 40, icon: <Monitor /> },
  { name: 'ERP सिस्टम', progress: 90, icon: <Cpu /> },
  { name: 'डेटा विज़ुअल', progress: 25, icon: <BarChart2 /> },
  { name: 'कॉरपोरेट', progress: 60, icon: <Monitor /> },
];

const recentChats = [
    { name: 'राहुल', text: 'डिज़ाइन अपडेट कब आएगा?', time: '5 मिनट पहले' },
    { name: 'प्रिया', text: 'फाइनल प्रूफ अपलोड कर दिया है।', time: '1 घंटा पहले' }
]

const upcomingEvents = [
    { date: '20/04', title: 'क्लाइंट मीटिंग', time: '11:00 AM' },
    { date: '22/04', title: 'कोड रिव्यू', time: '3:00 PM' }
]


function DevPortalHeader() {
  const auth = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <header className="flex h-16 items-center border-b bg-card px-6">
      <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
        <Icons.logo className="h-6 w-6 text-primary" />
        <span className="font-headline text-lg">Hajaro Grahako</span>
      </Link>
      <nav className="ml-10 hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-foreground transition-colors hover:text-foreground/80"
        >
          <LayoutDashboard className="h-5 w-5" />
          डैशबोर्ड
        </Link>
        <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          प्रोजेक्ट्स
        </Link>
        <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          चैट
        </Link>
        <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          फाइल्स
        </Link>
        <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          सेटिंग्स
        </Link>
      </nav>
      <div className="ml-auto flex items-center gap-4">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="खोजें..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-background"
            />
          </div>
        </form>
         <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        <Avatar className="h-9 w-9">
          <AvatarImage src={user?.photoURL ?? ''} alt={user?.displayName ?? 'User'} />
          <AvatarFallback>{user?.email?.[0]?.toUpperCase() ?? 'A'}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}


export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <DevPortalHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {/* Top Section: Active Projects */}
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-headline">सक्रिय प्रोजेक्ट्स</CardTitle>
                <Button size="sm"><PlusSquare className="mr-2 h-4 w-4" /> नया</Button>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
                    {activeProjects.map(p => (
                        <div key={p.name} className="flex flex-col items-center gap-2">
                             <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-primary">
                                {p.icon}
                            </div>
                            <span className="font-semibold text-sm">{p.name}</span>
                            <Progress value={p.progress} className="h-2 w-full" />
                            <span className="text-xs text-muted-foreground">{p.progress}%</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {/* AI Project Scoper */}
          <Card className="lg:col-span-1">
             <CardHeader>
                <CardTitle className="font-headline text-lg">AI प्रोजेक्ट स्कोपर</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">प्रोजेक्ट टाइप:</label>
                     <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="एक प्रकार चुनें" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="website">वेबसाइट</SelectItem>
                            <SelectItem value="mobile">मोबाइल ऐप</SelectItem>
                            <SelectItem value="webapp">वेब ऐप</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium">बजट रेंज:</label>
                     <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="एक रेंज चुनें" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="low">₹15K - ₹50K</SelectItem>
                            <SelectItem value="medium">₹50K - ₹2L</SelectItem>
                            <SelectItem value="high">₹2L+</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Cpu className="mr-2"/> स्कोप जनरेट करें
                </Button>
            </CardContent>
          </Card>

          {/* Recent Chats & Upcoming */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">ताजा चैट</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {recentChats.map(chat => (
                        <div key={chat.name} className="flex items-start gap-3">
                            <Avatar className="h-9 w-9">
                               <AvatarFallback>{chat.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-sm">{chat.name}</p>
                                <p className="text-xs text-muted-foreground truncate">"{chat.text}"</p>
                            </div>
                        </div>
                    ))}
                    <Button variant="link" className="p-0 h-auto">सभी देखें <ArrowRight className="ml-1"/></Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">अपकमिंग</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {upcomingEvents.map(event => (
                        <div key={event.title} className="flex items-center gap-3 text-sm">
                            <div className="flex flex-col items-center">
                                <span className="font-bold">{event.date.split('/')[0]}</span>
                                <span className="text-xs">Apr</span>
                            </div>
                            <div>
                                <p className="font-semibold">{event.title}</p>
                                <p className="text-xs text-muted-foreground">{event.time}</p>
                            </div>
                        </div>
                    ))}
                    <Button variant="link" className="p-0 h-auto">कैलेंडर देखें <Calendar className="ml-1" /></Button>
                </CardContent>
            </Card>
          </div>
          
          {/* Real-time Code Tracker & Design Preview */}
           <div className="lg:col-span-2 space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-lg">रियल-टाइम कोड ट्रैकर</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-semibold">प्रोजेक्ट: "ग्लोबल ई-कॉमर्स"</span>
                                <span>75%</span>
                            </div>
                            <Progress value={75} className="h-3" />
                        </div>
                        <div className="text-xs space-y-2 text-muted-foreground">
                            <p>फ्रंटएंड: 80%</p>
                            <p>बैकएंड: 90%</p>
                            <p>डेटाबेस: 70%</p>
                            <p>टेस्टिंग: 40%</p>
                        </div>
                        <div className="flex gap-2">
                             <Button variant="outline" size="sm"><Eye className="mr-2"/> लाइव कोड देखें</Button>
                             <Button variant="outline" size="sm"><BarChart2 className="mr-2"/> विस्तृत रिपोर्ट</Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-lg">डिज़ाइन प्रीव्यू</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="w-full md:w-1/2 h-48 bg-secondary rounded-lg flex items-center justify-center">
                            <p className="text-muted-foreground">3D मॉडल प्रीव्यू</p>
                        </div>
                        <div className="flex flex-col gap-2">
                             <Button variant="outline" size="sm"><Smartphone className="mr-2"/> मोबाइल</Button>
                             <Button variant="outline" size="sm"><Monitor className="mr-2"/> डेस्कटॉप</Button>
                             <Button variant="outline" size="sm"><Layers3d className="mr-2"/> AR देखें</Button>
                        </div>
                    </CardContent>
                </Card>
           </div>
        </div>
      </main>
       <footer className="sticky bottom-0 z-40 w-full border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container h-14 flex items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>🔔 नई सूचना: "प्रोजेक्ट #1042 का डिज़ाइन स्वीकृत"</p>
             <Button variant="ghost" size="sm">3 नई</Button>
        </div>
      </footer>
    </div>
  );
}
