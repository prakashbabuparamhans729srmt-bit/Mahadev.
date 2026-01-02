
'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  ShieldAlert,
  Loader2,
  Briefcase,
  BarChart2,
  Settings,
  MoreHorizontal,
  Plus,
  Search,
  Download,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUser, type User } from '@/firebase';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

// This is a placeholder. In a real app, this would be determined from a secure source like a custom claim.
const checkIsAdmin = (user: User | null): boolean => {
  if (!user) return false;
  // Using email for identification as requested by the user.
  const ADMIN_EMAIL = 'divyahanssuperpower@gmail.com';
  return user.email === ADMIN_EMAIL;
}

// Mock Data for a realistic UI
const mockUsers = [
    { id: 'usr_1', name: 'प्रकाश कुमार', email: 'prakash@example.com', role: 'ग्राहक', status: 'सक्रिय', joined: '15 मार्च, 2024', avatar: 'https://i.pravatar.cc/150?u=prakash' },
    { id: 'usr_2', name: 'राजेश इंडस्ट्रीज', email: 'contact@rajeshind.com', role: 'ग्राहक', status: 'सक्रिय', joined: '22 फरवरी, 2024', avatar: 'https://i.pravatar.cc/150?u=rajesh' },
    { id: 'usr_3', name: 'नेहा गुप्ता', email: 'neha.gupta@mail.com', role: 'ग्राहक', status: 'निष्क्रिय', joined: '10 जनवरी, 2024', avatar: 'https://i.pravatar.cc/150?u=neha' },
    { id: 'usr_4', name: 'स्मार्ट सॉल्यूशंस', email: 'support@smartsol.dev', role: 'ग्राहक', status: 'सक्रिय', joined: '05 अप्रैल, 2024', avatar: 'https://i.pravatar.cc/150?u=smart' },
];

const mockProjects = [
    { id: 'proj_1', name: 'ई-कॉमर्स वेबसाइट', client: 'राजेश इंडस्ट्रीज', status: 'जारी', budget: '₹1,50,000' },
    { id: 'proj_2', name: 'CRM सॉफ्टवेयर', client: 'स्मार्ट सॉल्यूशंस', status: 'पूर्ण', budget: '₹3,00,000' },
    { id: 'proj_3', name: 'पोर्टफोलियो वेबसाइट', client: 'प्रकाश कुमार', status: 'योजना', budget: '₹50,000' },
];


