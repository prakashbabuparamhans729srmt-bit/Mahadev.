'use client';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Briefcase } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const projects = [
    {
        id: '#1042',
        name: 'स्मार्ट ERP सिस्टम',
        type: 'CUSTOM SOLUTION',
        progress: 75,
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600',
        imageHint: 'team meeting',
    },
    {
        id: '#1043',
        name: 'ई-कॉमर्स पोर्टल',
        type: 'WEB APP',
        progress: 90,
        imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=600',
        imageHint: 'modern office',
    }
]

export default function ProjectOversightPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
       <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
            <Briefcase className="h-7 w-7 text-primary"/>
            सक्रिय प्रोजेक्ट्स
          </h1>
          <p className="text-muted-foreground">आपके सभी चल रहे प्रोजेक्ट्स का ओवरव्यू।</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project) => (
             <Link href="/dashboard/project" key={project.id}>
                <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card border border-border/50 h-full flex flex-col">
                    <div className="relative aspect-video">
                        <Image 
                            src={project.imageUrl}
                            alt={project.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={project.imageHint}
                        />
                        <Badge variant="secondary" className="absolute top-3 right-3">{project.id}</Badge>
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col">
                        <div className="flex-1">
                            <h3 className="font-bold font-headline text-xl mb-1">{project.name}</h3>
                            <p className="text-xs text-muted-foreground font-mono tracking-widest">{project.type}</p>
                        </div>
                        <div className="mt-4">
                            <Progress value={project.progress} className="h-2"/>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        ))}
      </div>
    </div>
  );
}
