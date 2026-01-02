
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
  Calendar,
  Briefcase,
  DollarSign,
  MoreVertical,
  UserX,
  Plus,
  Send,
  Loader2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { UserActivityCard } from '../user-activity-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';
import { useAuth } from '@/firebase';
import { firebaseWithRetry } from '@/lib/firebase-retry';

// Mock data - in a real app, this would come from your backend
const mockUsers = [
    { id: 'usr_1', name: 'प्रकाश कुमार', email: 'prakash@example.com', role: 'ग्राहक', status: 'सक्रिय', joined: '15 मार्च, 2024', avatar: 'https://i.pravatar.cc/150?u=prakash', phone: '+91 98765 43210' },
    { id: 'usr_2', name: 'राजेश इंडस्ट्रीज', email: 'contact@rajeshind.com', role: 'ग्राहक', status: 'सक्रिय', joined: '22 फरवरी, 2024', avatar: 'https://i.pravatar.cc/150?u=rajesh', phone: '+91 91234 56789' },
    { id: 'usr_3', name: 'नेहा गुप्ता', email: 'neha.gupta@mail.com', role: 'ग्राहक', status: 'निष्क्रिय', joined: '10 जनवरी, 2024', avatar: 'https://i.pravatar.cc/150?u=neha', phone: '+91 87654 32109' },
    { id: 'usr_4', name: 'स्मार्ट सॉल्यूशंस', email: 'support@smartsol.dev', role: 'ग्राहक', status: 'सक्रिय', joined: '05 अप्रैल, 2024', avatar: 'https://i.pravatar.cc/150?u=smart', phone: '+91 76543 21098' },
];

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


export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const id = params.id as string;
  const auth = useAuth();
  
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // In a real app, you'd fetch this data based on the ID.
  const user = mockUsers.find(u => u.id === id);

  useEffect(() => {
    const fetchProjects = async () => {
      if (auth?.currentUser && user) {
        setIsLoading(true);
        try {
          const token = await auth.currentUser.getIdToken(true);
          const allProjects = await getAllProjects(token);
          // Filter projects for the specific user being viewed
          setProjects(allProjects.filter((p:any) => p.clientId === user.id || p.client.email === user.email));
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
      } else if (!auth?.currentUser) {
        setIsLoading(true);
      }
    };
    fetchProjects();
  }, [auth, user, toast]);


  if (!user) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-4">ग्राहक लोड हो रहा है...</p>
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
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <Badge variant={user.status === 'सक्रिय' ? 'default' : 'destructive'} className={`mt-2 ${user.status === 'सक्रिय' ? 'bg-green-500/20 text-green-700' : ''}`}>{user.status}</Badge>
            </CardContent>
            <Separator />
            <CardContent className="pt-4 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> <span>{user.email}</span></div>
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> <span>{user.phone}</span></div>
              <div className="flex items-center gap-3"><Calendar className="h-4 w-4 text-primary" /> <span>{user.joined} से सदस्य</span></div>
            </CardContent>
          </Card>
           <UserActivityCard />
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2"><Briefcase />ग्राहक के प्रोजेक्ट्स</CardTitle>
                    <CardDescription>{user.name} के सभी प्रोजेक्ट्स की सूची।</CardDescription>
                </div>
                 <Button variant="outline" size="sm" onClick={() => toast({ description: 'यह सुविधा जल्द ही उपलब्ध होगी।' })}>
                    <Plus className="mr-2 h-4 w-4" /> नया प्रोजेक्ट
                </Button>
            </CardHeader>
            <CardContent>
                {isLoading && <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>}
                {!isLoading && projects.length > 0 ? (
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
                    !isLoading && <div className="text-center py-20 text-muted-foreground">
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
