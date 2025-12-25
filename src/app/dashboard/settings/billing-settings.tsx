'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Download, Plus, Edit, Trash2, ArrowRight } from 'lucide-react';
import Image from 'next/image';


const invoices = [
    { id: 'INV-2024-003', date: '20 अप्रैल, 2024', amount: '₹1,50,000', status: 'Paid' },
    { id: 'INV-2024-002', date: '20 मार्च, 2024', amount: '₹2,00,000', status: 'Paid' },
    { id: 'INV-2024-001', date: '20 फरवरी, 2024', amount: '₹1,75,000', status: 'Paid' },
];

export function BillingSettings() {
  const { toast } = useToast();

  const handleAction = (message: string) => {
    toast({
      title: "सुविधा जल्द ही आ रही है",
      description: message,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>मेरी सदस्यता</CardTitle>
          <CardDescription>
            अपनी सदस्यता योजना और बिलिंग विवरण प्रबंधित करें।
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <div>
              <p className="font-semibold">आपकी वर्तमान योजना</p>
              <h3 className="text-2xl font-bold text-primary">प्रीमियम सदस्यता</h3>
              <p className="text-sm text-muted-foreground">आपकी योजना 31 दिसंबर, 2024 को नवीनीकृत होगी।</p>
            </div>
            <Button className="mt-4 sm:mt-0" onClick={() => handleAction('योजना अपग्रेड पेज जल्द ही उपलब्ध होगा।')}>
              योजना अपग्रेड करें <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>भुगतान विधियाँ</CardTitle>
                <CardDescription>
                    अपनी सहेजी गई भुगतान विधियों को जोड़ें और प्रबंधित करें।
                </CardDescription>
            </div>
            <Button variant="outline" onClick={() => handleAction('नई भुगतान विधि जोड़ने की सुविधा जल्द ही उपलब्ध होगी।')}>
                <Plus className="mr-2 h-4 w-4" /> नई विधि जोड़ें
            </Button>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                    <Image src="https://placehold.co/40x26/D1D5DB/374151?text=VISA" alt="Visa" width={40} height={26} />
                    <div>
                        <p className="font-semibold">Visa ending in 1234</p>
                        <p className="text-sm text-muted-foreground">समाप्ति 12/25</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleAction('भुगतान विधि संपादित करने की सुविधा जल्द ही आएगी।')}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleAction('भुगतान विधि हटाने की सुविधा जल्द ही आएगी।')} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </div>
            </div>
             <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                    <Image src="https://placehold.co/40x26/D1D5DB/374151?text=UPI" alt="UPI" width={40} height={26} />
                    <div>
                        <p className="font-semibold">UPI</p>
                        <p className="text-sm text-muted-foreground">example@upi</p>
                    </div>
                </div>
                 <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleAction('UPI संपादित करने की सुविधा जल्द ही आएगी।')}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleAction('UPI हटाने की सुविधा जल्द ही आएगी।')} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </div>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>बिलिंग इतिहास</CardTitle>
          <CardDescription>
            अपने पिछले चालान देखें और डाउनलोड करें।
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>चालान आईडी</TableHead>
                <TableHead>दिनांक</TableHead>
                <TableHead>राशि</TableHead>
                <TableHead>स्थिति</TableHead>
                <TableHead className="text-right">कार्रवाई</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant={invoice.status === 'Paid' ? 'default' : 'secondary'} className={invoice.status === 'Paid' ? 'bg-green-500/20 text-green-700' : ''}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleAction(`चालान ${invoice.id} डाउनलोड करने की सुविधा जल्द ही उपलब्ध होगी।`)}>
                      <Download className="mr-2 h-4 w-4" />
                      डाउनलोड
                    </Button>
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
