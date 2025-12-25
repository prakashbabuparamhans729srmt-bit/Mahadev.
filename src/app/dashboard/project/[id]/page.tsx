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
  File as FileIcon,
  Users,
  Upload,
  ChevronRight,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useDoc, useFirestore, useCollection } from '@/firebase';
import { doc, collection } from 'firebase/firestore';
import { format } from 'date-fns';
import { getFileIcon } from '@/lib/file-icons';

interface IFile {
    id: string;
    name: string;
    size: string;
    modified: any;
    type: string;
    url: string;
}

export default function ProjectDetailsPage() {
    const params = useParams();
    const { toast } = useToast();
    const firestore = useFirestore();
    const projectId = typeof params.id === 'string' ? params.id : '';

    const projectRef = useMemo(() => {
        if (!firestore || !projectId) return null;
        return doc(firestore, 'projects', projectId);
    }, [firestore, projectId]);

    const { data: project, isLoading: isProjectLoading, error: projectError } = useDoc(projectRef);

    const clientRef = useMemo(() => {
        if (!firestore || !project?.clientId) return null;
        return doc(firestore, 'clients', project.clientId);
    }, [firestore, project?.clientId]);

    const { data: client, isLoading: isClientLoading } = useDoc(clientRef);
    
    const teamQuery = useMemo(() => {
        if (!firestore || !projectId) return null;
        // In a real app, this would probably involve querying a 'team_members' collection
        // based on IDs stored in the project document. For now, we assume a subcollection.
        return collection(firestore, `projects/${projectId}/team`);
    }, [firestore, projectId]);
    const { data: team, isLoading: isTeamLoading } = useCollection(teamQuery);

    const filesQuery = useMemo(() => {
        if (!firestore || !projectId) return null;
        return collection(firestore, `projects/${projectId}/files`);
    }, [firestore, projectId]);
    const { data: files, isLoading: isFilesLoading } = useCollection<IFile>(filesQuery);

    const timelineQuery = useMemo(() => {
        if (!firestore || !projectId) return null;
        return collection(firestore, `projects/${projectId}/timeline`);
    }, [firestore, projectId]);
    const { data: timeline, isLoading: isTimelineLoading } = useCollection(timelineQuery);


    const handleAction = (message: string) => {
        toast({
            title: 'सुविधा जल्द ही आ रही है',
            description: message,
        });
    };

    if (isProjectLoading || isClientLoading || isTeamLoading || isFilesLoading || isTimelineLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }
    
    if (projectError) {
        return (
             <div className="flex h-full flex-col items-center justify-center text-center text-destructive">
                <AlertTriangle className="h-12 w-12" />
                <h2 className="mt-4 text-xl font-semibold">प्रोजेक्ट लोड करने में त्रुटि</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    यह प्रोजेक्ट मौजूद नहीं हो सकता है या आपके पास इसे देखने की अनुमति नहीं है।
                </p>
             </div>
        )
    }

    if (!project) {
        return (
             <div className="flex h-full flex-col items-center justify-center text-center">
                <AlertTriangle className="h-12 w-12 text-muted-foreground" />
                <h2 className="mt-4 text-xl font-semibold">प्रोजेक्ट नहीं मिला</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    प्रोजेक्ट आईडी '{projectId}' से कोई प्रोजेक्ट नहीं मिला।
                </p>
             </div>
        )
    }

    const budgetSpent = project.budget ? (project.budget / 100) * 60 : 0; // Dummy spent amount
    const budgetRemaining = project.budget - budgetSpent;
    const health = {
        overall: 68,
        time: 80,
        budget: 50,
        quality: 60,
        satisfaction: 70,
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
                    <span className="hidden md:inline">प्रोजेक्ट: </span>"
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
                {client ? (
                    <>
                        <p className="font-bold">{client.companyName || `${client.firstName} ${client.lastName}`}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          {client.phone || 'उपलब्ध नहीं'}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          {client.email}
                        </p>
                    </>
                ) : <p className="text-sm text-muted-foreground">लोड हो रहा है...</p>}
              </Card>
              <Card className="p-4 bg-secondary/30 border-l-4 border-accent">
                <h3 className="font-semibold flex items-center text-sm mb-2">
                  <Calendar className="mr-2 h-4 w-4" />
                  टाइमलाइन
                </h3>
                <p className="text-sm text-muted-foreground">
                  प्रारंभ: {project.startDate ? format(new Date(project.startDate), 'dd/MM/yy') : '-'}
                </p>
                <p className="text-sm text-muted-foreground">
                  समाप्ति: {project.endDate ? format(new Date(project.endDate), 'dd/MM/yy') : '-'}
                </p>
              </Card>
              <Card className="p-4 bg-secondary/30 border-l-4 border-green-500">
                <h3 className="font-semibold text-sm mb-2 flex items-center">
                  <Wallet className="mr-2 h-4 w-4" />💰 बजट
                </h3>
                <p className="font-bold text-foreground">
                  ₹{project.budget.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-muted-foreground">
                  खर्च: ₹{budgetSpent.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-green-600">
                  शेष: ₹{budgetRemaining.toLocaleString('en-IN')}
                </p>
              </Card>
            </div>
            <Separator />
            <div>
              <label className="text-sm font-medium">
                प्रोजेक्ट हेल्थ स्कोर:
              </label>
              <div className="flex items-center gap-4 mt-2">
                <Progress value={health.overall} className="h-4" />
                <span className="font-bold text-lg text-primary">
                  {health.overall}%
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground mt-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>समय: {health.time}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  <span>बजट: {health.budget}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>गुणवत्ता: {health.quality}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smile className="h-4 w-4" />
                  <span>संतुष्टि: {health.satisfaction}%</span>
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
              {timeline?.map((p: any) => (
                <div key={p.id}>
                  <label className="text-sm">{p.name}</label>
                  <Progress value={p.progress} className="h-2 mt-1" />
                </div>
              ))}
              {(!timeline || timeline.length === 0) && <p className="text-sm text-muted-foreground">कोई चरण परिभाषित नहीं है।</p>}
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
              {team?.map((t: any) => (
                <div key={t.id} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{t.name?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              ))}
              {(!team || team.length === 0) && <p className="text-sm text-muted-foreground">कोई टीम सदस्य असाइन नहीं किया गया है।</p>}
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
                <FileIcon className="mr-2 h-5 w-5 text-primary" />
                📎 फाइल्स
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              {files?.slice(0, 3).map((f) => (
                 <Link href="/dashboard/files" key={f.id}>
                    <div
                    className="flex items-center gap-3 hover:bg-secondary/50 p-2 rounded-md cursor-pointer"
                    >
                    <div className="text-2xl">{getFileIcon(f.type)}</div>
                    <div>
                        <p className="font-semibold text-sm">{f.name}</p>
                        <p className="text-xs text-muted-foreground">
                        {f.size} - {f.modified ? format(new Date(f.modified.toDate()), 'dd/MM/yy') : ''}
                        </p>
                    </div>
                    </div>
                </Link>
              ))}
               {(!files || files.length === 0) && <p className="text-sm text-muted-foreground">कोई फाइल अपलोड नहीं हुई है।</p>}
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
