'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/firebase';
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
  Loader2,
  PlusSquare,
  Bell,
  LayoutDashboard,
  MessageSquare,
  Folder,
  Settings,
  ArrowRight,
  Calendar,
  Eye,
  CreditCard,
  Ticket,
  User as UserIcon,
  Edit2,
} from 'lucide-react';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { AiScoper } from '@/components/ai-scoper';

function DevPortalHeader() {
  const auth = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/');
    }
  };

  return (
    <header className="flex h-16 items-center border-b bg-card px-6 sticky top-0 z-30">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 font-semibold"
      >
        <Icons.logo className="h-6 w-6 text-primary" />
        <span className="font-headline text-lg">HG Hub</span>
      </Link>
      <div className="ml-auto flex items-center gap-4">
        <span className="text-sm text-muted-foreground">स्वागत है, राजेश!</span>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <Avatar className="h-9 w-9">
          <AvatarImage
            src={user?.photoURL ?? ''}
            alt={user?.displayName ?? 'User'}
          />
          <AvatarFallback>
            {user?.email?.[0]?.toUpperCase() ?? 'A'}
          </AvatarFallback>
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline text-xl">
              📈 मेरे प्रोजेक्ट्स
            </CardTitle>
            <Button size="sm">
              <PlusSquare className="mr-2 h-4 w-4" /> नया
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2 md:grid-cols-3">
              <Card className="p-4">
                <CardHeader className="p-2">
                  <CardTitle className="text-base font-semibold">
                    प्रोजेक्ट #1012
                  </CardTitle>
                  <CardDescription>ई-कॉमर्स वेबसाइट</CardDescription>
                </CardHeader>
                <CardContent className="p-2 text-sm text-muted-foreground">
                  <p>स्थिति: ✅ पूर्ण</p>
                  <p>बजट: ₹65,000</p>
                  <p>समय: 5 सप्ताह</p>
                </CardContent>
                <CardFooter className="flex justify-center gap-2 p-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/project">
                      <Eye />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Folder />
                  </Button>
                </CardFooter>
              </Card>
              <Card className="p-4 border-primary">
                <CardHeader className="p-2">
                  <CardTitle className="text-base font-semibold">
                    प्रोजेक्ट #1042
                  </CardTitle>
                  <CardDescription>ERP सिस्टम</CardDescription>
                </CardHeader>
                <CardContent className="p-2 text-sm text-muted-foreground">
                  <p>स्थिति: 🚧 प्रगति में</p>
                  <p>बजट: ₹1,75,000</p>
                  <p>समय: चल रहा (8/12) सप्ताह</p>
                </CardContent>
                <CardFooter className="flex justify-center gap-2 p-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/project">
                      <Eye />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageSquare />
                  </Button>
                </CardFooter>
              </Card>
              <Card className="p-4">
                <CardHeader className="p-2">
                  <CardTitle className="text-base font-semibold">
                    प्रोजेक्ट #1067
                  </CardTitle>
                  <CardDescription>मोबाइल ऐप</CardDescription>
                </CardHeader>
                <CardContent className="p-2 text-sm text-muted-foreground">
                  <p>स्थिति: 📅 योजना में</p>
                  <p>बजट: ₹95,000</p>
                  <p>समय: प्रारंभिक</p>
                </CardContent>
                <CardFooter className="flex justify-center gap-2 p-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/project">
                      <Eye />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Edit2 />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-lg">
                💰 इनवॉइस
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>#INV-1012: ₹65,000 <Badge variant="secondary" className="bg-green-100 text-green-800">✅ भुगतान</Badge></p>
              <p>#INV-1042: ₹87,500 <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">⏳ 50% भु॰</Badge></p>
              <p>#INV-1067: ₹25,000 <Badge variant="secondary" className="bg-blue-100 text-blue-800">📅 10 May</Badge></p>
              <Button variant="link" className="p-0 h-auto">
                सभी देखें <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-lg">💬 संदेश</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                <p>राहुल: "डिज़ाइन अप॰ प्रस्तुत"</p>
                <p>प्रिया: "क्वेरी का जवाब दिया"</p>
                <p>समर्थन: "टिकेट #452 हल किया"</p>
              <Button variant="link" className="p-0 h-auto">
                सभी देखें <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-lg">📁 फाइल्स</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                <p>प्रोजेक्ट 1012: 15 फाइलें</p>
                <p>प्रोजेक्ट 1042: 42 फाइलें</p>
                <p>साझा: 8 फाइलें</p>
              <Button variant="link" className="p-0 h-auto">
                एक्सप्लोर <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <AiScoper />

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-lg">
              ⚙️ त्वरित क्रियाएं
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            <Button variant="outline">
              <Folder className="mr-2 h-4 w-4" /> नई फाइल अपलोड
            </Button>
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" /> नया संदेश
            </Button>
            <Button variant="outline">
              <PlusSquare className="mr-2 h-4 w-4" /> नया प्रोजेक्ट
            </Button>
            <Button variant="outline">
              <CreditCard className="mr-2 h-4 w-4" /> भुगतान करें
            </Button>
            <Button variant="outline">
              <Ticket className="mr-2 h-4 w-4" /> सपोर्ट टिकेट
            </Button>
            <Button variant="outline">
              <UserIcon className="mr-2 h-4 w-4" /> प्रोफाइल
            </Button>
          </CardContent>
        </Card>
      </main>
      <footer className="sticky bottom-0 z-40 mt-auto w-full border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-14 items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>🔔 3 नई सूचनाएं</p>
          <p>💰 अगला भुगतान: ₹87,500 (15 मई)</p>
          <div className="flex items-center gap-2">
            <p>⏳ प्रोजेक्ट #1042:</p>
            <Progress value={68} className="w-24 h-2" />
            <span>68%</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

    