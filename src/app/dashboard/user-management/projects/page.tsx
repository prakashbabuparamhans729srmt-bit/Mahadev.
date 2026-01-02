
'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Briefcase,
  Search,
  MoreHorizontal,
  DollarSign,
  User,
  Calendar,
  Loader2,
  ShieldAlert,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/firebase';
import { firebaseWithRetry } from '@/lib/firebase-retry';

// This function now uses the secure API route
async function getAllProjects(token: string) {
    const API_URL = `/api/projects/all`;
    return firebaseWithRetry(async () => {
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch all projects');
        }
        const data = await response.json();
        return data.data;
    });
}


export default function AllProjectsPage({ isAuthorized }: { isAuthorized: boolean }) {
  const { toast } = useToast();
  const auth = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      // Only fetch if the user is authorized (checked by layout) and auth is ready
      if (isAuthorized && auth?.currentUser) {
        setIsLoading(true);
        setError(null);
        try {
          const token = await auth.currentUser.getIdToken(true);
          const allProjects = await getAllProjects(token);
          setProjects(allProjects);
        } catch (err: any) {
          setError(err);
          toast({
            variant: "destructive",
            title: "त्रुटि",
            description: "सभी प्रोजेक्ट्स लोड करने में विफल: " + err.message,
          });
        } finally {
          setIsLoading(false);
        }
      } else if (!isAuthorized) {
          // If not authorized, stop loading and show nothing. The layout should redirect.
          setIsLoading(false);
      }
    };
    fetchProjects();
  }, [isAuthorized, auth, toast]);


  const filteredProjects = projects.filter(p => 
    (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.client?.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'जारी': return <Badge variant="secondary" className="bg-blue-500/20 text-blue-500">{status}</Badge>;
      case 'पूर्ण': return <Badge variant="secondary" className="bg-green-500/20 text-green-500">{status}</Badge>;
      case 'योजना': return <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500">{status}</Badge>;
      case 'रुका हुआ': return <Badge variant="destructive">{status}</Badge>;
      case 'प्रारंभिक': return <Badge variant="secondary">{status}</Badge>;
      default: return <Badge variant="outline">{status || 'N/A'}</Badge>;
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
              <Briefcase className="h-7 w-7 text-primary"/>
              सभी प्रोजेक्ट्स
            </h1>
            <p className="text-muted-foreground">
              सभी ग्राहकों के सभी प्रोजेक्ट्स देखें और प्रबंधित करें।
            </p>
          </div>
      </div>
      
      <Card>
          <CardHeader>
              <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="प्रोजेक्ट या ग्राहक खोजें..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
              </div>
          </CardHeader>
          <CardContent>
              {isLoading && <div className="flex justify-center items-center h-60"><Loader2 className="h-8 w-8 animate-spin" /></div>}
              {error && (
                <div className="text-center py-10 text-destructive bg-destructive/10 rounded-lg">
                    <ShieldAlert className="mx-auto h-8 w-8 mb-2"/>
                    <p className="font-semibold">प्रोजेक्ट्स लोड करने में विफल</p>
                    <p className="text-sm">{error.message}</p>
                </div>
              )}
              {!isLoading && !error && (
                  <>
                  {filteredProjects.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>प्रोजेक्ट</TableHead>
                                <TableHead>ग्राहक</TableHead>
                                <TableHead>बजट</TableHead>
                                <TableHead>प्रगति</TableHead>
                                <TableHead>स्थिति</TableHead>
                                <TableHead className="text-right">कार्रवाई</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProjects.map(project => (
                                <TableRow key={project.id}>
                                    <TableCell>
                                    <Link href={`/dashboard/project/${project.id}`} className="font-medium hover:text-primary transition-colors">{project.name}</Link>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                                        <Calendar className="h-3 w-3" />
                                        {project.startDate ? new Date(project.startDate).toLocaleDateString('hi-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : '-'}
                                    </div>
                                    </TableCell>
                                    <TableCell>
                                    <div className="flex items-center gap-2">
                                        <User className="h-3 w-3 text-muted-foreground"/>
                                        {project.client?.name || project.clientId.slice(0, 8)}
                                    </div>
                                    </TableCell>
                                    <TableCell>
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="h-3 w-3 text-muted-foreground"/>
                                        {project.budget ? `₹${project.budget.toLocaleString('en-IN')}`: 'N/A'}
                                    </div>
                                    </TableCell>
                                    <TableCell>
                                    <Progress value={project.progress} className="w-24 h-2" />
                                    </TableCell>
                                    <TableCell>
                                        {getStatusBadge(project.status)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>कार्रवाई</DropdownMenuLabel>
                                                <DropdownMenuItem asChild><Link href={`/dashboard/project/${project.id}`}>विवरण देखें</Link></DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => toast({ description: 'यह सुविधा जल्द ही उपलब्ध होगी।' })}>संपादित करें</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive" onClick={() => toast({ description: 'यह सुविधा जल्द ही उपलब्ध होगी।', variant: 'destructive' })}>हटाएं</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-20 text-muted-foreground">
                       <Briefcase className="h-12 w-12 mx-auto mb-4" />
                       <h3 className="font-semibold text-lg">
                           {searchQuery ? `"${searchQuery}" के लिए कोई प्रोजेक्ट नहीं मिला` : 'अभी कोई प्रोजेक्ट नहीं है'}
                       </h3>
                       <p className="text-sm">
                           {searchQuery ? 'कृपया अपनी खोज बदलें।' : 'जब नए प्रोजेक्ट बनाए जाएंगे, तो वे यहां दिखाई देंगे।'}
                       </p>
                   </div>
                  )}
                  </>
              )}
          </CardContent>
      </Card>
    </div>
  );
}
