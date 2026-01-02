
'use client';

import React from 'react';
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
  BarChart as BarChartIcon
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Progress } from '@/components/ui/progress';

const totalUsers = 4;
const totalProjects = 5;
const totalRevenue = 75000 + 150000 + 300000;
const clientSatisfaction = 92;

const projectStatusData = [
    { status: 'जारी', count: 2, fill: 'hsl(var(--chart-2))' },
    { status: 'पूर्ण', count: 1, fill: 'hsl(var(--chart-1))' },
    { status: 'योजना', count: 1, fill: 'hsl(var(--chart-3))' },
    { status: 'रुका हुआ', count: 1, fill: 'hsl(var(--chart-4))' },
];

export default function AnalyticsPage() {

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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">कुल ग्राहक</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalUsers}</div>
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
                    <div className="text-2xl font-bold">{clientSatisfaction}%</div>
                    <Progress value={clientSatisfaction} className="h-2 mt-2" />
                </CardContent>
            </Card>
        </div>

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
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    </div>
  );
}
