'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
} from 'recharts';
import { Progress } from '@/components/ui/progress';
import { Plus } from 'lucide-react';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


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


const activeProjects = [
    { id: '#1042', name: 'स्मार्ट ERP सिस्टम', progress: 75 },
    { id: '#1043', name: 'ई-कॉमर्स पोर्टल', progress: 90 }
]

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
            नमस्ते अमित <span className="text-2xl">👋</span>
          </h1>
          <p className="text-muted-foreground">डैशबोर्ड ओवरव्यू - राजेश इंडस्ट्रीज</p>
        </div>
        <Button
          asChild
          size="lg"
          className="shadow-lg transition-transform duration-200 hover:scale-105 h-11 px-8"
        >
          <Link href="/start-project">
            <Plus className="h-4 w-4 mr-2" />
            नया प्रोजेक्ट
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-card">
          <CardHeader>
            <CardTitle className="font-headline text-lg">रियल-टाइम कोड ट्रैकर</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
             <ChartContainer config={chartConfig} className="w-full h-full">
              <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
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
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="font-headline text-lg">सक्रिय प्रोजेक्ट्स</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {activeProjects.map(project => (
                <Link href="/dashboard/project-oversight" key={project.id}>
                    <div className="block hover:bg-secondary/50 p-2 rounded-lg cursor-pointer">
                        <div className="flex justify-between items-baseline mb-2">
                            <h3 className="font-semibold">{project.name}</h3>
                            <p className="text-xs font-mono text-muted-foreground">{project.id}</p>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                    </div>
                </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