function ClientsTab() {
  const { toast } = useToast();
  return (
      <Card>
          <CardHeader>
              <CardTitle>सभी ग्राहक</CardTitle>
              <CardDescription>पंजीकृत ग्राहकों को देखें, खोजें, और प्रबंधित करें।</CardDescription>
              <div className="flex justify-between items-center pt-4">
                  <div className="relative w-full max-w-sm">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="ग्राहक खोजें..." className="pl-9" />
                  </div>
                  <Button onClick={() => toast({ description: 'यह सुविधा जल्द ही लागू की जाएगी।' })}>
                      <Plus className="mr-2 h-4 w-4" /> नया ग्राहक जोड़ें
                  </Button>
              </div>
          </CardHeader>
          <CardContent>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>ग्राहक</TableHead>
                          <TableHead>भूमिका</TableHead>
                          <TableHead>स्थिति</TableHead>
                          <TableHead>शामिल हुए</TableHead>
                          <TableHead className="text-right">कार्रवाई</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {mockUsers.map(user => (
                          <TableRow key={user.id}>
                              <TableCell>
                                  <div className="flex items-center gap-3">
                                      <Avatar>
                                          <AvatarImage src={user.avatar} />
                                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                          <p className="font-medium">{user.name}</p>
                                          <p className="text-xs text-muted-foreground">{user.email}</p>
                                      </div>
                                  </div>
                              </TableCell>
                              <TableCell>{user.role}</TableCell>
                              <TableCell>
                                  <Badge variant={user.status === 'सक्रिय' ? 'default' : 'destructive'} className={user.status === 'सक्रिय' ? 'bg-green-500/20 text-green-700' : ''}>{user.status}</Badge>
                              </TableCell>
                              <TableCell>{user.joined}</TableCell>
                              <TableCell className="text-right">
                                  <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent>
                                          <DropdownMenuLabel>कार्रवाई</DropdownMenuLabel>
                                          <DropdownMenuItem onClick={() => toast({ description: `ग्राहक ${user.name} का विवरण देखा गया।` })}>विवरण देखें</DropdownMenuItem>
                                          <DropdownMenuItem onClick={() => toast({ description: `ग्राहक ${user.name} को संपादित किया गया।` })}>संपादित करें</DropdownMenuItem>
                                          <DropdownMenuItem className="text-destructive" onClick={() => toast({ description: `ग्राहक ${user.name} को हटा दिया गया।`, variant: 'destructive' })}>हटाएं</DropdownMenuItem>
                                      </DropdownMenuContent>
                                  </DropdownMenu>
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </CardContent>
      </Card>
  )
}

function ProjectsTab() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>सभी प्रोजेक्ट्स</CardTitle>
            <CardDescription>सभी ग्राहकों के लिए सभी प्रोजेक्ट्स का अवलोकन करें।</CardDescription>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>प्रोजेक्ट का नाम</TableHead>
                        <TableHead>ग्राहक</TableHead>
                        <TableHead>स्थिति</TableHead>
                        <TableHead>बजट</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockProjects.map(project => (
                        <TableRow key={project.id}>
                            <TableCell className="font-medium">{project.name}</TableCell>
                            <TableCell>{project.client}</TableCell>
                            <TableCell>
                                <Badge variant={project.status === 'पूर्ण' ? 'default' : 'secondary'} className={project.status === 'पूर्ण' ? 'bg-green-500/20 text-green-700' : ''}>{project.status}</Badge>
                            </TableCell>
                            <TableCell>{project.budget}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  )
}

function AnalyticsTab() {
    const { toast } = useToast();
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>ग्राहक वृद्धि</CardTitle>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center text-muted-foreground bg-secondary/20 rounded-b-lg">
                    [ग्राहक वृद्धि का चार्ट जल्द ही यहां प्रदर्शित होगा]
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>प्रोजेक्ट स्थिति वितरण</CardTitle>
                </CardHeader>
                 <CardContent className="h-64 flex items-center justify-center text-muted-foreground bg-secondary/20 rounded-b-lg">
                    [प्रोजेक्ट स्थिति का पाई चार्ट जल्द ही यहां प्रदर्शित होगा]
                </CardContent>
            </Card>
            <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>रिपोर्ट डाउनलोड करें</CardTitle>
                    <Button variant="outline" onClick={() => toast({description: "रिपोर्ट जल्द ही डाउनलोड होगी!"})}>
                        <Download className="mr-2 h-4 w-4"/>
                        मासिक रिपोर्ट
                    </Button>
                </CardHeader>
            </Card>
        </div>
    )
}

function AdminSettingsTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>एडमिन सेटिंग्स</CardTitle>
                <CardDescription>मास्टर एडमिन पैनल के लिए वैश्विक सेटिंग्स।</CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center text-muted-foreground bg-secondary/20 rounded-lg">
                [एडमिन सेटिंग्स के विकल्प जल्द ही यहां प्रदर्शित होंगे]
            </CardContent>
        </Card>
    )
}


export default function UserManagementPage() {
  const { user, isUserLoading } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isUserLoading) {
      const adminStatus = checkIsAdmin(user);
      setIsAdmin(adminStatus);
      setIsLoading(false);
    }
  }, [user, isUserLoading]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4">अनुमतियों की जाँच हो रही है...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <div className="flex flex-col items-center justify-center h-96 text-center text-destructive bg-destructive/10 rounded-lg border border-dashed border-destructive/30">
          <ShieldAlert className="h-10 w-10 mb-4 text-destructive" />
          <h3 className="text-xl font-semibold text-foreground">अपर्याप्त अनुमतियाँ</h3>
          <p className="text-sm max-w-sm mt-2 text-muted-foreground">
            यह पेज केवल एडमिनिस्ट्रेटर्स के लिए उपलब्ध है। यदि आपको लगता है कि यह एक गलती है, तो कृपया समर्थन से संपर्क करें।
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
                <Users className="h-7 w-7 text-primary"/>
                मास्टर एडमिन पैनल
              </h1>
              <p className="text-muted-foreground">
                यह आपका केंद्रीय हब है जहाँ से आप सभी ग्राहकों और प्रोजेक्ट्स का प्रबंधन कर सकते हैं।
              </p>
            </div>
        </div>

        <Tabs defaultValue="clients" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="clients"><Users className="mr-2 h-4 w-4"/>ग्राहक</TabsTrigger>
                <TabsTrigger value="projects"><Briefcase className="mr-2 h-4 w-4"/>प्रोजेक्ट्स</TabsTrigger>
                <TabsTrigger value="analytics"><BarChart2 className="mr-2 h-4 w-4"/>एनालिटिक्स</TabsTrigger>
                <TabsTrigger value="settings"><Settings className="mr-2 h-4 w-4"/>सेटिंग्स</TabsTrigger>
            </TabsList>
            <TabsContent value="clients" className="mt-6">
                <ClientsTab />
            </TabsContent>
            <TabsContent value="projects" className="mt-6">
                <ProjectsTab />
            </TabsContent>
            <TabsContent value="analytics" className="mt-6">
                <AnalyticsTab />
            </TabsContent>
            <TabsContent value="settings" className="mt-6">
                <AdminSettingsTab />
            </TabsContent>
        </Tabs>
    </div>
  );
}
