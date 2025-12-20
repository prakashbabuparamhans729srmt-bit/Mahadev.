'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/firebase';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Loader2,
  PlusSquare,
  Eye,
  Folder,
  MessageSquare,
  Edit2,
  Upload,
  CreditCard,
  Ticket,
  User as UserIcon,
  Bell,
  Wallet,
  Loader
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const projects = [
  {
    id: '#1012',
    name: 'ई-कॉमर्स वेबसाइट',
    status: 'पूर्ण',
    statusColor: 'bg-green-500',
    budget: '₹65,000',
    timeline: '5 सप्ताह',
    actions: ['view', 'files']
  },
  {
    id: '#1042',
    name: 'ERP सिस्टम',
    status: 'प्रगति में',
    statusColor: 'bg-yellow-500',
    budget: '₹1,75,000',
    timeline: 'चल रहा (8/12) सप्ताह',
    actions: ['view', 'chat']
  },
  {
    id: '#1067',
    name: 'मोबाइल ऐप',
    status: 'योजना में',
    statusColor: 'bg-blue-500',
    budget: '₹95,000',
    timeline: 'प्रारंभिक',
    actions: ['view', 'edit']
  },
];

const actionIcons: { [key: string]: React.ReactNode } = {
  view: <Eye className="h-4 w-4" />,
  files: <Folder className="h-4 w-4" />,
  chat: <MessageSquare className="h-4 w-4" />,
  edit: <Edit2 className="h-4 w-4" />,
};

const invoices = [
    { id: '#INV-1012', amount: '₹65,000', status: '✅ भुगतान' },
    { id: '#INV-1042', amount: '₹87,500', status: '⏳ 50% भु॰' },
    { id: '#INV-1067', amount: '₹25,000', status: '📅 10 May' },
];

const messages = [
    { from: 'राहुल', text: '"डिज़ाइन अप॰ प्रस्तुत"' },
    { from: 'प्रिया', text: '"क्वेरी का जवाब दिया"' },
    { from: 'समर्थन', text: '"टिकेट #452 हल किया"' },
]

const files = [
    { project: 'प्रोजेक्ट 1012', count: 15 },
    { project: 'प्रोजेक्ट 1042', count: 42 },
    { project: 'साझा', count: 8 },
]


export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
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

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-8 md:py-12 lg:py-16">
        <div className="container space-y-8">
          
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
             <h1 className="font-headline text-3xl md:text-4xl text-primary">
                स्वागत है, {user.displayName || user.email?.split('@')[0] || 'ग्राहक'}!
             </h1>
             <Button onClick={handleLogout} variant="destructive">
                लॉग आउट
              </Button>
          </div>

          {/* My Projects */}
          <section>
              <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold font-headline">📈 मेरे प्रोजेक्ट्स</h2>
                  <Button size="sm"><PlusSquare className="mr-2 h-4 w-4" /> नया प्रोजेक्ट</Button>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map(p => (
                      <Card key={p.id} className="flex flex-col">
                          <CardHeader>
                              <CardTitle className="font-headline">{p.id} - {p.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="flex-1 space-y-3">
                              <div className="flex items-center text-sm">
                                <span className={`mr-2 h-3 w-3 rounded-full ${p.statusColor}`}></span>
                                स्थिति: {p.status}
                              </div>
                              <p className="text-sm">बजट: {p.budget}</p>
                              <p className="text-sm">समय: {p.timeline}</p>
                          </CardContent>
                          <CardFooter className="justify-end gap-2">
                              {p.actions.map(action => (
                                <Button key={action} variant="ghost" size="icon" className="h-8 w-8">
                                    {actionIcons[action]}
                                </Button>
                              ))}
                          </CardFooter>
                      </Card>
                  ))}
              </div>
          </section>

          {/* Summary Cards */}
          <section className="grid gap-6 md:grid-cols-3">
               <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">💰 इनवॉइस</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {invoices.map(inv => (
                            <div key={inv.id} className="text-sm flex justify-between">
                                <span>{inv.id}: {inv.amount}</span>
                                <span className="font-mono">{inv.status}</span>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter>
                        <Button variant="link" className="p-0">सभी देखें</Button>
                    </CardFooter>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">💬 संदेश</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                       {messages.map((msg, i) => (
                            <div key={i} className="text-sm">
                                <span className="font-semibold">{msg.from}:</span> {msg.text}
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter>
                        <Button variant="link" className="p-0">सभी देखें</Button>
                    </CardFooter>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">📁 फाइल्स</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         {files.map((file, i) => (
                            <div key={i} className="text-sm flex justify-between">
                                <span>{file.project}:</span> 
                                <Badge variant="secondary">{file.count} फाइलें</Badge>
                            </div>
                        ))}
                    </CardContent>
                     <CardFooter>
                        <Button variant="link" className="p-0">एक्सप्लोर करें</Button>
                    </CardFooter>
                </Card>
          </section>

          {/* Quick Actions */}
          <section>
                <h2 className="text-2xl font-bold font-headline mb-4">⚙️ त्वरित क्रियाएं:</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <Button variant="outline"><Upload className="mr-2"/> नई फाइल अपलोड</Button>
                    <Button variant="outline"><MessageSquare className="mr-2"/> नया संदेश</Button>
                    <Button variant="outline"><PlusSquare className="mr-2"/> नया प्रोजेक्ट</Button>
                    <Button variant="outline"><CreditCard className="mr-2"/> भुगतान करें</Button>
                    <Button variant="outline"><Ticket className="mr-2"/> सपोर्ट टिकेट</Button>
                    <Button variant="outline"><UserIcon className="mr-2"/> प्रोफाइल</Button>
                </div>
          </section>

        </div>
      </main>
      
      {/* Bottom info bar */}
      <footer className="sticky bottom-0 z-40 w-full border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container h-14 flex items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2"><Bell className="h-4 w-4"/> 3 नई सूचनाएं</div>
                <Separator orientation="vertical" className="h-6" />
                <div className="flex items-center gap-2"><Wallet className="h-4 w-4"/> अगला भुगतान: ₹87,500 (15 मई)</div>
            </div>
             <div className="hidden md:flex items-center gap-2 w-1/4">
                <Loader className="h-4 w-4"/>
                <span className="whitespace-nowrap">प्रोजेक्ट #1042:</span>
                <Progress value={68} className="w-full h-2" />
                <span className="font-mono">68%</span>
            </div>
        </div>
      </footer>
    </div>
  );
}
