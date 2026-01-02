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
  List,
  Search,
  Download,
  Copy
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Using the same mock data for consistency
const mockUsers = [
    { id: 'usr_1', name: 'प्रकाश कुमार', email: 'prakash@example.com', phone: '+91 98765 43210', address: '123, गांधी नगर, दिल्ली', joined: '15 मार्च, 2024' },
    { id: 'usr_2', name: 'राजेश इंडस्ट्रीज', email: 'contact@rajeshind.com', phone: '+91 91234 56789', address: '456, नेहरू प्लेस, मुंबई', joined: '22 फरवरी, 2024' },
    { id: 'usr_3', name: 'नेहा गुप्ता', email: 'neha.gupta@mail.com', phone: '+91 87654 32109', address: '789, सेक्टर 18, नोएडा', joined: '10 जनवरी, 2024' },
    { id: 'usr_4', name: 'स्मार्ट सॉल्यूशंस', email: 'support@smartsol.dev', phone: '+91 76543 21098', address: '101, आईटी पार्क, बैंगलोर', joined: '05 अप्रैल, 2024' },
];

export default function UserDetailsListPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = mockUsers.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.phone.includes(searchQuery) ||
    u.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = (message: string) => {
    toast({
      title: 'सुविधा जल्द ही उपलब्ध होगी',
      description: message,
    });
  };

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
                 <Button variant="outline" onClick={() => handleAction('डेटा को CSV फ़ाइल के रूप में डाउनलोड करने की सुविधा जल्द ही आएगी।')}>
                    <Download className="mr-2 h-4 w-4" /> CSV डाउनलोड करें
                 </Button>
                  <Button variant="outline" onClick={() => handleAction('टेबल डेटा आपके क्लिपबोर्ड पर कॉपी हो जाएगा।')}>
                    <Copy className="mr-2 h-4 w-4" /> डेटा कॉपी करें
                 </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>नाम</TableHead>
                          <TableHead>ईमेल</TableHead>
                          <TableHead>मोबाइल नंबर</TableHead>
                          <TableHead>पता</TableHead>
                          <TableHead>सदस्यता तिथि</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {filteredUsers.map(user => (
                          <TableRow key={user.id}>
                              <TableCell className="font-medium">{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.phone}</TableCell>
                              <TableCell>{user.address}</TableCell>
                              <TableCell>{user.joined}</TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
              {filteredUsers.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                    <p>"{searchQuery}" के लिए कोई यूज़र नहीं मिला।</p>
                </div>
              )}
          </CardContent>
      </Card>
    </div>
  );
}
