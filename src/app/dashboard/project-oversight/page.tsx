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
import { useUser, useAuth } from '@/firebase';
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

async function getProjects(token: string) {
    // In a real app, this URL would come from a config file
    const API_URL = 'http://127.0.0.1:5001/studio-953489467-c7e5b/us-central1/api/projects';
    try {
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
        return data.data; // The API returns { success: true, data: [...] }
    } catch (error) {
        console.error("API Error fetching projects:", error);
        throw error;
    }
}


export default function ProjectOversightPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (user && auth) {
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
            description: "प्रोजेक्ट लोड करने में विफल: " + err.message,
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
      
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="overflow-hidden bg-card border border-border/50 h-full flex flex-col">
                    <Skeleton className="relative aspect-video w-full" />
                    <CardContent className="p-4 flex-1 flex flex-col">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                        <div className="mt-auto pt-4">
                            <Skeleton className="h-2 w-full" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      )}

      {error && <div className="text-destructive bg-destructive/10 p-4 rounded-lg text-center"><ShieldAlert className="mx-auto h-8 w-8 mb-2"/>त्रुटि: {error.message}</div>}
      
      {!isLoading && !error && projects?.length === 0 && (
        <div className="text-center py-20 bg-card rounded-lg border">
            <p className="text-muted-foreground">आपके पास अभी कोई सक्रिय प्रोजेक्ट नहीं है।</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects?.map((project: any, index: number) => {
            // Cycle through portfolio images for variety
            const image = PlaceHolderImages.find(p => p.id === `portfolio-${(index % 4) + 1}`);
            if (!image) return null; // Safely skip if image not found

            return (
             <Link href={`/dashboard/project/${encodeURIComponent(project.id)}`} key={project.id}>
                <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card border border-border/50 h-full flex flex-col cursor-pointer">
                    <div className="relative aspect-video">
                        <Image 
                            src={image.imageUrl}
                            alt={project.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={image.imageHint}
                        />
                        <Badge variant="secondary" className="absolute top-3 right-3">#{project.id.slice(-6)}</Badge>
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col">
                        <div className="flex-1">
                            <h3 className="font-bold font-headline text-xl mb-1">{project.name}</h3>
                            <p className="text-xs text-muted-foreground font-mono tracking-widest">{project.serviceTier || 'WEB APP'}</p>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                <span>प्रगति</span>
                                <span>{project.progress || 0}%</span>
                            </div>
                            <Progress value={project.progress || 0} className="h-2"/>
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
