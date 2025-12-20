
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  Upload,
  Folder,
  FileText,
  FileArchive,
  FileVideo,
  FileImage,
  MoreVertical,
  Search,
  Eye,
  Download,
  Edit2,
  Trash2,
  Play,
  ArrowRight,
  List,
  LayoutGrid,
} from 'lucide-react';

const files = [
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
]

const getFileIcon = (type: string) => {
  switch (type) {
    case 'folder': return <Folder className="h-5 w-5 text-yellow-500" />;
    case 'figma': return <FileText className="h-5 w-5 text-purple-500" />;
    case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
    case 'image': return <FileImage className="h-5 w-5 text-blue-500" />;
    case 'video': return <FileVideo className="h-5 w-5 text-green-500" />;
    default: return <FileText className="h-5 w-5 text-gray-500" />;
  }
};

export default function FileManagerPage() {
  return (
    <div className="flex min-h-full w-full flex-col bg-background">
      <main className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold font-headline flex items-center gap-2">
                <Folder className="h-5 w-5 text-primary" />
                फ़ाइल मैनेजर - प्रोजेक्ट #1042
            </h1>
             <Button>
                <Upload className="mr-2 h-4 w-4" /> अपलोड
            </Button>
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
                        <Button variant="outline" size="icon">
                            <List className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
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
                       <div className="flex items-center justify-end gap-2">
                            {file.type === 'video' ? <Button variant="ghost" size="icon"><Play className="h-4 w-4" /></Button> : <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>}
                            <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                            {file.type.includes('figma') && <Button variant="ghost" size="icon"><Edit2 className="h-4 w-4" /></Button>}
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
                        <CardTitle className="font-headline text-lg">🖼️ फोटो प्रीव्यू:</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-5 gap-2">
                            {Array.from({length: 5}).map((_, i) => (
                                <div key={i} className="aspect-square bg-secondary rounded-md flex items-center justify-center text-muted-foreground">
                                    {i+1}/5
                                </div>
                            ))}
                        </div>
                         <div className="flex justify-between items-center">
                             <div className="flex gap-2">
                                <Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4"/></Button>
                                <Button variant="outline" size="icon"><ArrowRight className="h-4 w-4"/></Button>
                             </div>
                             <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="text-destructive border-destructive/50 hover:bg-destructive/10 hover:text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4"/> हटाएं
                                </Button>
                                <Button variant="outline" size="sm">
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
                        <Button variant="outline" size="sm" className="w-full">↩️ पिछला वर्जन रिस्टोर</Button>
                        <Button variant="link" size="sm">📋 चेंज लॉग</Button>
                    </CardFooter>
                </Card>
             </div>
        </div>
      </main>
    </div>
  );
}
