'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft, Upload, Folder, FileText, MoreVertical, Search, Eye, Download, Edit2, Trash2, Play, ArrowRight, List, LayoutGrid, Loader2, ShieldAlert
} from 'lucide-react';
import { getFileIcon } from '@/lib/file-icons';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useCollection, useFirestore } from '@/firebase';
import { collection, deleteDoc, doc } from 'firebase/firestore';


const versions = [
    { version: 'v1.2', date: '20/04/24', author: 'अमित', comment: '"कलर करेक्शन"' },
    { version: 'v1.1', date: '19/04/24', author: 'प्रिया', comment: '"लोगो अपडेट"' },
    { version: 'v1.0', date: '18/04/24', author: 'राहुल', comment: '"प्रारंभिक ड्राफ्ट"' },
];

const ImagePreviewCard = dynamic(() => Promise.resolve(({ handleAction }: { handleAction: (message: string) => void }) => (
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
                    <Button variant="outline" size="icon" onClick={() => handleAction('अभी कोई पिछली छवि नहीं है।')}><ArrowLeft className="h-4 w-4"/></Button>
                    <Button variant="outline" size="icon" onClick={() => handleAction('अभी कोई अगली छवि नहीं है।')}><ArrowRight className="h-4 w-4"/></Button>
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
                    <Button variant="outline" size="sm" onClick={() => handleAction('छवि संपादन इंटरफ़ेस जल्द ही आ रहा है।')}>
                        <Edit2 className="mr-2 h-4 w-4"/> एडिट
                    </Button>
                </div>
             </div>
        </CardContent>
    </Card>
)), {
    loading: () => <Skeleton className="h-[400px] w-full" />,
    ssr: false,
});

const VersionHistoryCard = dynamic(() => Promise.resolve(({ handleAction }: { handleAction: (message: string) => void }) => (
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
            <Button variant="outline" size="sm" className="w-full" onClick={() => handleAction('v1.1 को पुनर्स्थापित करने की सुविधा जल्द ही आएगी।')}>↩️ पिछला वर्जन रिस्टोर</Button>
            <Button variant="link" size="sm" onClick={() => handleAction('पूर्ण चेंज लॉग दिखाने की सुविधा जल्द ही आएगी।')}>📋 चेंज लॉग</Button>
        </CardFooter>
    </Card>
)), {
    loading: () => <Skeleton className="h-[300px] w-full" />,
    ssr: false,
});

const DUMMY_PROJECT_ID = '1042'; // This should be dynamic based on user's project

export default function FileManagerPage() {
    const { toast } = useToast();
    const firestore = useFirestore();
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const filesQuery = useMemo(() => {
        if (!firestore) return null;
        return collection(firestore, `projects/${DUMMY_PROJECT_ID}/files`);
    }, [firestore]);

    const { data: files, setData: setFiles, isLoading, error } = useCollection(filesQuery);

    const filteredFiles = useMemo(() => {
        if (!files) return [];
        const lowercasedQuery = searchQuery.toLowerCase();
        return files.filter(file => 
            file.name.toLowerCase().includes(lowercasedQuery)
        );
    }, [searchQuery, files]);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            toast({
                title: 'फ़ाइल चयनित',
                description: `${file.name} अपलोड के लिए तैयार है। (अपलोड सुविधा जल्द ही आ रही है)`,
            });
            // Here you would typically handle the file upload
        }
    };

    const handleAction = (message: string) => {
        toast({
            title: 'सुविधा उपलब्ध नहीं है',
            description: message,
        });
    };
    
    const handleDelete = async (fileId: string, fileName: string) => {
        if (!firestore) return;
        try {
            await deleteDoc(doc(firestore, `projects/${DUMMY_PROJECT_ID}/files`, fileId));
            toast({
                title: 'फ़ाइल हटाई गई',
                description: `${fileName} को सफलतापूर्वक हटा दिया गया है।`,
                variant: 'destructive',
            });
        } catch (e) {
            toast({
                title: 'त्रुटि',
                description: 'फ़ाइल हटाने में विफल।',
                variant: 'destructive',
            });
        }
    };

  const renderContent = () => {
    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }
    if (error) {
        return <div className="text-center py-10"><ShieldAlert className="mx-auto h-8 w-8 text-destructive" /><p className="mt-2 text-destructive">फाइलें लोड करने में विफल।</p></div>;
    }
    if (filteredFiles.length === 0) {
        return <div className="text-center py-10"><p className="text-muted-foreground">कोई फाइल नहीं मिली।</p></div>;
    }

    if (viewMode === 'grid') {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
                {filteredFiles.map((file) => (
                    <Card key={file.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                           <div className="text-4xl group-hover:scale-110 transition-transform">{getFileIcon(file.type)}</div>
                           <p className="text-xs font-semibold truncate w-full">{file.name}</p>
                           <p className="text-xs text-muted-foreground">{file.size}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
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
          {filteredFiles.map((file) => (
            <TableRow key={file.id}>
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
                      <Button variant="ghost" size="icon" onClick={() => handleAction(`'${file.name}' का प्रीव्यू दिखाना अभी संभव नहीं है।`)}><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleAction(`'${file.name}' को डाउनलोड करने की सुविधा जल्द ही आएगी।`)}><Download className="h-4 w-4" /></Button>
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
                              <AlertDialogAction onClick={() => handleDelete(file.id, file.name)}>हटाएं</AlertDialogAction>
                              </AlertDialogFooter>
                          </AlertDialogContent>
                      </AlertDialog>
                 </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" asChild className="md:hidden">
                    <Link href="/dashboard">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                 <Link href="/dashboard/project-oversight" className="cursor-pointer">
                    <h1 className="text-xl font-bold font-headline flex items-center gap-2">
                        <Folder className="h-5 w-5 text-primary" />
                        फ़ाइल मैनेजर - प्रोजेक्ट #{DUMMY_PROJECT_ID}
                    </h1>
                </Link>
            </div>
             <Button onClick={handleUploadClick}>
                <Upload className="mr-2 h-4 w-4" /> अपलोड
            </Button>
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
        </div>
        <Card>
            <CardHeader className="border-b pb-4">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        पथ: प्रोजेक्ट्स &gt; {DUMMY_PROJECT_ID} &gt; सभी फाइलें
                    </div>
                     <div className="flex items-center gap-2">
                        <div className="relative flex items-center">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                                placeholder="खोजें..." 
                                className="pl-9" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')}>
                            <List className="h-4 w-4" />
                        </Button>
                        <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('grid')}>
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
          <CardContent className="p-0">
            {renderContent()}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <ImagePreviewCard handleAction={handleAction} />
            </div>
             <div>
                <VersionHistoryCard handleAction={handleAction} />
             </div>
        </div>
      </div>
    </div>
  );
}

    