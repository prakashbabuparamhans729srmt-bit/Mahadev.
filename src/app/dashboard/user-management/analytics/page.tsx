
'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  Users,
  DollarSign,
  Briefcase,
  Activity,
  LineChart,
  BarChart as BarChartIcon,
  Loader2,
  ShieldAlert
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { firebaseWithRetry } from '@/lib/firebase-retry';

async function getAllProjects(token: string) {
    const API_URL = `/api/projects/all`;
    return firebaseWithRetry(async () => {
        const response = await fetch(API_URL, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch all projects');
        }
        const data = await response.json();
        return data.data;
    });
}

// In a real app, this would be fetched from a dedicated '/users' endpoint
const DUMMY_USER_COUNT = 4;
const DUMMY_SATISFACTION = 92;

export default function AnalyticsPage() {
    const auth = useAuth();
    const { toast } = useToast();
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            if (auth?.currentUser) {
                setIsLoading(true);
                try {
                    const token = await auth.currentUser.getIdToken(true);
                    const allProjects = await getAllProjects(token);
                    setProjects(allProjects);
                } catch (err: any) {
                    setError(err);
                    toast({
                        variant: "destructive",
                        title: "त्रुटि",
                        description: "विश्लेषण डेटा लोड करने में विफल: " + err.message,
                    });
                } finally {
                    setIsLoading(false);
                }
            } else if (!auth?.currentUser && !auth?.user) {
                // Wait for auth to be initialized
                setIsLoading(true);
            }
        };
        fetchProjects();
    }, [auth, toast]);

    const totalProjects = projects.length;
    const totalRevenue = projects.reduce((acc, p) => acc + (p.budget || 0), 0);
    
    const projectStatusData = React.useMemo(() => {
        const statusCounts: { [key: string]: { status: string, count: number, fill: string } } = {
            'जारी': { status: 'जारी', count: 0, fill: 'hsl(var(--chart-2))' },
            'पूर्ण': { status: 'पूर्ण', count: 0, fill: 'hsl(var(--chart-1))' },
            'योजना': { status: 'योजना', count: 0, fill: 'hsl(var(--chart-3))' },
            'रुका हुआ': { status: 'रुका हुआ', count: 0, fill: 'hsl(var(--chart-4))' },
            'प्रारंभिक': { status: 'प्रारंभिक', count: 0, fill: 'hsl(var(--chart-5))' },
        };

        projects.forEach(p => {
            if (statusCounts[p.status]) {
                statusCounts[p.status].count++;
            } else if (p.status) { // handle unknown statuses
                 statusCounts[p.status] = { status: p.status, count: 1, fill: 'hsl(var(--muted))' };
            }
        });

        return Object.values(statusCounts).filter(s => s.count > 0);
    }, [projects]);


  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
                <LineChart className="h-7 w-7 text-primary"/>
                एडमिन एनालिटिक्स
              </h1>
              <p className="text-muted-foreground">
                संपूर्ण प्लेटफ़ॉर्म के प्रदर्शन का ओवरव्यू।
              </p>
            </div>
        </div>

        {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card><CardHeader><CardTitle className="text-sm font-medium">कुल ग्राहक</CardTitle></CardHeader><CardContent><Loader2 className="animate-spin"/></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-sm font-medium">कुल प्रोजेक्ट्स</CardTitle></CardHeader><CardContent><Loader2 className="animate-spin"/></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-sm font-medium">कुल राजस्व</CardTitle></CardHeader><CardContent><Loader2 className="animate-spin"/></CardContent></Card>
                <Card><CardHeader><CardTitle className="text-sm font-medium">ग्राहक संतुष्टि</CardTitle></CardHeader><CardContent><Loader2 className="animate-spin"/></CardContent></Card>
            </div>
        ) : error ? (
            <Card className="p-4 text-center text-destructive bg-destructive/10">
                <ShieldAlert className="mx-auto h-8 w-8 mb-2" />
                <p>डेटा लोड करने में विफल: {error.message}</p>
            </Card>
        ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">कुल ग्राहक</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{DUMMY_USER_COUNT}</div>
                        <p className="text-xs text-muted-foreground">+2 पिछले महीने से</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">कुल प्रोजेक्ट्स</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalProjects}</div>
                        <p className="text-xs text-muted-foreground">+3 पिछले महीने से</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">कुल राजस्व</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString('en-IN')}</div>
                        <p className="text-xs text-muted-foreground">+18.2% पिछले महीने से</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ग्राहक संतुष्टि</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{DUMMY_SATISFACTION}%</div>
                        <Progress value={DUMMY_SATISFACTION} className="h-2 mt-2" />
                    </CardContent>
                </Card>
            </div>
        )}

        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg flex items-center">
                    <BarChartIcon className="mr-2" />
                    प्रोजेक्ट स्थिति वितरण
                </CardTitle>
                <CardDescription>
                    सभी प्रोजेक्ट्स की वर्तमान स्थिति का अवलोकन।
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
                {isLoading ? <div className="flex h-full items-center justify-center"><Loader2 className="animate-spin" /></div> : 
                 projectStatusData.length > 0 ? (
                    <ChartContainer config={{}} className="w-full h-full">
                        <BarChart data={projectStatusData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="status"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value}
                            />
                            <YAxis allowDecimals={false}/>
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="count" radius={8} />
                        </BarChart>
                    </ChartContainer>
                 ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">कोई प्रोजेक्ट स्थिति डेटा नहीं है।</div>
                 )
                }
            </CardContent>
        </Card>
    </div>
  );
}
