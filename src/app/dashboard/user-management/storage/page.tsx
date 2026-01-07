
'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Archive,
  Loader2,
  ShieldAlert,
  Search,
  Upload,
  Eye,
  Download,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/firebase';
import { firebaseWithRetry } from '@/lib/firebase-retry';
import { getFileIcon } from '@/lib/file-icons';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, collection, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 10);

// API call to get all projects (admin only)
async function getAllProjects(token: string) {
    const API_URL = '/api/projects/all';
    return firebaseWithRetry(async () => {
        const response = await fetch(API_URL, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch all projects');
        }
        const data = await response.json();
        return data.data;
    });
}

// API call to get files for a project (admin only)
async function getProjectFiles(token: string, projectId: string) {
    const API_URL = `/api/storage/files/${projectId}`;
    return firebaseWithRetry(async () => {
        const response = await fetch(API_URL, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch project files');
        }
        const data = await response.json();
        return data.data;
    });
}


export default function AdminStoragePage({ isAuthorized }: { isAuthorized: boolean }) {
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);
  const [isFilesLoading, setIsFilesLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAuthorized || !auth?.currentUser) {
        setIsProjectsLoading(false);
        return;
    };

    const fetchProjects = async () => {
        setIsProjectsLoading(true);
        setError(null);
        try {
          const token = await auth.currentUser.getIdToken(true);
          const allProjects = await getAllProjects(token);
          setProjects(allProjects);
        } catch (err: any) {
          setError(err);
          toast({
            variant: "destructive",
            title: "त्रुटि",
            description: "सभी प्रोजेक्ट्स लोड करने में विफल: " + err.message,
          });
        } finally {
          setIsProjectsLoading(false);
        }
    };
    fetchProjects();
  }, [isAuthorized, auth, toast]);

  useEffect(() => {
    if (!selectedProjectId || !auth?.currentUser) {
        setFiles([]);
        return;
    };

    const fetchFiles = async () => {
        setIsFilesLoading(true);
        setError(null);
        try {
            const token = await auth.currentUser.getIdToken(true);
            const projectFiles = await getProjectFiles(token, selectedProjectId);
            setFiles(projectFiles);
        } catch(err: any) {
            setError(err);
            toast({
                variant: "destructive",
                title: "त्रुटि",
                description: `प्रोजेक्ट की फाइलें लोड करने में विफल: ${err.message}`,
            });
        } finally {
            setIsFilesLoading(false);
        }
    }
    fetchFiles();
  }, [selectedProjectId, auth, toast]);

  const filteredFiles = useMemo(() => {
    if (!files) return [];
    return files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [files, searchQuery]);

  const handleUploadClick = () => {
      if (!selectedProjectId) {
          toast({ variant: 'destructive', title: 'त्रुटि', description: 'कृपया पहले एक प्रोजेक्ट चुनें।' });
          return;
      }
      fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && firestore && selectedProjectId && auth?.currentUser) {
        toast({
            title: 'फ़ाइल अपलोड हो रही है...',
            description: `${file.name} को प्रोजेक्ट ${selectedProjectId} में अपलोड किया जा रहा है।`,
        });

        try {
            const storage = getStorage();
            const fileId = nanoid();
            const filePath = `projects/${selectedProjectId}/${fileId}-${file.name}`;
            const fileStorageRef = storageRef(storage, filePath);

            const uploadResult = await uploadBytes(fileStorageRef, file);
            const downloadURL = await getDownloadURL(uploadResult.ref);
            
            const fileDocRef = doc(firestore, `projects/${selectedProjectId}/files`, fileId);
            
            const newFile = {
                id: fileId,
                name: file.name,
                size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                type: file.type.split('/')[0] || 'file',
                modified: serverTimestamp(),
                url: downloadURL,
                storagePath: filePath,
                clientId: projects.find(p => p.id === selectedProjectId)?.clientId, // Add client ID for consistency
            };

            await setDoc(fileDocRef, newFile);
            
            // Refresh files list
            setFiles(prev => [newFile, ...prev]);

            toast({
                title: 'फ़ाइल सफलतापूर्वक अपलोड हुई',
                description: `${file.name} अब आपकी फ़ाइल सूची में है।`,
            });
        } catch (e) {
             console.error("File upload error:", e);
             toast({
                title: 'त्रुटि',
                description: 'फ़ाइल अपलोड करने में विफल।',
                variant: 'destructive',
            });
        }
    }
  };

  const handleDelete = async (file: any) => {
    if (!firestore || !selectedProjectId) return;
    try {
        await deleteDoc(doc(firestore, `projects/${selectedProjectId}/files`, file.id));
        
        const storage = getStorage();
        const fileStorageRef = storageRef(storage, file.storagePath);
        await deleteObject(fileStorageRef);
        
        setFiles(prev => prev.filter(f => f.id !== file.id));

        toast({
            title: 'फ़ाइल हटाई गई',
            description: `${file.name} को सफलतापूर्वक हटा दिया गया है।`,
            variant: 'destructive',
        });
    } catch (e) {
        console.error("Error deleting file:", e);
        toast({
            title: 'त्रुटि',
            description: 'फ़ाइल हटाने में विफल।',
            variant: 'destructive',
        });
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
              <Archive className="h-7 w-7 text-primary"/>
              भंडारण प्रबंधक
            </h1>
            <p className="text-muted-foreground">
              सभी प्रोजेक्ट्स की फाइलें एक ही स्थान पर देखें और प्रबंधित करें।
            </p>
          </div>
      </div>
      
      <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
               <div className="w-full md:w-auto md:flex-1">
                 {isProjectsLoading ? <Loader2 className="animate-spin" /> : (
                    <Select onValueChange={setSelectedProjectId} value={selectedProjectId ?? undefined}>
                      <SelectTrigger className="max-w-xs">
                        <SelectValue placeholder="एक प्रोजेक्ट चुनें..." />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map(p => (
                          <SelectItem key={p.id} value={p.id}>{p.name} ({p.client?.name || 'N/A'})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                 )}
               </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                 <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="फाइलें खोजें..." 
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      disabled={!selectedProjectId}
                    />
                </div>
                 <Button onClick={handleUploadClick} disabled={!selectedProjectId || isFilesLoading}>
                    <Upload className="mr-2 h-4 w-4" /> अपलोड
                </Button>
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
              {isFilesLoading && <div className="flex justify-center items-center h-60"><Loader2 className="h-8 w-8 animate-spin" /></div>}
              {error && !isFilesLoading && <div className="text-center text-destructive p-4"><ShieldAlert className="mx-auto h-8 w-8 mb-2" />{error.message}</div>}
              {!isFilesLoading && !error && selectedProjectId && (
                  <>
                  {filteredFiles.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50%]">नाम</TableHead>
                                <TableHead>आकार</TableHead>
                                <TableHead>संशोधित</TableHead>
                                <TableHead className="text-right">क्रियाएँ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredFiles.map(file => (
                                <TableRow key={file.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            {getFileIcon(file.type)}
                                            <span>{file.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{file.size}</TableCell>
                                    <TableCell>{file.modified?.toDate ? new Date(file.modified.toDate()).toLocaleDateString() : 'अभी'}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button variant="ghost" size="icon" onClick={() => window.open(file.url, '_blank')}><Eye className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="icon" asChild>
                                                <a href={file.url} download={file.name} target="_blank" rel="noopener noreferrer">
                                                    <Download className="h-4 w-4" />
                                                </a>
                                            </Button>
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
                                                            यह क्रिया स्थायी रूप से '{file.name}' फ़ाइल को हटा देगी।
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>रद्द करें</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(file)}>हटाएं</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-20 text-muted-foreground">
                       <p>इस प्रोजेक्ट में कोई फाइल नहीं है।</p>
                    </div>
                  )}
                  </>
              )}
              {!selectedProjectId && !isProjectsLoading && (
                  <div className="text-center py-20 text-muted-foreground">
                    <p>फाइलें देखने के लिए कृपया ऊपर से एक प्रोजेक्ट चुनें।</p>
                  </div>
              )}
          </CardContent>
      </Card>
    </div>
  );
}
