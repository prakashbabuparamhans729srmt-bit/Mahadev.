'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  Star,
  User,
  Phone,
  Mail,
  Calendar,
  Plus,
  FileText,
  Palette,
  Code,
  CheckCircle,
  Wallet,
  Clock,
  BarChart,
  Smile,
  Disc,
  File,
  Users,
  Upload,
  ChevronRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import React from 'react';
import { useParams } from 'next/navigation';

// Dummy data, in a real app this would come from a database based on params.id
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
];

const team = [
  { name: 'राहुल (TL)', role: 'फ्रंटएंड', avatar: 'R' },
  { name: 'प्रिया', role: 'UI/UX', avatar: 'P' },
  { name: 'अमित', role: 'बैकएंड', avatar: 'A' },
  { name: 'सीमा', role: 'QA', avatar: 'S' },
];

const files = [
  {
    name: 'SRS.docx',
    size: '2.4 MB',
    date: '01/04/24',
    icon: <FileText className="text-blue-500" />,
  },
  {
    name: 'डिज़ाइन.fig',
    size: '5.7 MB',
    date: '15/04/24',
    icon: <Palette className="text-pink-500" />,
  },
  {
    name: 'कोड.ज़िप',
    size: '45.2 MB',
    date: '20/04/24',
    icon: <Code className="text-green-500" />,
  },
];

export default function ProjectDetailsPage() {
    const params = useParams();
    const { toast } = useToast();

    const handleAction = (message: string) => {
        toast({
            title: 'सुविधा जल्द ही आ रही है',
            description: message,
        });
    };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/project-oversight">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-xl md:text-2xl font-bold font-headline flex items-center gap-2">
                    <span className="hidden md:inline">प्रोजेक्ट {decodeURIComponent(params.id as string)}: </span>"
                    {project.name}"
                </h1>
            </div>
            <Button variant="ghost" size="icon" onClick={() => handleAction('प्रोजेक्ट को पसंदीदा के रूप में चिह्नित करने की सुविधा जल्द ही आ रही है।')}>
                <Star />
                <span className="sr-only">Favorite</span>
            </Button>
        </div>


        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-lg flex items-center">
              <BarChart className="mr-2 h-5 w-5 text-primary" />
              🏆 प्रोजेक्ट ओवरव्यू
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-4 bg-secondary/30 border-l-4 border-primary">
                <h3 className="font-semibold flex items-center text-sm mb-2">
                  <User className="mr-2 h-4 w-4" />
                  क्लाइंट
                </h3>
                <p className="font-bold">{project.client.name}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  {project.client.phone}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  {project.client.email}
                </p>
              </Card>
              <Card className="p-4 bg-secondary/30 border-l-4 border-accent">
                <h3 className="font-semibold flex items-center text-sm mb-2">
                  <Calendar className="mr-2 h-4 w-4" />
                  टाइमलाइन
                </h3>
                <p className="text-sm text-muted-foreground">
                  प्रारंभ: {project.timeline.start}
                </p>
                <p className="text-sm text-muted-foreground">
                  समाप्ति: {project.timeline.end}
                </p>
              </Card>
              <Card className="p-4 bg-secondary/30 border-l-4 border-green-500">
                <h3 className="font-semibold text-sm mb-2 flex items-center">
                  <Wallet className="mr-2 h-4 w-4" />💰 बजट
                </h3>
                <p className="font-bold text-foreground">
                  ₹{project.budget.total.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-muted-foreground">
                  खर्च: ₹{project.budget.spent.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-green-600">
                  शेष: ₹
                  {(project.budget.total - project.budget.spent).toLocaleString(
                    'en-IN'
                  )}
                </p>
              </Card>
            </div>
            <Separator />
            <div>
              <label className="text-sm font-medium">
                प्रोजेक्ट हेल्थ स्कोर:
              </label>
              <div className="flex items-center gap-4 mt-2">
                <Progress value={project.health.overall} className="h-4" />
                <span className="font-bold text-lg text-primary">
                  {project.health.overall}%
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground mt-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>समय: {project.health.time}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  <span>बजट: {project.health.budget}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>गुणवत्ता: {project.health.quality}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smile className="h-4 w-4" />
                  <span>संतुष्टि: {project.health.satisfaction}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-lg flex items-center">
                <Disc className="mr-2 h-5 w-5 text-primary" />
                📋 चरण
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              {phases.map((p) => (
                <div key={p.name}>
                  <label className="text-sm">{p.name}</label>
                  <Progress value={p.progress} className="h-2 mt-1" />
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={() => handleAction('अगले चरण पर जाने की सुविधा जल्द ही उपलब्ध होगी।')}>
                <ChevronRight className="mr-2 h-4 w-4" /> अगला चरण
              </Button>
            </CardFooter>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" />
                👥 टीम
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              {team.map((t) => (
                <div key={t.name} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{t.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={() => handleAction('नए सदस्यों को जोड़ने की सुविधा जल्द ही आ रही है।')}>
                <Plus className="mr-2 h-4 w-4" /> सदस्य
              </Button>
            </CardFooter>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-lg flex items-center">
                <File className="mr-2 h-5 w-5 text-primary" />
                📎 फाइल्स
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              {files.map((f) => (
                 <Link href="/dashboard/files" key={f.name}>
                    <div
                    className="flex items-center gap-3 hover:bg-secondary/50 p-2 rounded-md cursor-pointer"
                    >
                    <div className="text-2xl">{f.icon}</div>
                    <div>
                        <p className="font-semibold text-sm">{f.name}</p>
                        <p className="text-xs text-muted-foreground">
                        {f.size} - {f.date}
                        </p>
                    </div>
                    </div>
                </Link>
              ))}
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-2">
              <Button variant="link" size="sm" asChild>
                <Link href="/dashboard/files">
                    और देखें
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/dashboard/files">
                    <Upload className="mr-2 h-4 w-4" />
                    अपलोड
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
