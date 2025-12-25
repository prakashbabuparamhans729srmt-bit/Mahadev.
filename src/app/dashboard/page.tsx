'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription
} from '@/components/ui/card';
import { Area, XAxis } from 'recharts';
import { Progress } from '@/components/ui/progress';
import {
  Plus,
  BarChart,
  Wallet,
  Clock,
  CheckCircle,
  Smile,
  Users,
  GitCommit,
  Brush,
  Bug,
  FileText,
  Code,
  MessageSquare,
  ArrowRight,
  User,
  Star,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { type ChartConfig } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { StartProjectDialog } from '@/components/start-project-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useUser, useFirestore, useCollection } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { collection, query, where, orderBy, limit } from 'firebase/firestore';


const ChartContainer = dynamic(() => import('@/components/ui/chart').then(mod => mod.ChartContainer), {
  loading: () => <Skeleton className="h-[300px] w-full" />,
  ssr: false,
});
const ChartTooltip = dynamic(() => import('@/components/ui/chart').then(mod => mod.ChartTooltip), { ssr: false });
const ChartTooltipContent = dynamic(() => import('@/components/ui/chart').then(mod => mod.ChartTooltipContent), { ssr: false });

const RechartsAreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), {
    loading: () => <Skeleton className="h-[300px] w-full" />,
    ssr: false
});


const chartData = [
  { day: 'Tue', commits: 5 },
  { day: 'Wed', commits: 8 },
  { day: 'Thu', commits: 6 },
  { day: 'Fri', commits: 12 },
  { day: 'Sat', commits: 10 },
  { day: 'Sun', commits: 15 },
];

