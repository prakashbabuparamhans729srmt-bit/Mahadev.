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

function StripeIcon() {
    return (
        <svg width="48" height="20" viewBox="0 0 48 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43.0839 12.2266L45.4746 13.0859C46.3339 13.3859 47.0139 12.8266 47.1939 12.0466L47.9939 8.24995C48.1139 7.71995 47.8139 7.18995 47.2739 7.03995L38.4072 4.31662C37.8672 4.16662 37.3372 4.46662 37.1872 5.00662L33.7239 17.5333C33.5739 18.0733 33.8739 18.6033 34.4139 18.7533L37.0339 19.5333C37.5739 19.6833 38.1039 19.3833 38.2539 18.8433L40.1606 12.6366C40.2306 12.3966 40.4872 12.2266 40.7439 12.2266H43.0839Z" fill="#635BFF"/>
            <path d="M36.9639 2.56995C36.9639 1.54995 36.1439 0.729949 35.1239 0.729949C34.1039 0.729949 33.2839 1.54995 33.2839 2.56995V14.1533C33.2839 15.1733 34.1039 15.9933 35.1239 15.9933C36.1439 15.9933 36.9639 15.1733 36.9639 14.1533V2.56995Z" fill="#635BFF"/>
            <path d="M25.4103 15.42C25.9803 15.69 26.6103 15.49 26.8803 14.92L31.6303 6.13328C31.9003 5.56328 31.7003 4.93328 31.1303 4.66328L29.3803 3.86995C28.8103 3.60995 28.1803 3.80662 27.9103 4.37662L23.1603 13.1633C22.8903 13.7333 23.0903 14.3633 23.6603 14.6333L25.4103 15.42Z" fill="#635BFF"/>
            <path d="M22.0945 13.1966C22.0945 14.7366 20.8878 15.9866 19.3478 15.9866H14.4712C13.0612 15.9866 12.0145 14.9399 11.9078 13.5333L11.0212 2.94995C10.9712 2.36995 11.4012 1.86995 11.9812 1.81995L14.7545 1.51662C15.3345 1.46662 15.8345 1.89662 15.8845 2.47662L16.4812 9.07328C16.5212 9.47328 16.8512 9.77328 17.2512 9.77328H18.9145C20.6545 9.77328 22.0945 8.29328 22.0945 6.51328V3.04995C22.0945 2.15995 21.3645 1.42995 20.4745 1.42995H13.5678C12.4478 1.42995 11.5345 2.34662 11.5345 3.46662V3.79662C11.5345 4.90662 12.4345 5.81662 13.5445 5.81662H17.8212C18.1512 5.81662 18.4212 6.08662 18.4212 6.41662V6.51328C18.4212 7.34662 17.7512 8.01328 16.9178 8.01328H12.8712C11.6645 8.01328 10.6645 8.95662 10.5945 10.1566L9.75452 19.9933C9.72119 20.4733 10.0612 20.8966 10.5412 20.9299L13.1412 21.1333C13.6212 21.1666 14.0445 20.8266 14.0778 20.3466L14.7312 11.5233C14.7912 10.7433 15.4245 10.1566 16.2112 10.1566H17.5812C19.9712 10.1566 22.0945 11.5833 22.0945 13.1966Z" fill="#635BFF"/>
            <path d="M10.5739 0.73338C9.55389 0.73338 8.73389 1.55338 8.73389 2.57338V14.03C8.73389 15.05 9.55389 15.87 10.5739 15.87C11.5939 15.87 12.4139 15.05 12.4139 14.03V2.57338C12.4139 1.55338 11.5939 0.73338 10.5739 0.73338Z" fill="#635BFF"/>
            <path d="M7.34906 4.66328C6.77906 4.93328 6.57906 5.56328 6.84906 6.13328L11.5991 14.92C11.8691 15.49 12.4991 15.69 13.0691 15.42L14.8191 14.6266C15.3891 14.3566 15.5891 13.7266 15.3191 13.1566L10.5691 4.36995C10.2991 3.79995 9.66906 3.60328 9.09906 3.87328L7.34906 4.66328Z" fill="#635BFF"/>
        </svg>
    )
}

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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-secondary/50 rounded-2xl border border-border/50">
            <div>
              <p className="font-semibold">आपकी वर्तमान योजना</p>
              <h3 className="text-2xl font-bold text-primary">प्रीमियम सदस्यता</h3>
              <p className="text-sm text-muted-foreground">आपकी योजना 31 दिसंबर, 2024 को नवीनीकृत होगी।</p>
            </div>
            <div className="mt-4 sm:mt-0 text-right">
              <Button onClick={() => handleAction('योजना अपग्रेड पेज जल्द ही उपलब्ध होगा।')} className="animate-fast-blinking-glow">
                योजना अपग्रेड करें <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-xs text-muted-foreground mt-2 flex items-center justify-end gap-1.5">
                द्वारा संचालित 
                <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">
                  <StripeIcon />
                </a>
              </p>
            </div>
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
                    <Image src="https://picsum.photos/seed/visa/40/26" alt="Visa" width={40} height={26} />
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
                    <Image src="https://picsum.photos/seed/upi/40/26" alt="UPI" width={40} height={26} />
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
