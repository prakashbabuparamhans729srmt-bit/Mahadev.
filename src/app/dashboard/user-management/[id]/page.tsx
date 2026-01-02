
'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ArrowLeft,
  Mail,
  Phone,
  Briefcase,
  MoreVertical,
  UserX,
  Plus,
  Send,
  Loader2,
  Building,
  ShieldAlert,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { UserActivityCard } from '../user-activity-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect, useMemo } from 'react';
import { useAuth, useDoc, useFirestore } from '@/firebase';
import { firebaseWithRetry } from '@/lib/firebase-retry';
import { doc } from 'firebase/firestore';

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


export default function UserDetailPage({ isAuthorized }: { isAuthorized: boolean }) {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const id = params.id as string;
  const auth = useAuth();
  const firestore = useFirestore();
  
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const clientRef = useMemo(() => {
      // Only create the query if authorization has been confirmed by the layout.
      if (!firestore || !id || !isAuthorized) return null;
      return doc(firestore, 'clients', id);
  }, [firestore, id, isAuthorized]);

  const { data: user, isLoading: userLoading, error: userError } = useDoc(clientRef);

  useEffect(() => {
    const fetchProjects = async () => {
      // Fetch projects only if authorized, and we have a user object.
      if (isAuthorized && auth?.currentUser && user) {
        setIsLoading(true);
        setError(null);
        try {
          const token = await auth.currentUser.getIdToken(true);
          const allProjects = await getAllProjects(token);
          // Filter projects for the specific user being viewed
          setProjects(allProjects.filter((p:any) => p.clientId === user.id));
        } catch (err: any) {
          setError(err);
          toast({
            variant: "destructive",
            title: "त्रुटि",
            description: "ग्राहक के प्रोजेक्ट्स लोड करने में विफल: " + err.message,
          });
        } finally {
          setIsLoading(false);
        }
      } else if (isAuthorized) {
        // If authorized but no user, we can stop loading projects.
        setIsLoading(false);
      }
    };
    if (!userLoading) { // Wait for the user doc to load first
        fetchProjects();
    }
  }, [isAuthorized, auth, user, userLoading, toast]);
  
  const combinedLoading = userLoading || isLoading;
  const combinedError = userError || error;


  if (combinedLoading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-4">ग्राहक और प्रोजेक्ट लोड हो रहे हैं...</p>
      </div>
    );
  }
  
  if (combinedError) {
      return (
          <div className="p-8">
              <Card className="text-center p-8 bg-destructive/10 text-destructive">
                <ShieldAlert className="h-8 w-8 mx-auto mb-2"/>
                <h3 className="font-semibold">डेटा लोड करने में विफल</h3>
                <p className="text-sm">{combinedError.message}</p>
              </Card>
          </div>
      )
  }

  if (!user) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center text-muted-foreground">
          <p>ग्राहक नहीं मिला।</p>
      </div>
    );
  }
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'जारी': return <Badge variant="secondary" className="bg-blue-500/20 text-blue-500">{status}</Badge>;
      case 'पूर्ण': return <Badge variant="secondary" className="bg-green-500/20 text-green-500">{status}</Badge>;
      case 'योजना': return <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500">{status}</Badge>;
      case 'रुका हुआ': return <Badge variant="destructive">{status}</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  }


  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold font-headline">ग्राहक प्रोफ़ाइल</h1>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => toast({ description: 'यह सुविधा जल्द ही उपलब्ध होगी।' })}>
                <Send className="mr-2 h-4 w-4" /> संदेश भेजें
            </Button>
             <Button variant="destructive" onClick={() => toast({ description: 'यह सुविधा जल्द ही उपलब्ध होगी।' })}>
                <UserX className="mr-2 h-4 w-4" /> खाता निलंबित करें
            </Button>
            <Button variant="ghost" size="icon">
                <MoreVertical />
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.photoURL} />
                <AvatarFallback>{(user.firstName?.[0] || 'U').toUpperCase()}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{`${user.firstName || ''} ${user.lastName || ''}`.trim()}</h2>
              {user.companyName && <p className="text-muted-foreground">{user.companyName}</p>}
              <Badge variant={'default'} className={`mt-2 bg-green-500/20 text-green-700`}>सक्रिय</Badge>
            </CardContent>
            <Separator />
            <CardContent className="pt-4 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> <span>{user.email}</span></div>
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> <span>{user.phone || 'उपलब्ध नहीं'}</span></div>
              <div className="flex items-center gap-3"><Building className="h-4 w-4 text-primary" /> <span>{user.companyName || 'उपलब्ध नहीं'}</span></div>
            </CardContent>
          </Card>
           <UserActivityCard />
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2"><Briefcase />ग्राहक के प्रोजेक्ट्स</CardTitle>
                    <CardDescription>{user.firstName} के सभी प्रोजेक्ट्स की सूची।</CardDescription>
                </div>
                 <Button variant="outline" size="sm" onClick={() => toast({ description: 'यह सुविधा जल्द ही उपलब्ध होगी।' })}>
                    <Plus className="mr-2 h-4 w-4" /> नया प्रोजेक्ट
                </Button>
            </CardHeader>
            <CardContent>
                {projects.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>प्रोजेक्ट</TableHead>
                                <TableHead>बजट</TableHead>
                                <TableHead>प्रगति</TableHead>
                                <TableHead>स्थिति</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.map(project => (
                                <TableRow key={project.id}>
                                    <TableCell className="font-medium">{project.name}</TableCell>
                                    <TableCell>{`₹${(project.budget || 0).toLocaleString('en-IN')}`}</TableCell>
                                    <TableCell><Progress value={project.progress} className="h-2 w-24" /></TableCell>
                                    <TableCell>{getStatusBadge(project.status)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-center py-20 text-muted-foreground">
                        <Briefcase className="h-12 w-12 mx-auto mb-4" />
                        <h3 className="font-semibold text-lg">इस ग्राहक के पास अभी कोई प्रोजेक्ट नहीं है</h3>
                        <p className="text-sm">आप ऊपर दिए गए "नया प्रोजेक्ट" बटन का उपयोग करके एक नया प्रोजेक्ट बना सकते हैं।</p>
                    </div>
                )}
            </CardContent>
             <CardFooter className="justify-end border-t pt-4">
                <p className="text-sm text-muted-foreground">कुल {projects.length} प्रोजेक्ट्स</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
