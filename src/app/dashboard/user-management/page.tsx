
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
  ArrowRight,
  UserCheck,
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Line, LineChart, XAxis, YAxis } from 'recharts';

// This is a placeholder. In a real app, this would be determined from a secure source like a custom claim.
const checkIsAdmin = (user: User | null): boolean => {
  if (!user) return false;
  // Using email for identification as requested by the user.
  const ADMIN_EMAIL = 'divyahanssuperpower@gmail.com';
  return user.email === ADMIN_EMAIL;
}

// Mock Data for a realistic UI
const mockUsers = [
    { id: 'usr_1', name: 'प्रकाश कुमार', email: 'prakash@example.com', role: 'ग्राहक', status: 'सक्रिय', joined: '15 मार्च, 2024', avatar: 'https://i.pravatar.cc/150?u=prakash', projects: 2, totalSpent: 75000 },
    { id: 'usr_2', name: 'राजेश इंडस्ट्रीज', email: 'contact@rajeshind.com', role: 'ग्राहक', status: 'सक्रिय', joined: '22 फरवरी, 2024', avatar: 'https://i.pravatar.cc/150?u=rajesh', projects: 1, totalSpent: 150000 },
    { id: 'usr_3', name: 'नेहा गुप्ता', email: 'neha.gupta@mail.com', role: 'ग्राहक', status: 'निष्क्रिय', joined: '10 जनवरी, 2024', avatar: 'https://i.pravatar.cc/150?u=neha', projects: 0, totalSpent: 0 },
    { id: 'usr_4', name: 'स्मार्ट सॉल्यूशंस', email: 'support@smartsol.dev', role: 'ग्राहक', status: 'सक्रिय', joined: '05 अप्रैल, 2024', avatar: 'https://i.pravatar.cc/150?u=smart', projects: 1, totalSpent: 300000 },
];

export default function UserManagementPage() {
  const { user, isUserLoading } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();


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
                <UserCheck className="h-7 w-7 text-primary"/>
                ग्राहक प्रबंधन
              </h1>
              <p className="text-muted-foreground">
                पंजीकृत ग्राहकों को देखें, खोजें, और प्रबंधित करें।
              </p>
            </div>
             <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => toast({ description: 'CSV निर्यात जल्द ही आ रहा है।' })}>
                    <Download className="mr-2 h-4 w-4" /> निर्यात करें
                </Button>
                <Button onClick={() => toast({ description: 'यह सुविधा जल्द ही लागू की जाएगी।' })}>
                    <Plus className="mr-2 h-4 w-4" /> नया ग्राहक जोड़ें
                </Button>
            </div>
        </div>

        <Card>
          <CardHeader>
              <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="ग्राहक खोजें (नाम या ईमेल से)..." className="pl-9" />
              </div>
          </CardHeader>
          <CardContent>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>ग्राहक</TableHead>
                          <TableHead>स्थिति</TableHead>
                          <TableHead>प्रोजेक्ट्स</TableHead>
                          <TableHead>कुल खर्च</TableHead>
                          <TableHead className="text-right">कार्रवाई</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {mockUsers.map(user => (
                          <TableRow key={user.id}>
                              <TableCell>
                                <Link href={`/dashboard/user-management/${user.id}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                                      <Avatar>
                                          <AvatarImage src={user.avatar} />
                                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                          <p className="font-medium">{user.name}</p>
                                          <p className="text-xs text-muted-foreground">{user.email}</p>
                                      </div>
                                  </Link>
                              </TableCell>
                              <TableCell>
                                  <Badge variant={user.status === 'सक्रिय' ? 'default' : 'destructive'} className={user.status === 'सक्रिय' ? 'bg-green-500/20 text-green-700' : ''}>{user.status}</Badge>
                              </TableCell>
                              <TableCell>{user.projects}</TableCell>
                              <TableCell>₹{user.totalSpent.toLocaleString('en-IN')}</TableCell>
                              <TableCell className="text-right">
                                  <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent>
                                          <DropdownMenuLabel>कार्रवाई</DropdownMenuLabel>
                                          <DropdownMenuItem asChild>
                                            <Link href={`/dashboard/user-management/${user.id}`}>विवरण देखें</Link>
                                          </DropdownMenuItem>
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
    </div>
  );
}