const chartConfig = {
  commits: {
    label: 'Commits',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

const healthData = {
    overall: 68,
    time: 80,
    budget: 50,
    quality: 60,
    satisfaction: 70,
};

const teamActivityIcons: { [key: string]: React.ReactNode } = {
  'update': <Brush className="h-4 w-4 text-blue-500" />,
  'create': <GitCommit className="h-4 w-4 text-green-500" />,
  'delete': <Bug className="h-4 w-4 text-red-500" />,
  'default': <GitCommit className="h-4 w-4 text-gray-500" />,
};

const recentFiles = [
    { name: 'SRS.docx', size: '2.4 MB', icon: <FileText className="h-6 w-6 text-blue-500" /> },
    { name: 'डिज़ाइन.fig', size: '5.7 MB', icon: <Star className="h-6 w-6 text-pink-500" /> },
    { name: 'कोड.ज़िप', size: '45.2 MB', icon: <Code className="h-6 w-6 text-green-500" /> },
]

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const displayName = user?.displayName?.split(' ')[0] || 'उपयोगकर्ता';
  const { toast } = useToast();

  const projectsQuery = useMemo(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'projects'), where("clientId", "==", user.uid));
  }, [firestore, user]);
  const { data: projects, isLoading: projectsLoading, error: projectsError } = useCollection(projectsQuery);

  const { totalBudget, totalSpent } = useMemo(() => {
    if (!projects) return { totalBudget: 0, totalSpent: 0 };
    return projects.reduce((acc, project) => {
      const budget = project.budget || 0;
      const progress = project.progress || 0;
      acc.totalBudget += budget;
      acc.totalSpent += budget * (progress / 100);
      return acc;
    }, { totalBudget: 0, totalSpent: 0 });
  }, [projects]);
  
  const recentMessagesQuery = useMemo(() => {
      if (!firestore || !projects?.[0]?.id) return null;
      // This is a simplified query. A real app would query across multiple project message subcollections.
      return query(collection(firestore, `projects/${projects[0].id}/messages`), orderBy('timestamp', 'desc'), limit(2));
  }, [firestore, projects]);
  const { data: recentMessages, isLoading: messagesLoading } = useCollection(recentMessagesQuery);
  
  const teamActivityQuery = useMemo(() => {
      if (!firestore || !user) return null;
      // This query is for demonstration. A real app would have a dedicated 'activity' collection.
      // We'll use project updates as a proxy for team activity.
      return query(collection(firestore, 'projects'), where("clientId", "==", user.uid), orderBy('endDate', 'desc'), limit(3));
  }, [firestore, user]);
  const { data: teamActivity, isLoading: activityLoading } = useCollection(teamActivityQuery);


  const handleAction = (message: string) => {
    toast({
      title: 'सुविधा जल्द ही आ रही है',
      description: message,
    });
  };

  return (
    <>
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          {isUserLoading ? (
            <Skeleton className="h-9 w-64" />
          ) : (
            <h1 className="text-3xl font-bold font-headline flex items-baseline gap-3">
              नमस्ते {displayName} <span className="text-2xl">👋</span>
            </h1>
          )}
          <p className="text-muted-foreground">डैशबोर्ड ओवरव्यू</p>
        </div>
        <Button
          onClick={() => setIsProjectModalOpen(true)}
          size="lg"
          className="shadow-lg transition-transform duration-200 hover:scale-105 h-11 px-8"
        >
          <Plus className="h-4 w-4 mr-2" />
          नया प्रोजेक्ट
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Row */}
        <Card className="lg:col-span-2 bg-card">
          <CardHeader>
            <CardTitle className="font-headline">रियल-टाइम कोड ट्रैकर</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
             <ChartContainer config={chartConfig} className="w-full h-full">
              <RechartsAreaChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                 <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area type="monotone" dataKey="commits" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorCommits)" />
              </RechartsAreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="font-headline text-lg">सक्रिय प्रोजेक्ट्स</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
             {projectsLoading && <Loader2 className="mx-auto h-6 w-6 animate-spin" />}
             {projectsError && <p className="text-xs text-destructive">प्रोजेक्ट लोड करने में विफल।</p>}
            {projects?.slice(0, 2).map((project: any) => (
                <Link href={`/dashboard/project/${project.id}`} key={project.id} className="block hover:bg-secondary/50 p-2 rounded-lg cursor-pointer">
                    <div className="flex justify-between items-baseline mb-2">
                        <h3 className="font-semibold">{project.name}</h3>
                        <p className="text-xs font-mono text-muted-foreground">#{project.id.slice(0,4)}</p>
                    </div>
                    <Progress value={project.progress || 0} className="h-2" />
                </Link>
            ))}
          </CardContent>
           <CardFooter>
                 <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/project-oversight">सभी प्रोजेक्ट्स देखें</Link>
                </Button>
            </CardFooter>
        </Card>

        {/* Second Row */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="font-headline flex items-center text-lg">
                <BarChart className="mr-2 h-5 w-5 text-primary" />
                🏆 प्रोजेक्ट हेल्थ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">समग्र स्वास्थ्य</label>
                <div className="flex items-center gap-4 mt-1">
                    <Progress value={healthData.overall} className="h-3" />
                    <span className="font-bold text-lg text-primary">{healthData.overall}%</span>
                </div>
              </div>
               <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-muted-foreground pt-2">
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-blue-400" /><span>समय: {healthData.time}%</span></div>
                <div className="flex items-center gap-2"><Wallet className="h-4 w-4 text-green-400" /><span>बजट: {healthData.budget}%</span></div>
                <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-400" /><span>गुणवत्ता: {healthData.quality}%</span></div>
                <div className="flex items-center gap-2"><Smile className="h-4 w-4 text-yellow-400" /><span>संतुष्टि: {healthData.satisfaction}%</span></div>
              </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle className="font-headline flex items-center text-lg">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    👥 टीम गतिविधि
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {activityLoading && <Loader2 className="mx-auto h-5 w-5 animate-spin" />}
                {teamActivity?.map((activity: any, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback>{activity.name?.[0] || '?'}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                           <span className="font-semibold">{activity.name}</span>
                           <span className="text-muted-foreground"> ने `{activity.serviceTier}` को अपडेट किया</span>
                        </div>
                        {teamActivityIcons[activity.status] || teamActivityIcons.default}
                    </div>
                ))}
                {(!teamActivity || teamActivity.length === 0) && !activityLoading && (
                    <p className="text-xs text-muted-foreground text-center py-4">कोई हाल की गतिविधि नहीं।</p>
                )}
            </CardContent>
        </Card>

        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle className="font-headline flex items-center text-lg">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    📎 हाल की फाइल्स
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {recentFiles.map((file, index) => (
                    <Link href="/dashboard/files" key={index}>
                        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary/50 cursor-pointer">
                            {file.icon}
                            <div>
                                <p className="font-semibold text-sm">{file.name}</p>
                                <p className="text-xs text-muted-foreground">{file.size}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </CardContent>
        </Card>
        
        {/* Third Row */}
        <Card className="lg:col-span-2">
            <CardHeader>
                 <CardTitle className="font-headline flex items-center text-lg">
                    <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                    💬 हाल के संदेश
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 {messagesLoading && <Loader2 className="mx-auto h-6 w-6 animate-spin" />}
                 {recentMessages?.map((msg: any, index) => (
                    <React.Fragment key={index}>
                        <Link href={`/dashboard/messages`}>
                            <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 cursor-pointer">
                                <Avatar className="h-9 w-9 border-2 border-primary/50">
                                    <AvatarImage src={msg.senderAvatar} />
                                    <AvatarFallback>{msg.senderName?.[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold text-sm">{msg.senderName}</p>
                                        <Badge variant="secondary" className="text-xs">{projects?.find(p => p.id === msg.projectId)?.name || 'प्रोजेक्ट'}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1 truncate">"{msg.text}"</p>
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground self-center"/>
                            </div>
                        </Link>
                         {index < recentMessages.length - 1 && <Separator />}
                    </React.Fragment>
                ))}
                {(!recentMessages || recentMessages.length === 0) && !messagesLoading && (
                    <p className="text-center text-sm text-muted-foreground py-8">कोई नए संदेश नहीं।</p>
                )}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center text-lg">
                    <Wallet className="mr-2 h-5 w-5 text-primary" />
                    💰 बजट स्नैपशॉट
                </CardTitle>
                <CardDescription>
                  सभी प्रोजेक्ट्स का संयुक्त बजट।
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 {projectsLoading ? (
                    <Loader2 className="mx-auto h-6 w-6 animate-spin"/>
                 ) : (
                    <>
                    <div>
                      <p className="text-sm text-muted-foreground">कुल बजट</p>
                      <p className="text-2xl font-bold">₹{totalBudget.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">कुल खर्च</p>
                      <p className="text-2xl font-bold text-red-400">₹{totalSpent.toLocaleString('en-IN')}</p>
                      <Progress value={totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0} className="mt-2 h-2" />
                    </div>
                    </>
                 )}
            </CardContent>
             <CardFooter>
                 <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/reports">विस्तृत रिपोर्ट देखें</Link>
                </Button>
            </CardFooter>
        </Card>

      </div>
    </div>
    <StartProjectDialog isOpen={isProjectModalOpen} onOpenChange={setIsProjectModalOpen} />
    </>
  );
}
