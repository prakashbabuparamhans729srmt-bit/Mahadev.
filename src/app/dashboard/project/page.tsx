'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeft,
  Star,
  User,
  Phone,
  Mail,
  Calendar,
  Plus,
  Paperclip,
  Mic,
  Video,
  ScreenShare,
  Link2,
  FileText,
  Palette,
  Code,
  FlaskConical,
  Eye,
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const project = {
  id: '#1042',
  name: 'स्मार्ट ERP सिस्टम',
  client: {
    name: 'राजेश इंडस्ट्रीज',
    phone: '+91-98XXXXXX21',
    email: 'ra@example.com',
  },
  timeline: {
    start: '01/04/24',
    end: '30/06/24',
  },
  budget: {
    total: 875000,
    spent: 520000,
  },
  health: {
    overall: 68,
    time: 80,
    budget: 50,
    quality: 60,
    satisfaction: 70,
  },
};

const phases = [
    { name: '1. डिस्कवरी', progress: 100, status: 'completed' },
    { name: '2. डिज़ाइन', progress: 80, status: 'inprogress' },
    { name: '3. डेवलपमेंट', progress: 40, status: 'inprogress' },
    { name: '4. टेस्टिंग', progress: 0, status: 'pending' },
]

const team = [
    { name: 'राहुल (TL)', role: 'फ्रंटएंड', avatar: 'R' },
    { name: 'प्रिया', role: 'UI/UX', avatar: 'P' },
    { name: 'अमित', role: 'बैकएंड', avatar: 'A' },
    { name: 'सीमा', role: 'QA', avatar: 'S' },
]

const files = [
    { name: 'SRS.docx', size: '2.4 MB', date: '01/04/24', icon: <FileText className="text-blue-500" /> },
    { name: 'डिज़ाइन.fig', size: '5.7 MB', date: '15/04/24', icon: <Palette className="text-pink-500" /> },
    { name: 'कोड.ज़िप', size: '45.2 MB', date: '20/04/24', icon: <Code className="text-green-500" /> },
]

const chat = [
    { sender: 'राहुल', time: '10:15 AM', message: 'लॉगिन मॉड्यूल पूरा हो गया, रिव्यू के लिए भेज रहा हूं', avatar: 'R' },
    { sender: 'क्लाइंट', time: '10:20 AM', message: 'बढ़िया! क्या मैं लाइव डेमो देख सकता हूं?', avatar: 'C' },
]

export default function ProjectDetailsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-card px-6">
        <div className="flex items-center gap-4">
            <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                    <ArrowLeft />
                </Button>
            </Link>
            <h1 className="text-xl font-bold font-headline">
                प्रोजेक्ट {project.id}: "{project.name}"
            </h1>
        </div>
        <Button variant="ghost" size="icon">
            <Star />
        </Button>
      </header>

      <main className="flex-1 space-y-6 p-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg">🏆 प्रोजेक्ट ओवरव्यू</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-4 bg-secondary/50">
                        <h3 className="font-semibold flex items-center"><User className="mr-2 h-4 w-4"/>क्लाइंट</h3>
                        <p className="font-bold">{project.client.name}</p>
                        <p className="text-sm text-muted-foreground">{project.client.phone}</p>
                        <p className="text-sm text-muted-foreground">{project.client.email}</p>
                    </Card>
                     <Card className="p-4 bg-secondary/50">
                        <h3 className="font-semibold flex items-center"><Calendar className="mr-2 h-4 w-4"/>टाइमलाइन</h3>
                        <p className="text-sm text-muted-foreground">प्रारंभ: {project.timeline.start}</p>
                        <p className="text-sm text-muted-foreground">समाप्ति: {project.timeline.end}</p>
                    </Card>
                     <Card className="p-4 bg-secondary/50">
                        <h3 className="font-semibold">💰 बजट</h3>
                        <p className="font-bold text-primary">₹{project.budget.total.toLocaleString('en-IN')}</p>
                        <p className="text-sm text-muted-foreground">खर्च: ₹{project.budget.spent.toLocaleString('en-IN')}</p>
                        <p className="text-sm text-green-600">शेष: ₹{(project.budget.total - project.budget.spent).toLocaleString('en-IN')}</p>
                    </Card>
                </div>
                <div>
                    <label className="text-sm font-medium">प्रोजेक्ट हेल्थ स्कोर:</label>
                    <Progress value={project.health.overall} className="h-4 my-2" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-muted-foreground">
                        <span>समय: {project.health.time}%</span>
                        <span>बजट: {project.health.budget}%</span>
                        <span>गुणवत्ता: {project.health.quality}%</span>
                        <span>संतुष्टि: {project.health.satisfaction}%</span>
                    </div>
                </div>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">📋 चरण</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {phases.map(p => (
                         <div key={p.name}>
                            <label className="text-sm">{p.name}</label>
                            <Progress value={p.progress} />
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                        <ChevronRight className="mr-2 h-4 w-4" /> अगला चरण
                    </Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">👥 टीम</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {team.map(t => (
                        <div key={t.name} className="flex items-center gap-3">
                            <Avatar>
                                <AvatarFallback>{t.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{t.name}</p>
                                <p className="text-sm text-muted-foreground">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
                 <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                        <Plus className="mr-2 h-4 w-4" /> सदस्य
                    </Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">📎 फाइल्स</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {files.map(f => (
                        <div key={f.name} className="flex items-center gap-3">
                            <div className="text-2xl">{f.icon}</div>
                            <div>
                                <p className="font-semibold text-sm">{f.name}</p>
                                <p className="text-xs text-muted-foreground">{f.size} - {f.date}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
                 <CardFooter className="grid grid-cols-2 gap-2">
                    <Button variant="link" size="sm">और देखें</Button>
                    <Button variant="outline" size="sm">अपलोड</Button>
                </CardFooter>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg">💬 रियल-टाइम चैट</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 {chat.map(c => (
                     <div key={c.time} className="flex items-start gap-3">
                        <Avatar>
                            <AvatarFallback>{c.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-baseline gap-2">
                                <p className="font-semibold">{c.sender}</p>
                                <p className="text-xs text-muted-foreground">{c.time}</p>
                            </div>
                            <p className="bg-secondary p-3 rounded-lg mt-1">{c.message}</p>
                        </div>
                     </div>
                 ))}
                 <div className="relative">
                    <Textarea placeholder="संदेश लिखें..." className="pr-20" />
                    <div className="absolute top-1/2 right-3 -translate-y-1/2 flex gap-2">
                        <Button variant="ghost" size="icon"><Paperclip /></Button>
                        <Button variant="ghost" size="icon"><Mic /></Button>
                    </div>
                 </div>
            </CardContent>
            <CardFooter className="gap-2">
                <Button variant="outline"><Video className="mr-2"/>वीडियो कॉल</Button>
                <Button variant="outline"><ScreenShare className="mr-2"/>स्क्रीन शेयर</Button>
                <Button variant="outline"><Link2 className="mr-2"/>लिंक शेयर</Button>
            </CardFooter>
        </Card>
      </main>

       <footer className="sticky bottom-0 z-40 w-full border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container h-14 flex items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>🔄 रियल-टाइम अपडेट: "राहुल ने नया कोड पुश किया"</p>
             <Button variant="ghost" size="sm"><Eye className="mr-2"/> देखें</Button>
        </div>
      </footer>
    </div>
  );
}
