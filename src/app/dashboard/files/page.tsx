'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft, Upload, Folder, FileText, MoreVertical, Search, Eye, Download, Edit2, Trash2, Play, ArrowRight, List, LayoutGrid
} from 'lucide-react';
import { getFileIcon } from '@/lib/file-icons.tsx';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';


const initialFiles = [
  { name: 'डिज़ाइन_स्केच', type: 'folder', size: '--', modified: '15/04/24' },
  { name: 'homepage.fig', type: 'figma', size: '2.4 MB', modified: '16/04/24' },
  { name: 'dashboard.fig', type: 'figma', size: '3.1 MB', modified: '17/04/24' },
  { name: 'color_palette.png', type: 'image', size: '1.2 MB', modified: '18/04/24' },
  { name: 'क्लाइंट_फीडबैक', type: 'folder', size: '--', modified: '19/04/24' },
  { name: 'फीडबैक_v1.pdf', type: 'pdf', size: '850 KB', modified: '19/04/24' },
  { name: 'डेमो_video.mp4', type: 'video', size: '45.2 MB', modified: '20/04/24' },
];

const versions = [
    { version: 'v1.2', date: '20/04/24', author: 'अमित', comment: '"कलर करेक्शन"' },
    { version: 'v1.1', date: '19/04/24', author: 'प्रिया', comment: '"लोगो अपडेट"' },
    { version: 'v1.0', date: '18/04/24', author: 'राहुल', comment: '"प्रारंभिक ड्राफ्ट"' },
];

export default function FileManagerPage() {
    const { toast } = useToast();
    const [files, setFiles] = useState(initialFiles);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            toast({
                title: 'फ़ाइल चयनित',
                description: `${file.name} अपलोड के लिए तैयार है।`,
            });
            // Here you would typically handle the file upload
        }
    };

    const handleAction = (message: string) => {
        toast({
            title: 'कार्रवाई',
            description: message,
        });
    };
    
    const handleDelete = (fileName: string) => {
        setFiles(files.filter(f => f.name !== fileName));
        toast({
            title: 'फ़ाइल हटाई गई',
            description: `${fileName} को सफलतापूर्वक हटा दिया गया है।`,
            variant: 'destructive',
        });
    };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold font-headline flex items-center gap-2">
                <Folder className="h-5 w-5 text-primary" />
                फ़ाइल मैनेजर - प्रोजेक्ट #1042
            </h1>
             <Button onClick={handleUploadClick}>
                <Upload className="mr-2 h-4 w-4" /> अपलोड
            </Button>
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
        </div>
        <Card>
            <CardHeader className="border-b pb-4">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        पथ: प्रोजेक्ट्स &gt; 1042 &gt; डिज़ाइन &gt; फाइनल
                    </div>
                     <div className="flex items-center gap-2">
                        <div className="relative flex items-center">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="खोजें..." className="pl-9" />
                        </div>
                        <Button variant="outline" size="icon" onClick={() => handleAction('सूची दृश्य सक्रिय।')}>
                            <List className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleAction('ग्रिड दृश्य जल्द ही आ रहा है।')}>
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">नाम</TableHead>
                  <TableHead>आकार</TableHead>
                  <TableHead>संशोधित</TableHead>
                  <TableHead className="text-right">क्रिया</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map((file) => (
                  <TableRow key={file.name}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.type)}
                        <span>{file.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell>{file.modified}</TableCell>
                    <TableCell className="text-right">
                       <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleAction(`प्रीव्यू '${file.name}'`)}><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => handleAction(`डाउनलोड हो रहा है '${file.name}'`)}><Download className="h-4 w-4" /></Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>क्या आप निश्चित हैं?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        यह क्रिया पूर्ववत नहीं की जा सकती। यह स्थायी रूप से '{file.name}' फ़ाइल को हटा देगा।
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>रद्द करें</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(file.name)}>हटाएं</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                       </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-lg">🖼️ फोटो प्रीव्यू: color_palette.png</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="aspect-video bg-secondary rounded-md flex items-center justify-center text-muted-foreground overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1593693397649-3ca9c877a192?q=80&w=800" alt="Color Palette" className="w-full h-full object-cover" />
                        </div>
                         <div className="flex justify-between items-center">
                             <div className="flex gap-2">
                                <Button variant="outline" size="icon" onClick={() => handleAction('पिछली छवि लोड हो रही है।')}><ArrowLeft className="h-4 w-4"/></Button>
                                <Button variant="outline" size="icon" onClick={() => handleAction('अगली छवि लोड हो रही है।')}><ArrowRight className="h-4 w-4"/></Button>
                             </div>
                             <div className="flex gap-2">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline" size="sm" className="text-destructive border-destructive/50 hover:bg-destructive/10 hover:text-destructive">
                                            <Trash2 className="mr-2 h-4 w-4"/> हटाएं
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>क्या आप निश्चित हैं?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            यह क्रिया स्थायी रूप से इस छवि को हटा देगी।
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>रद्द करें</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleAction('छवि हटा दी गई।')}>हटाएं</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                <Button variant="outline" size="sm" onClick={() => handleAction('छवि संपादन इंटरफ़ेस खुल रहा है।')}>
                                    <Edit2 className="mr-2 h-4 w-4"/> एडिट
                                </Button>
                            </div>
                         </div>
                    </CardContent>
                </Card>
            </div>
             <div>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-lg">📊 वर्जन हिस्ट्री:</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         {versions.map(v => (
                             <div key={v.version} className="text-sm">
                                <p className="font-semibold">{v.version} ({v.date}) - {v.author}:</p>
                                <p className="text-muted-foreground text-xs">{v.comment}</p>
                             </div>
                         ))}
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                        <Button variant="outline" size="sm" className="w-full" onClick={() => handleAction('v1.1 को पुनर्स्थापित किया जा रहा है।')}>↩️ पिछला वर्जन रिस्टोर</Button>
                        <Button variant="link" size="sm" onClick={() => handleAction('चेंज लॉग दिखाया जा रहा है।')}>📋 चेंज लॉग</Button>
                    </CardFooter>
                </Card>
             </div>
        </div>
      </div>
    </div>
  );
}
