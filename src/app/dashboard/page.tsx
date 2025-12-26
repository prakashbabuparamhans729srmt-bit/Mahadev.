'use client';

import React, { useMemo, useState, Suspense, useEffect } from 'react';
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
  FileText,
  Code,
  MessageSquare,
  ArrowRight,
  Star,
  Loader2,
  AlertTriangle,
  Users
} from 'lucide-react';
import { type ChartConfig } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { StartProjectDialog } from '@/components/start-project-dialog';
import Link from 'next/link';
import { useUser, useAuth } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { firebaseWithRetry } from '@/lib/firebase-retry';


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

const recentFiles = [
    { name: 'SRS.docx', size: '2.4 MB', icon: <FileText className="h-6 w-6 text-blue-500" /> },
    { name: 'डिज़ाइन.fig', size: '5.7 MB', icon: <Star className="h-6 w-6 text-pink-500" /> },
    { name: 'कोड.ज़िप', size: '45.2 MB', icon: <Code className="h-6 w-6 text-green-500" /> },
]

async function getProjects(token: string) {
    const API_URL = '/api/projects';
    return firebaseWithRetry(async () => {
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch projects');
        }
        const data = await response.json();
        return data.data;
    });
}


export default function AdminDashboard() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const displayName = user?.displayName?.split(' ')[0] || 'उपयोगकर्ता';
  const { toast } = useToast();

  const [projects, setProjects] = useState<any[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (user && auth) {
        setProjectsLoading(true);
        try {
          const token = await user.getIdToken();
          const userProjects = await getProjects(token);
          // Get only the 2 most recent projects based on endDate
          const sortedProjects = userProjects.sort((a: any, b: any) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
          setProjects(sortedProjects.slice(0, 2));
        } catch (err: any) {
          setProjectsError(err);
          toast({
            variant: "destructive",
            title: "त्रुटि",
            description: "प्रोजेक्ट लोड करने में विफल: " + err.message,
          });
        } finally {
          setProjectsLoading(false);
        }
      } else if (!isUserLoading) {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, [user, auth, isUserLoading, toast]);


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
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
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
            </Suspense>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="font-headline text-lg">सक्रिय प्रोजेक्ट्स</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
             {projectsLoading && 
                <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
             }
             {projectsError && <p className="text-xs text-destructive text-center">{projectsError.message}</p>}
            {projects?.map((project: any) => (
                <Link href={`/dashboard/project/${project.id}`} key={project.id} className="block hover:bg-secondary/50 p-2 rounded-lg cursor-pointer">
                    <div className="flex justify-between items-baseline mb-2">
                        <h3 className="font-semibold truncate">{project.name}</h3>
                        <p className="text-xs font-mono text-muted-foreground">#{project.id.slice(0,4)}</p>
                    </div>
                    <Progress value={project.progress || 0} className="h-2" />
                </Link>
            ))}
             {!projectsLoading && !projectsError && projects?.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-4">कोई सक्रिय प्रोजेक्ट नहीं।</p>
            )}
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
                 <CardTitle className="font-headline text-lg flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                    💬 हाल के संदेश
                </CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="text-center text-sm text-muted-foreground py-8">
                    <p>अपने सभी संदेश देखने के लिए संदेश केंद्र पर जाएँ।</p>
                    <Button asChild variant="link" className="mt-2">
                        <Link href="/dashboard/messages">
                            संदेश केंद्र पर जाएं <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
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
                <Wallet className="mr-2 h-5 w-5 text-primary" />
                💰 बजट स्नैपशॉट
              </CardTitle>
              <CardDescription>
                सभी प्रोजेक्ट्स का संयुक्त बजट।
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 {projectsLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-8 w-1/2" />
                    </div>
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

        <Card>
           <CardHeader>
            <CardTitle className="font-headline flex items-center text-lg">
                <Users className="mr-2 h-5 w-5 text-primary" />
                👥 टीम गतिविधि
            </CardTitle>
           </CardHeader>
           <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground text-center py-4">टीम गतिविधि देखने के लिए व्यवस्थापकीय अनुमतियों की आवश्यकता है।</p>
           </CardContent>
        </Card>

      </div>
    </div>
    <StartProjectDialog isOpen={isProjectModalOpen} onOpenChange={setIsProjectModalOpen} />
    </>
  );
}
