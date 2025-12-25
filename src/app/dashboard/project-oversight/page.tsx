
'use client';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Briefcase, Loader2, ShieldAlert } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useCollection, useFirestore, useUser } from '@/firebase';
import React, { useMemo } from 'react';
import { collection, query, where } from 'firebase/firestore';


export default function ProjectOversightPage() {
  const firestore = useFirestore();
  const { user } = useUser();

  const projectsQuery = useMemo(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'projects'), where("clientId", "==", user.uid));
  }, [firestore, user]);

  const { data: projects, isLoading, error } = useCollection(projectsQuery);

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
      
      {isLoading && <div className="flex justify-center items-center h-64"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}
      {error && <div className="text-destructive bg-destructive/10 p-4 rounded-lg text-center"><ShieldAlert className="mx-auto h-8 w-8 mb-2"/>त्रुटि: प्रोजेक्ट लोड नहीं हो सके।</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects?.map((project: any) => {
            const image = PlaceHolderImages.find(p => p.id === 'portfolio-1');
            if (!image) return null; // Safely skip if image not found

            return (
             <Link href={`/dashboard/project/${encodeURIComponent(project.id)}`} key={project.id}>
                <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card border border-border/50 h-full flex flex-col cursor-pointer">
                    <div className="relative aspect-video">
                        <Image 
                            src={image.imageUrl}
                            alt={project.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={image.imageHint}
                        />
                        <Badge variant="secondary" className="absolute top-3 right-3">#{project.id}</Badge>
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col">
                        <div className="flex-1">
                            <h3 className="font-bold font-headline text-xl mb-1">{project.name}</h3>
                            <p className="text-xs text-muted-foreground font-mono tracking-widest">{project.serviceTier || 'WEB APP'}</p>
                        </div>
                        <div className="mt-4">
                            <Progress value={project.progress || 50} className="h-2"/>
                        </div>
                    </CardContent>
                </Card>
            </Link>
            )
        })}
      </div>
    </div>
  );
}

