'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AreaChart,
  BarChart as BarChartIcon,
  DollarSign,
  Briefcase,
  Clock,
  CheckCircle,
  Wallet,
  Smile,
  BarChart2,
  Loader2,
  ShieldAlert,
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';
import { useUser, useAuth } from '@/firebase';
import React, { useState, useMemo, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { firebaseWithRetry } from '@/lib/firebase-retry';

const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), {
    loading: () => <Skeleton className="w-full h-full" />,
    ssr: false,
});
const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), {
    loading: () => <Skeleton className="w-full h-full" />,
    ssr: false,
});

import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Pie,
  Cell,
} from 'recharts';


const budgetData = [
  { name: 'स्मार्ट ERP सिस्टम', value: 450000, fill: 'hsl(var(--chart-1))' },
  { name: 'ई-कॉमर्स पोर्टल', value: 300000, fill: 'hsl(var(--chart-2))' },
  { name: 'मोबाइल ऐप', value: 350000, fill: 'hsl(var(--chart-3))' },
  { name: 'लैंडिंग पेज', value: 150000, fill: 'hsl(var(--chart-4))' },
];

const timeData = [
    { task: 'डिज़ाइन', hours: 120, fill: 'hsl(var(--chart-1))' },
    { task: 'डेवलपमेंट', hours: 250, fill: 'hsl(var(--chart-2))' },
    { task: 'मीटिंग्स', hours: 80, fill: 'hsl(var(--chart-3))' },
    { task: 'टेस्टिंग', hours: 100, fill: 'hsl(var(--chart-4))' },
    { task: 'अन्य', hours: 50, fill: 'hsl(var(--chart-5))' },
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


export default function ReportsPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!isUserLoading && user && auth) {
        setIsLoading(true);
        try {
          const token = await user.getIdToken();
          const userProjects = await getProjects(token);
          setProjects(userProjects);
        } catch (err: any) {
          setError(err);
           toast({
            variant: "destructive",
            title: "त्रुटि",
            description: "रिपोर्ट लोड करने में विफल: " + err.message,
          });
        } finally {
          setIsLoading(false);
        }
      } else if (!isUserLoading) {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [user, auth, isUserLoading, toast]);


  const healthData = useMemo(() => {
      if (!projects) return [];
      // Dummy health data generation
      return projects.map(p => ({
          ...p,
          time: 80 + Math.floor(Math.random() * 20) - 10,
          budget: 90 + Math.floor(Math.random() * 20) - 10,
          quality: 85 + Math.floor(Math.random() * 20) - 10,
          satisfaction: 95 + Math.floor(Math.random() * 10) - 5,
      }));
  }, [projects]);

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
            <AreaChart className="h-7 w-7 text-primary" />
            विस्तृत रिपोर्ट और विश्लेषण
          </h1>
          <p className="text-muted-foreground">
            अपने प्रोजेक्ट्स और एजेंसी के प्रदर्शन में गहरी अंतर्दृष्टि प्राप्त करें।
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="font-headline text-lg flex items-center">
                    <DollarSign className="mr-2" />
                    बजट विश्लेषण
                </CardTitle>
                <CardDescription>
                    सभी प्रोजेक्ट्स में बजट का वितरण।
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
                 <ChartContainer config={{}} className="w-full h-full">
                     <PieChart>
                         <Pie data={budgetData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                            {budgetData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                         </Pie>
                        <ChartTooltip content={<ChartTooltipContent nameKey="value" hideLabel />} />
                     </PieChart>
                 </ChartContainer>
            </CardContent>
        </Card>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center">
                        <Wallet className="mr-2" />
                        कुल बजट
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p className="text-3xl font-bold">₹12,50,000</p>
                    <p className="text-sm text-muted-foreground">कुल खर्च: ₹8,70,000</p>
                    <p className="text-sm text-green-500">शेष: ₹3,80,000</p>
                    <Progress value={(870000 / 1250000) * 100} className="h-3" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center">
                        <Clock className="mr-2" />
                        समय ट्रैकिंग
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-[180px]">
                    <ChartContainer config={{}} className="w-full h-full">
                        <BarChart data={timeData} layout="vertical" margin={{ left: -10, right: 20 }}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="task" type="category" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} width={80} />
                            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="hours" radius={5} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
      </div>
      <Card>
        <CardHeader>
            <CardTitle className="font-headline text-lg flex items-center">
                <BarChart2 className="mr-2" />
                परियोजना स्वास्थ्य मैट्रिक्स
            </CardTitle>
            <CardDescription>
                प्रत्येक प्रोजेक्ट के लिए प्रमुख प्रदर्शन संकेतक।
            </CardDescription>
        </CardHeader>
        <CardContent>
            {isLoading && <div className="flex justify-center items-center h-40"><Loader2 className="h-8 w-8 animate-spin" /></div>}
            {error && <div className="text-destructive text-center p-4"><ShieldAlert className="mx-auto h-8 w-8 mb-2" />त्रुटि: {error.message}</div>}
            {healthData && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-2/5">प्रोजेक्ट</TableHead>
                            <TableHead><Clock className="inline-block h-4 w-4 mr-1" />समय</TableHead>
                            <TableHead><Wallet className="inline-block h-4 w-4 mr-1" />बजट</TableHead>
                            <TableHead><CheckCircle className="inline-block h-4 w-4 mr-1" />गुणवत्ता</TableHead>
                            <TableHead><Smile className="inline-block h-4 w-4 mr-1" />संतुष्टि</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {healthData.map((project: any) => (
                            <TableRow key={project.id}>
                                <TableCell className="font-medium">
                                    <p>{project.name}</p>
                                    <p className="text-xs text-muted-foreground">{project.id}</p>
                                </TableCell>
                                <TableCell><Progress value={project.time} /> <span className="text-xs">{project.time}%</span></TableCell>
                                <TableCell><Progress value={project.budget} /> <span className="text-xs">{project.budget}%</span></TableCell>
                                <TableCell><Progress value={project.quality} /> <span className="text-xs">{project.quality}%</span></TableCell>
                                <TableCell><Progress value={project.satisfaction} /> <span className="text-xs">{project.satisfaction}%</span></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
