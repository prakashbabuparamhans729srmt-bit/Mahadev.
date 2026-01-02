
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  ShieldAlert,
  Loader2,
  MoreHorizontal,
  Plus,
  Search,
  Download,
  UserCheck,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useCollection } from '@/firebase';
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
import { collection, query } from 'firebase/firestore';


export default function UserManagementPage({ isAuthorized }: { isAuthorized: boolean }) {
  const firestore = useFirestore();
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const clientsQuery = useMemo(() => {
      if (!firestore || !isAuthorized) return null;
      return query(collection(firestore, 'clients'));
  }, [firestore, isAuthorized]);

  const { data: clients, isLoading, error } = useCollection(clientsQuery);
  
  const filteredClients = useMemo(() => {
    if (!clients) return [];
    return clients.filter(client => 
        (client.firstName + ' ' + client.lastName).toLowerCase().includes(searchQuery.toLowerCase()) ||
        (client.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [clients, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4">ग्राहकों की सूची लोड हो रही है...</p>
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
                  <Input 
                    placeholder="ग्राहक खोजें (नाम या ईमेल से)..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
              </div>
          </CardHeader>
          <CardContent>
              {error && <div className="text-destructive text-center p-4 bg-destructive/10 rounded-md"><ShieldAlert className="inline-block mr-2" />त्रुटि: {error.message}</div>}
              {!isLoading && !error && filteredClients.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ग्राहक</TableHead>
                            <TableHead>भूमिका</TableHead>
                            <TableHead className="text-right">कार्रवाई</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredClients.map(client => (
                            <TableRow key={client.id}>
                                <TableCell>
                                <Link href={`/dashboard/user-management/${client.id}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                                        <Avatar>
                                            <AvatarImage src={client.photoURL} />
                                            <AvatarFallback>{(client.firstName?.[0] || client.email?.[0] || 'U').toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{`${client.firstName || ''} ${client.lastName || ''}`.trim() || client.email}</p>
                                            <p className="text-xs text-muted-foreground">{client.email}</p>
                                        </div>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary">ग्राहक</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>कार्रवाई</DropdownMenuLabel>
                                            <DropdownMenuItem asChild>
                                            <Link href={`/dashboard/user-management/${client.id}`}>विवरण देखें</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => toast({ description: `ग्राहक ${client.firstName || client.email} को संपादित किया गया।` })}>संपादित करें</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive" onClick={() => toast({ description: `ग्राहक ${client.firstName || client.email} को हटा दिया गया।`, variant: 'destructive' })}>हटाएं</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
              ) : !isLoading && !error && (
                <div className="text-center py-20 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg">
                      {searchQuery ? `"${searchQuery}" के लिए कोई ग्राहक नहीं मिला` : 'अभी कोई ग्राहक नहीं है'}
                    </h3>
                    <p className="text-sm">
                      {searchQuery ? 'कृपया अपनी खोज बदलें।' : 'जब नए ग्राहक साइन अप करेंगे, तो वे यहां दिखाई देंगे।'}
                    </p>
                </div>
              )}
          </CardContent>
      </Card>
    </div>
  );
}
