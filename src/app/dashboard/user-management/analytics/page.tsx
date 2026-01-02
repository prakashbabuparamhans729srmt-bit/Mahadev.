
'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
import { useAuth, useCollection, useFirestore } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { firebaseWithRetry } from '@/lib/firebase-retry';
import { collection } from 'firebase/firestore';

// This function now uses the secure API route
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

const DUMMY_SATISFACTION = 92;

export default function AnalyticsPage({ isAuthorized }: { isAuthorized: boolean }) {
    const auth = useAuth();
    const firestore = useFirestore();
    const { toast } = useToast();
    const [projects, setProjects] = useState<any[]>([]);
    const [projectsLoading, setProjectsLoading] = useState(true);
    const [globalError, setGlobalError] = useState<Error | null>(null);

    // This hook fetches client data, but we'll get the count from it.
    // It's secured by the layout check and the `isAuthorized` prop.
    const { data: clients, isLoading: clientsLoading, error: clientsError } = useCollection(
        isAuthorized && firestore ? collection(firestore, 'clients') : null
    );

    useEffect(() => {
        const fetchProjects = async () => {
            // Only fetch if authorized
            if (isAuthorized && auth?.currentUser) {
                setProjectsLoading(true);
                try {
                    const token = await auth.currentUser.getIdToken(true);
                    const allProjects = await getAllProjects(token);
                    setProjects(allProjects);
                } catch (err: any) {
                    setGlobalError(err);
                    toast({
                        variant: "destructive",
                        title: "त्रुटि",
                        description: "विश्लेषण प्रोजेक्ट्स लोड करने में विफल: " + err.message,
                    });
                } finally {
                    setProjectsLoading(false);
                }
            } else if (!isAuthorized) {
                setProjectsLoading(false);
            }
        };

        fetchProjects();

    }, [isAuthorized, auth, toast]);

    useEffect(() => {
        if (clientsError) {
            // Combine errors from different sources
            setGlobalError(clientsError);
        }
    }, [clientsError]);


    const isLoading = clientsLoading || projectsLoading;

    const totalProjects = projects?.length ?? 0;
    const totalRevenue = projects?.reduce((acc, p) => acc + (p.budget || 0), 0) ?? 0;
    
    const projectStatusData = React.useMemo(() => {
        if (!projects) return [];
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
            } else if (p.status) {
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
        ) : globalError ? (
            <Card className="p-4 text-center text-destructive bg-destructive/10">
                <ShieldAlert className="mx-auto h-8 w-8 mb-2" />
                <p>एनालिटिक्स डेटा लोड करने में विफल: {globalError.message}</p>
            </Card>
        ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">कुल ग्राहक</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{clients?.length || 0}</div>
                        <p className="text-xs text-muted-foreground">लाइव डेटा</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">कुल प्रोजेक्ट्स</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalProjects}</div>
                        <p className="text-xs text-muted-foreground">लाइव डेटा</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">कुल राजस्व</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString('en-IN')}</div>
                        <p className="text-xs text-muted-foreground">सभी प्रोजेक्ट्स से</p>
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
                 globalError ? (
                    <div className="flex h-full items-center justify-center text-destructive-foreground bg-destructive/10 rounded-md">
                        <ShieldAlert className="mr-2" /> प्रोजेक्ट डेटा लोड करने में विफल।
                    </div>
                 ) :
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
