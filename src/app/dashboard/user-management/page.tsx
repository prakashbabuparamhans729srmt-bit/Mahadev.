'use client';

import React, { useMemo } from 'react';
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
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Users,
  Plus,
  Trash2,
  MoreHorizontal,
  Loader2,
  ShieldAlert,
} from 'lucide-react';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore } from '@/firebase';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName?: string;
}

export default function UserManagementPage() {
  const firestore = useFirestore();
  const { toast } = useToast();

  const clientsQuery = useMemo(() => {
    if (!firestore) return null;
    return collection(firestore, 'clients');
  }, [firestore]);

  const { data: clients, isLoading, error } = useCollection<Client>(clientsQuery);

  const handleDeleteClient = async (clientId: string) => {
    if (!firestore) return;
    try {
      await deleteDoc(doc(firestore, 'clients', clientId));
      toast({
        title: 'ग्राहक हटाया गया',
        description: 'ग्राहक को सफलतापूर्वक हटा दिया गया है।',
      });
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'त्रुटि',
        description: 'ग्राहक को हटाते समय कोई त्रुटि हुई।',
      });
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center text-destructive bg-destructive/10 rounded-lg">
          <ShieldAlert className="h-8 w-8 mb-2" />
          <p className="font-semibold">डेटा लोड करने में विफल!</p>
          <p className="text-xs max-w-sm mt-1">
            ऐसा लगता है कि आपके पास इस संसाधन तक पहुंचने की अनुमति नहीं है। कृपया सुनिश्चित करें कि आप एक एडमिन के रूप में लॉग इन हैं।
          </p>
        </div>
      );
    }

    if (!clients || clients.length === 0) {
      return (
        <div className="text-center h-64 flex flex-col justify-center items-center">
          <p className="text-muted-foreground">अभी तक कोई ग्राहक नहीं मिला।</p>
          <Button variant="outline" className="mt-4" onClick={() => toast({ description: 'यह सुविधा जल्द ही आ रही है।' })}>
            <Plus className="mr-2 h-4 w-4" />
            पहला ग्राहक जोड़ें
          </Button>
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>पूरा नाम</TableHead>
            <TableHead>ईमेल</TableHead>
            <TableHead>फ़ोन</TableHead>
            <TableHead>कंपनी</TableHead>
            <TableHead className="text-right">कार्रवाई</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">
                {client.firstName} {client.lastName}
              </TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone || '-'}</TableCell>
              <TableCell>{client.companyName || '-'}</TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>क्या आप निश्चित हैं?</AlertDialogTitle>
                      <AlertDialogDescription>
                        यह क्रिया पूर्ववत नहीं की जा सकती। यह स्थायी रूप से ग्राहक '{client.firstName} {client.lastName}' को हटा देगा।
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>रद्द करें</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteClient(client.id)}
                      >
                        हटाएं
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
              <Users />
              ग्राहक प्रबंधन
            </CardTitle>
            <CardDescription>
              यहां सभी पंजीकृत ग्राहकों को देखें और प्रबंधित करें।
            </CardDescription>
          </div>
          <Button onClick={() => toast({ description: 'यह सुविधा जल्द ही आ रही है।' })}>
            <Plus className="mr-2 h-4 w-4" /> नया ग्राहक जोड़ें
          </Button>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </div>
  );
}
