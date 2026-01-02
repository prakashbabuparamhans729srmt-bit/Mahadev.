
'use client';

import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
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
  List,
  Search,
  Download,
  Copy,
  Users,
  Loader2,
  ShieldAlert
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query } from 'firebase/firestore';

export default function UserDetailsListPage() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [searchQuery, setSearchQuery] = useState('');
  
  const clientsQuery = useMemo(() => {
      if (!firestore) return null;
      return query(collection(firestore, 'clients'));
  }, [firestore]);

  const { data: clients, isLoading, error } = useCollection(clientsQuery);

  const filteredUsers = useMemo(() => {
    if (!clients) return [];
    return clients.filter(u => {
      const fullName = `${u.firstName || ''} ${u.lastName || ''}`.trim().toLowerCase();
      const email = (u.email || '').toLowerCase();
      const phone = u.phone || '';
      const lowerCaseQuery = searchQuery.toLowerCase();
      
      return fullName.includes(lowerCaseQuery) ||
             email.includes(lowerCaseQuery) ||
             phone.includes(lowerCaseQuery);
    });
  }, [clients, searchQuery]);


  const handleAction = (message: string) => {
    toast({
      title: 'सुविधा जल्द ही उपलब्ध होगी',
      description: message,
    });
  };
  
  const copyToClipboard = () => {
    if (!clients || clients.length === 0) return;
    const csvContent = [
      "Name,Email,Phone,Company",
      ...clients.map(u => `"${(u.firstName || '')} ${(u.lastName || '')}",${u.email || ''},${u.phone || ''},"${u.companyName || ''}"`)
    ].join("\n");
    navigator.clipboard.writeText(csvContent);
    toast({ description: "ग्राहक डेटा क्लिपबोर्ड पर कॉपी किया गया।" });
  };
  
  const downloadCSV = () => {
    if (!clients || clients.length === 0) return;
    const csvContent = "data:text/csv;charset=utf-8," + [
      "Name,Email,Phone,Company",
      ...clients.map(u => `"${(u.firstName || '')} ${(u.lastName || '')}",${u.email || ''},${u.phone || ''},"${u.companyName || ''}"`)
    ].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "user_details_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
            <List className="h-7 w-7 text-primary"/>
            यूज़र डिटेल्स लिस्ट
          </h1>
          <p className="text-muted-foreground">
            सभी पंजीकृत ग्राहकों की विस्तृत सूची देखें।
          </p>
        </div>
      </div>
      
      <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="कुछ भी खोजें..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
              </div>
              <div className="flex items-center gap-2">
                 <Button variant="outline" onClick={downloadCSV} disabled={isLoading || !clients || clients.length === 0}>
                    <Download className="mr-2 h-4 w-4" /> CSV डाउनलोड करें
                 </Button>
                  <Button variant="outline" onClick={copyToClipboard} disabled={isLoading || !clients || clients.length === 0}>
                    <Copy className="mr-2 h-4 w-4" /> डेटा कॉपी करें
                 </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
              {isLoading && <div className="flex justify-center items-center h-60"><Loader2 className="h-8 w-8 animate-spin" /></div>}
              {error && <div className="text-center text-destructive p-4"><ShieldAlert className="mx-auto h-8 w-8 mb-2" />{error.message}</div>}
              {!isLoading && filteredUsers.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>नाम</TableHead>
                            <TableHead>ईमेल</TableHead>
                            <TableHead>मोबाइल नंबर</TableHead>
                            <TableHead>कंपनी</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map(user => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{`${user.firstName || ''} ${user.lastName || ''}`.trim()}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone || 'N/A'}</TableCell>
                                <TableCell>{user.companyName || 'N/A'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
              ) : (
                !isLoading && <div className="text-center py-20 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg">
                        {searchQuery ? `"${searchQuery}" के लिए कोई यूज़र नहीं मिला` : 'अभी कोई यूज़र डेटा नहीं है'}
                    </h3>
                    <p className="text-sm">
                        {searchQuery ? 'कृपया अपनी खोज बदलें।' : 'जब नए यूज़र जुड़ेंगे, तो उनकी जानकारी यहाँ दिखाई देगी।'}
                    </p>
                </div>
              )}
          </CardContent>
      </Card>
    </div>
  );
}
