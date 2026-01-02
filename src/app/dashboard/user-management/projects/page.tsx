
'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
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
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock data, in a real app, this would come from a global query of all projects
const allProjects = [
    { id: 'proj_1', name: 'ई-कॉमर्स वेबसाइट', client: 'राजेश इंडस्ट्रीज', status: 'जारी', budget: '₹1,50,000', progress: 75, startDate: '2024-03-01' },
    { id: 'proj_2', name: 'CRM सॉफ्टवेयर', client: 'स्मार्ट सॉल्यूशंस', status: 'पूर्ण', budget: '₹3,00,000', progress: 100, startDate: '2024-01-15' },
    { id: 'proj_3', name: 'पोर्टफोलियो वेबसाइट', client: 'प्रकाश कुमार', status: 'योजना', budget: '₹50,000', progress: 10, startDate: '2024-04-10' },
    { id: 'proj_4', name: 'मोबाइल बैंकिंग ऐप', client: 'प्रकाश कुमार', status: 'रुका हुआ', budget: '₹2,50,000', progress: 40, startDate: '2024-02-20' },
    { id: 'proj_5', name: 'इन्वेंटरी मैनेजमेंट सिस्टम', client: 'राजेश इंडस्ट्रीज', status: 'जारी', budget: '₹2,00,000', progress: 60, startDate: '2024-03-25' },
];


export default function AllProjectsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = allProjects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.client.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
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
                                    {new Date(project.startDate).toLocaleDateString('hi-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <User className="h-3 w-3 text-muted-foreground"/>
                                  {project.client}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-3 w-3 text-muted-foreground"/>
                                    {project.budget}
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
          </CardContent>
      </Card>
    </div>
  );
}
