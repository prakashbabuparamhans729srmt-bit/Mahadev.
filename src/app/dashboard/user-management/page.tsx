
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
import { useUser, type User, useFirestore, useCollection } from '@/firebase';
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

// This is a placeholder. In a real app, this would be determined from a secure source like a custom claim.
const checkIsAdmin = (user: User | null): boolean => {
  if (!user) return false;
  // Using email for identification as requested by the user.
  const ADMIN_EMAIL = 'divyahanssuperpower@gmail.com';
  return user.email === ADMIN_EMAIL;
}

export default function UserManagementPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const clientsQuery = useMemo(() => {
      if (!firestore || !isAdmin) return null;
      return query(collection(firestore, 'clients'));
  }, [firestore, isAdmin]);

  const { data: clients, isLoading: clientsLoading, error: clientsError } = useCollection(clientsQuery);
  
  const filteredClients = useMemo(() => {
    if (!clients) return [];
    return clients.filter(client => 
        (client.firstName + ' ' + client.lastName).toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [clients, searchQuery]);


  useEffect(() => {
    if (!isUserLoading) {
      const adminStatus = checkIsAdmin(user);
      setIsAdmin(adminStatus);
      // Main loading state should depend on both auth and data loading
      if (!adminStatus) {
        setIsLoading(false);
      }
    }
  }, [user, isUserLoading]);

  // Combine loading states
  const combinedLoading = isLoading || (isAdmin && clientsLoading);

  if (combinedLoading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4">अनुमतियों और ग्राहकों की जाँच हो रही है...</p>
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
                  <Input 
                    placeholder="ग्राहक खोजें (नाम या ईमेल से)..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
              </div>
          </CardHeader>
          <CardContent>
              {clientsError && <p className="text-destructive text-center">त्रुटि: {clientsError.message}</p>}
              {!clientsLoading && filteredClients.length > 0 ? (
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
                                            <AvatarFallback>{(client.firstName?.[0] || 'U').toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{`${client.firstName} ${client.lastName}`}</p>
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
                                            <DropdownMenuItem onClick={() => toast({ description: `ग्राहक ${client.firstName} को संपादित किया गया।` })}>संपादित करें</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive" onClick={() => toast({ description: `ग्राहक ${client.firstName} को हटा दिया गया।`, variant: 'destructive' })}>हटाएं</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
              ) : (
                !clientsLoading && <div className="text-center py-20 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg">
                      {searchQuery ? `"${searchQuery}" के लिए कोई ग्राहक नहीं मिला` : 'अभी कोई ग्राहक नहीं है'}
                    </h3>
                    <p className="text-sm">जब नए ग्राहक साइन अप करेंगे, तो वे यहां दिखाई देंगे।</p>
                </div>
              )}
          </CardContent>
      </Card>
    </div>
  );
}
